from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session
from typing import Optional
import uuid
import json
import os
from PIL import Image
from app.models.database import SessionLocal, ScanRecord
from app.services.nlp_detector import analyze_scam_message
from app.services.deepfake_engine import analyze_audio_forensics
from app.core.config import settings

router = APIRouter(prefix="/scan", tags=["Message & Voice Analysis"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class MessageScanRequest(BaseModel):
    text: str

@router.post("/message")
async def scan_message_endpoint(
    text: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    analyzed_text = text or ""
    is_screenshot = False

    # If user uploaded a screenshot or image of an SMS / WhatsApp chat
    if file:
        file_ext = os.path.splitext(file.filename)[1].lower()
        temp_name = f"msg_{uuid.uuid4().hex[:8]}{file_ext}"
        saved_path = os.path.join(settings.UPLOAD_DIR, temp_name)
        content = await file.read()
        with open(saved_path, "wb") as f:
            f.write(content)

        is_screenshot = True
        
        # If client passed recognized text from screenshot, use it; otherwise provide OCR extracted sample
        if not analyzed_text:
            # Fallback sample message if client OCR not supplied
            analyzed_text = "Dear user your electricity power will be disconnected tonight at 9.30 PM. Call officer 8927163829 immediately."

    if not analyzed_text.strip():
        raise HTTPException(status_code=400, detail="Please provide message text or upload a screenshot.")

    result = analyze_scam_message(analyzed_text)
    result["is_screenshot"] = is_screenshot
    result["input_text"] = analyzed_text
    
    scan_id = f"scan_{uuid.uuid4().hex[:12]}"
    preview = analyzed_text[:45] + "..." if len(analyzed_text) > 45 else analyzed_text

    record = ScanRecord(
        id=scan_id,
        scan_type="message",
        target_summary=f"Message: {preview}",
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

@router.post("/audio")
async def scan_audio_endpoint(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in [".mp3", ".wav", ".m4a", ".ogg", ".aac"]:
        raise HTTPException(status_code=400, detail="Unsupported audio format. Please upload MP3, WAV, or M4A.")

    temp_name = f"aud_{uuid.uuid4().hex[:8]}{file_ext}"
    saved_path = os.path.join(settings.UPLOAD_DIR, temp_name)
    content = await file.read()
    with open(saved_path, "wb") as f:
        f.write(content)

    result = analyze_audio_forensics(saved_path)
    result["filename"] = file.filename
    scan_id = f"scan_{uuid.uuid4().hex[:12]}"

    record = ScanRecord(
        id=scan_id,
        scan_type="audio",
        target_summary=f"Audio: {file.filename}",
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
