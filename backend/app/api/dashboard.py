from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import Optional
import json
from app.models.database import SessionLocal, ScanRecord

router = APIRouter(prefix="", tags=["Dashboard & History"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/dashboard/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    total = db.query(ScanRecord).count()
    high = db.query(ScanRecord).filter(ScanRecord.risk_level == "HIGH").count()
    medium = db.query(ScanRecord).filter(ScanRecord.risk_level == "MEDIUM").count()
    low = db.query(ScanRecord).filter(ScanRecord.risk_level == "LOW").count()
    
    # Recent 5 scans
    recent_records = db.query(ScanRecord).order_by(desc(ScanRecord.created_at)).limit(5).all()
    recent = []
    for r in recent_records:
        recent.append({
            "id": r.id,
            "scan_type": r.scan_type,
            "target_summary": r.target_summary,
            "risk_level": r.risk_level,
            "confidence_score": r.confidence_score,
            "created_at": r.created_at.isoformat() if r.created_at else None
        })

    return {
        "total_scans": total,
        "high_risk_scans": high,
        "medium_risk_scans": medium,
        "low_risk_scans": low,
        "threat_interception_rate": round((high / total * 100), 1) if total > 0 else 0.0,
        "recent_scans": recent
    }

@router.get("/scan/history")
def get_scan_history(
    scan_type: Optional[str] = None,
    risk_level: Optional[str] = None,
    search: Optional[str] = None,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    query = db.query(ScanRecord)
    
    if scan_type and scan_type != "all":
        query = query.filter(ScanRecord.scan_type == scan_type)
    if risk_level and risk_level != "all":
        query = query.filter(ScanRecord.risk_level == risk_level)
    if search:
        query = query.filter(ScanRecord.target_summary.contains(search))
        
    records = query.order_by(desc(ScanRecord.created_at)).limit(limit).all()
    
    results = []
    for r in records:
        results.append({
            "id": r.id,
            "scan_type": r.scan_type,
            "target_summary": r.target_summary,
            "risk_level": r.risk_level,
            "confidence_score": r.confidence_score,
            "created_at": r.created_at.isoformat() if r.created_at else None,
            "detected_indicators": json.loads(r.detected_indicators) if r.detected_indicators else []
        })
    return results

@router.get("/scan/report/{scan_id}")
def get_scan_report(scan_id: str, db: Session = Depends(get_db)):
    record = db.query(ScanRecord).filter(ScanRecord.id == scan_id).first()
    if not record:
        raise HTTPException(status_code=404, detail="Scan report not found.")

    raw = json.loads(record.raw_details) if record.raw_details else {}
    indicators = json.loads(record.detected_indicators) if record.detected_indicators else []
    actions = json.loads(record.recommended_actions) if record.recommended_actions else []

    return {
        "id": record.id,
        "scan_type": record.scan_type,
        "target_summary": record.target_summary,
        "risk_level": record.risk_level,
        "confidence_score": record.confidence_score,
        "created_at": record.created_at.isoformat() if record.created_at else None,
        "detected_indicators": indicators,
        "explanation_en": record.explanation_en,
        "explanation_hi": record.explanation_hi,
        "recommended_actions": actions,
        "limitations": record.limitations,
        "raw_details": raw
    }
