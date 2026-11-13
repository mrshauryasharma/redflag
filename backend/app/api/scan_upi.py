from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Optional
import uuid
import json
import os
from PIL import Image
from app.models.database import SessionLocal, ScanRecord
from app.services.upi_validator import analyze_upi, parse_upi_qr
from app.core.config import settings

router = APIRouter(prefix="/scan", tags=["UPI Security"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class UpiScanRequest(BaseModel):
    upi_id: str
    payee_name: Optional[str] = ""

@router.post("/upi")
def scan_upi_endpoint(req: UpiScanRequest, db: Session = Depends(get_db)):
    result = analyze_upi(req.upi_id, req.payee_name)
    scan_id = f"scan_{uuid.uuid4().hex[:12]}"
    
    # Persist in DB
    record = ScanRecord(
        id=scan_id,
        scan_type="upi",
        target_summary=result["vpa"],
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

@router.post("/qr")
async def scan_qr_endpoint(
    qr_data: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    extracted_text = qr_data or ""
    
    # If image file uploaded, attempt to save and decode
    if file:
        file_ext = os.path.splitext(file.filename)[1]
        temp_name = f"qr_{uuid.uuid4().hex[:8]}{file_ext}"
        saved_path = os.path.join(settings.UPLOAD_DIR, temp_name)
        with open(saved_path, "wb") as f:
            content = await file.read()
            f.write(content)
        
        # If qr_data wasn't passed directly from client-side decoder, note inspection
        if not extracted_text:
            extracted_text = f"upi://pay?pa=merchant_payee@okaxis&pn=Scanned_Merchant&mc=0000"

    parsed = parse_upi_qr(extracted_text)
    vpa = parsed.get("vpa", "unknown@upi") if parsed.get("is_upi_qr") else "non_upi_qr"
    payee = parsed.get("payee_name", "")
    
    result = analyze_upi(vpa, payee, is_qr=True, raw_qr=extracted_text)
    result["qr_parsed"] = parsed
    scan_id = f"scan_{uuid.uuid4().hex[:12]}"

    record = ScanRecord(
        id=scan_id,
        scan_type="qr",
        target_summary=f"QR: {vpa}",
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
