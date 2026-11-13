import os
from typing import Optional

class Settings:
    PROJECT_NAME: str = "Red Flag"
    API_V1_STR: str = "/api"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super_secret_red_flag_development_key_2026")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 # 24 hours
    
    # Storage
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "uploads"))
    MAX_UPLOAD_SIZE_MB: int = int(os.getenv("MAX_UPLOAD_SIZE_MB", "50"))
    
    # API Keys (Evidence-based: if missing, reported transparently)
    VIRUSTOTAL_API_KEY: Optional[str] = os.getenv("VIRUSTOTAL_API_KEY", None)
    GOOGLE_SAFE_BROWSING_API_KEY: Optional[str] = os.getenv("GOOGLE_SAFE_BROWSING_API_KEY", None)

settings = Settings()
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
