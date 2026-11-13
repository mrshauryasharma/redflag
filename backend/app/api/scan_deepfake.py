from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
import uuid
import json
import os
from app.models.database import SessionLocal, ScanRecord
from app.services.deepfake_engine import analyze_image_forensics, analyze_video_forensics, analyze_audio_forensics
from app.core.config import settings

router = APIRouter(prefix="/scan", tags=["Deepfake Media Forensics"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

ALLOWED_IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".bmp"}
ALLOWED_VIDEO_EXTS = {".mp4", ".mov", ".avi", ".webm", ".mkv"}
ALLOWED_AUDIO_EXTS = {".mp3", ".wav", ".m4a", ".ogg"}

@router.post("/deepfake")
async def scan_deepfake_endpoint(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_IMAGE_EXTS and ext not in ALLOWED_VIDEO_EXTS and ext not in ALLOWED_AUDIO_EXTS:
        raise HTTPException(
            status_code=400,
            detail="Unsupported media format. Allowed: Images (JPG, PNG, WEBP), Videos (MP4, MOV, WEBM), or Audio (MP3, WAV)."
        )

    temp_name = f"df_{uuid.uuid4().hex[:8]}{ext}"
    saved_path = os.path.join(settings.UPLOAD_DIR, temp_name)
    
    content = await file.read()
    with open(saved_path, "wb") as f:
        f.write(content)

    if ext in ALLOWED_IMAGE_EXTS:
        result = analyze_image_forensics(saved_path)
    elif ext in ALLOWED_VIDEO_EXTS:
        result = analyze_video_forensics(saved_path)
    else:
        result = analyze_audio_forensics(saved_path)

    result["filename"] = file.filename
    scan_id = f"scan_{uuid.uuid4().hex[:12]}"

    record = ScanRecord(
        id=scan_id,
        scan_type="deepfake",
        target_summary=f"{result.get('media_type', 'media').title()}: {file.filename}",
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
