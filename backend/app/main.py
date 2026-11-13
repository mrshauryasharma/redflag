from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.core.config import settings
from app.api import auth, scan_deepfake, scan_upi, scan_url, scan_message, simulator, dashboard

app = FastAPI(
    title="Red Flag API",
    description="Unified Digital Trust and Pre-Transaction Fraud Prevention Engine",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS configuration for Web (localhost:5173) and Mobile (Capacitor localhost, capacitor://, http://localhost)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost",
        "capacitor://localhost",
        "https://localhost",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount uploads directory securely
if os.path.exists(settings.UPLOAD_DIR):
    app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Include Modular Routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(scan_deepfake.router, prefix=settings.API_V1_STR)
app.include_router(scan_upi.router, prefix=settings.API_V1_STR)
app.include_router(scan_url.router, prefix=settings.API_V1_STR)
app.include_router(scan_message.router, prefix=settings.API_V1_STR)
app.include_router(simulator.router, prefix=settings.API_V1_STR)
app.include_router(dashboard.router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "platform": "Red Flag",
        "tagline": "Think Before You Trust. Verify Before You Pay.",
        "status": "OPERATIONAL",
        "version": "1.0.0",
        "docs": "/docs"
    }

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "services": {
            "deepfake_detection": "active",
            "upi_verifier": "active",
            "url_phishing_scanner": "active",
            "message_nlp_engine": "active",
            "scam_simulator": "active"
        }
    }
