# 🚩 RED FLAG
> **"Think Before You Trust. Verify Before You Pay."**

An all-in-one AI-powered digital fraud prevention and pre-transaction cybersecurity verification platform built with **React 19 + TypeScript + Tailwind CSS + Capacitor (Web & Mobile APK)** and **Python FastAPI (Forensics & Intelligence Brain)**.

---

## 🎨 UI/UX Color Palette
The platform uses a clean, light, minimal, and professional cybersecurity SaaS design:
- **Primary Background:** `#FFFFFF` (White)
- **Secondary Background:** `#F5F7FA` (Light Grey)
- **Primary Text:** `#172B4D` (Deep Navy)
- **Secondary Text:** `#344054` (Slate)
- **Primary Accent:** `#287C78` (Muted Teal)
- **Borders:** `#DCE3EB` (Soft Grey)
- **Muted Text:** `#667085` (Grey)

### Risk Status Colours
- **Low Risk:** `#26845B` (Green)
- **Medium Risk:** `#B7791F` (Amber)
- **High Risk:** `#C24141` (Red)
- **Information:** `#3975A8` (Muted Blue)

---

## 🌟 Six Core Defense Modules

1. **Deepfake & Synthetic Media Detector (`/deepfake`)**
   - Media forensics for **Videos, Images, and Voice notes**.
   - Facial boundary analysis, EXIF metadata inspection (Stable Diffusion, Midjourney, Firefly), Laplacian blur variance, and FFT high-frequency cutoff checks.
   - Evidence-based risk rating with detection limits transparently reported.

2. **UPI & QR Payment Safety Checker (`/upi-checker`)**
   - Real-time VPA format validation & verified Indian banking PSP whitelist (`@okhdfcbank`, `@paytm`, `@okaxis`, etc.).
   - Impersonation detection (personal VPAs posing as utility boards, telecom, or customer support).
   - In-browser and mobile camera live QR code scanner with `@zxing`/`jsQR`.
   - **Crucial Warning:** *"Entering UPI PIN always DEDUCTS money, never deposits money."*

3. **Phishing Link & Domain Analyzer (`/phishing`)**
   - Safe server-side sandbox parsing (never opens malicious scripts in user's browser).
   - Typosquatting & Levenshtein distance check against top Indian banks (SBI, HDFC, ICICI, etc.) and global platforms.
   - High-risk disposable TLD check (`.xyz`, `.top`, `.tk`, `.click`), insecure HTTP alerts, and subdomain hop tracing.

4. **Scam Message & Audio NLP Analyzer (`/message-analyzer`)**
   - Scans WhatsApp messages, SMS, emails, and screenshot OCR.
   - Classifies: *Digital Arrest CBI scams, KYC Expiry deactivation traps, Electricity cutoff SMS, and Telegram task jobs*.
   - Generates natural **Bilingual Explanations in English and Hinglish**.

5. **Interactive Scam Simulator (`/simulator`)**
   - Educational drills (Beginner, Intermediate, Advanced) covering real-world social engineering cases.
   - Real-time scoring, streaks, confetti celebrations, and actionable safety tips.

6. **Security Dashboard & Audit History (`/dashboard`, `/history`, `/report/:id`)**
   - Telemetry analytics (Total scans, threats intercepted, risk ratios).
   - Searchable history table and downloadable/printable forensic reports.

---

## 📱 Mobile App (Capacitor Ready)
Built using **Approach A** (Unified Full-Stack + Native Capacitor Bridge):
- Runs seamlessly as a **responsive SaaS web application** on desktop/laptop.
- Touch-optimized bottom navigation on mobile devices.
- Direct hardware camera integration for physical QR code scanning.
- To compile the native Android APK:
  ```bash
  cd frontend
  npm run build
  npx cap copy android
  npx cap open android
  ```

---

## 🚀 Quick Start / Running Instructions

### 1. Backend (FastAPI Python)
```bash
cd backend
# Create & activate virtualenv
python -m venv venv
venv\Scripts\activate   # On Windows (or source venv/bin/activate on Mac/Linux)

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
- API Documentation (Swagger UI): `http://127.0.0.1:8000/docs`
- Health Check: `http://127.0.0.1:8000/api/health`

### 2. Frontend (React + Vite + TypeScript)
```bash
cd frontend
npm install
npm run dev
```
- Open Application: `http://127.0.0.1:5173`

---

## 🔐 Credentials & Demo Access
- **Demo User:** `demo@redflag.ai`
- **Demo Password:** `redflag123`
- *(A one-click "Fill Demo Credentials" button is present on the login screen for instant review).*

---

## 🔒 Security & Privacy Policy
- **Zero Sensitive Credential Collection:** Red Flag never asks for, accepts, or stores UPI PINs, OTPs, banking passwords, or card CVVs.
- **Evidence-Based Scoring:** Model confidence is never fabricated; external APIs show clear fallback/demo status if unconfigured.
