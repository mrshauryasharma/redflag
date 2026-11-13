from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, Float, Boolean, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from datetime import datetime
import os

DB_PATH = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "scam_shield.db")
DATABASE_URL = f"sqlite:///{DB_PATH}"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), default="Cyber Sentinel")
    created_at = Column(DateTime, default=datetime.utcnow)
    role = Column(String(50), default="user")
    
    scans = relationship("ScanRecord", back_populates="owner")
    simulator_attempts = relationship("SimulatorAttempt", back_populates="user")

class ScanRecord(Base):
    __tablename__ = "scan_records"
    id = Column(String(64), primary_key=True, index=True) # UUID / Hash
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    scan_type = Column(String(50), index=True) # deepfake, upi, url, message, qr
    target_summary = Column(String(255)) # e.g. "9876543210@paytm", "video.mp4", "https://sbi-login.xyz"
    risk_level = Column(String(20), index=True) # LOW, MEDIUM, HIGH
    confidence_score = Column(Float, nullable=True) # 0.0 to 1.0
    detected_indicators = Column(Text) # JSON string array
    explanation_en = Column(Text)
    explanation_hi = Column(Text) # Hinglish
    recommended_actions = Column(Text) # JSON string array
    limitations = Column(Text)
    raw_details = Column(Text) # JSON string
    created_at = Column(DateTime, default=datetime.utcnow, index=True)

    owner = relationship("User", back_populates="scans")

class SimulatorAttempt(Base):
    __tablename__ = "simulator_attempts"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    scenario_id = Column(String(50))
    user_choice = Column(String(50))
    is_correct = Column(Boolean)
    score_earned = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="simulator_attempts")

Base.metadata.create_all(bind=engine)
