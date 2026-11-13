from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
import uuid
import json
from app.models.database import SessionLocal, ScanRecord
from app.services.url_inspector import analyze_url

router = APIRouter(prefix="/scan", tags=["Phishing URL Security"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class UrlScanRequest(BaseModel):
    url: str

@router.post("/url")
def scan_url_endpoint(req: UrlScanRequest, db: Session = Depends(get_db)):
    if not req.url or len(req.url.strip()) < 3:
        raise HTTPException(status_code=400, detail="Please enter a valid URL.")
        
    result = analyze_url(req.url)
    scan_id = f"scan_{uuid.uuid4().hex[:12]}"

    record = ScanRecord(
        id=scan_id,
        scan_type="url",
        target_summary=result["domain"],
        risk_level=result["risk_level"],
        confidence_score=result["confidence_score"],
        detected_indicators=json.dumps(result["detected_indicators"]),
        explanation_en=result["explanation_en"],
        explanation_hi=result["explanation_hi"],
        recommended_actions=json.dumps(result["recommended_actions"]),
        limitations=result["limitations"],
        raw_details=json.dumps(result)
    )
    db.add(record)
    db.commit()

    result["scan_id"] = scan_id
    return result
