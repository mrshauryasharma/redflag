import re
from typing import Dict, Any, List
from urllib.parse import urlparse, parse_qs

# Known Official Indian Bank & PSP Handles
VERIFIED_PSP_HANDLES = {
    "okaxis": "Axis Bank (Google Pay)",
    "okhdfcbank": "HDFC Bank (Google Pay)",
    "okicici": "ICICI Bank (Google Pay)",
    "oksbi": "State Bank of India (Google Pay)",
    "paytm": "Paytm Payments Bank",
    "ybl": "Yes Bank (PhonePe)",
    "ibl": "IndusInd Bank (PhonePe)",
    "axl": "Axis Bank (PhonePe)",
    "barodampay": "Bank of Baroda",
    "upi": "NPCI BHIM",
    "apl": "Amazon Pay",
    "waaxis": "WhatsApp (Axis)",
    "wahdfc": "WhatsApp (HDFC)",
    "wasbi": "WhatsApp (SBI)",
    "airtel": "Airtel Payments Bank",
    "postbank": "India Post Payments Bank"
}

SUSPICIOUS_KEYWORDS = [
    "customercare", "helpline", "support", "kyc", "refund", "electricity",
    "lottery", "cashback", "reward", "rbi", "income-tax", "challan",
    "freefire", "crypto", "telecom", "airtel-support", "jio-support"
]

def parse_upi_qr(qr_text: str) -> Dict[str, Any]:
    """Parses standard UPI URI format upi://pay?pa=...&pn=...&mc=..."""
    if not qr_text.startswith("upi://pay"):
        return {"is_upi_qr": False, "raw_data": qr_text}
    
    parsed = urlparse(qr_text)
    params = parse_qs(parsed.query)
    
    vpa = params.get("pa", [""])[0]
    payee_name = params.get("pn", [""])[0]
    mc = params.get("mc", [""])[0] # Merchant code
    tr = params.get("tr", [""])[0] # Transaction ref
    am = params.get("am", [""])[0] # Preset amount
    
    return {
        "is_upi_qr": True,
        "vpa": vpa,
        "payee_name": payee_name,
        "merchant_code": mc,
        "transaction_ref": tr,
        "preset_amount": am,
        "raw_data": qr_text
    }

def analyze_upi(vpa: str, payee_name: str = "", is_qr: bool = False, raw_qr: str = "") -> Dict[str, Any]:
    vpa = vpa.strip().lower()
    indicators: List[str] = []
    recommended_actions: List[str] = []
    risk_level = "LOW"
    
    # Check VPA format (username@handle)
    vpa_pattern = r'^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}$'
    if not re.match(vpa_pattern, vpa):
        return {
            "vpa": vpa,
            "is_valid_format": False,
            "risk_level": "HIGH",
            "confidence_score": 0.95,
            "detected_indicators": ["Malformed or invalid UPI ID syntax."],
            "explanation_en": "The provided UPI ID does not follow standard NPCI formatting. Transacting to malformed addresses can result in lost funds.",
            "explanation_hi": "Yeh UPI ID galat format mein hai. Ispe payment karne se aapka paisa phas sakta hai.",
            "recommended_actions": ["Do not attempt payment.", "Ask the recipient for an official QR or account transfer details."],
            "limitations": "Format syntax check only; does not query private banking APIs.",
            "payee_name": payee_name,
            "handle_info": "Unknown"
        }
    
    username, handle = vpa.split("@", 1)
    handle_info = VERIFIED_PSP_HANDLES.get(handle, f"Non-standard / Third-party PSP (@{handle})")
    
    # Check 1: Impersonation of Banks, Govt, or Customer Care on personal handles
    matched_keywords = [kw for kw in SUSPICIOUS_KEYWORDS if kw in username]
    if matched_keywords:
        indicators.append(f"Impersonation Alert: Username contains sensitive terms: '{', '.join(matched_keywords)}' on a consumer UPI handle.")
        risk_level = "HIGH"
    
    # Check 2: Phone number as username with suspicious claim
    if re.match(r'^\d{10}$', username):
        if any(kw in payee_name.lower() for kw in ["support", "service", "care", "bank", "police", "electricity"]):
            indicators.append("Deceptive Payee Name: Personal mobile number UPI ID claiming to be an official institution.")
            risk_level = "HIGH"
        else:
            indicators.append("Personal peer-to-peer VPA (Mobile Number based). Standard for individuals, suspicious if claimed by a business.")
            if risk_level != "HIGH":
                risk_level = "MEDIUM"

    # Check 3: Collect Request Trap Warning
    if "collect" in raw_qr.lower() or "request" in raw_qr.lower():
        indicators.append("Collect Request Alert: Never enter your UPI PIN when someone claims they are sending you money. Entering UPI PIN always DEDUCTS money.")
        risk_level = "HIGH"

    # Set explanation & actions based on risk
    if risk_level == "HIGH":
        explanation_en = "High likelihood of fraud or impersonation. Scammers frequently create UPI accounts posing as utility companies, support agents, or lottery officers."
        explanation_hi = "Yeh account suspicious hai aur kisi official company ya bank ka naam use karke fraud karne ki koshish lagti hai. Kabhi bhi payment na karein."
        recommended_actions = [
            "DO NOT PAY or accept collect requests.",
            "Never enter your UPI PIN. UPI PIN is only needed to SEND money, never to RECEIVE money.",
            "Verify the merchant from their official verified app or physical store."
        ]
    elif risk_level == "MEDIUM":
        explanation_en = "Valid UPI address on a common provider, but recipient details show peer-to-peer patterns rather than a verified business merchant."
        explanation_hi = "UPI ID format sahi hai par yeh personal account hai. Payment karne se pehle vyakti ki pehchan confirm karein."
        recommended_actions = [
            "Confirm the recipient's identity independently before paying.",
            "Do not pay for job applications, task rewards, or advance delivery fees."
        ]
    else:
        explanation_en = "Standard UPI syntax on a recognized Indian banking PSP. However, a valid UPI ID does NOT guarantee trustworthiness."
        explanation_hi = "UPI ID format standard hai. Yaad rakhein ki valid UPI ID ka matlab yeh nahi ki samne wala chor nahi hai. Verify karke hi pay karein."
        recommended_actions = [
            "Double-check beneficiary name on your UPI payment screen before entering PIN.",
            "Remember: UPI PIN is strictly for paying, never for claiming prizes or receiving payments."
        ]

    return {
        "vpa": vpa,
        "is_valid_format": True,
        "handle": handle,
        "handle_info": handle_info,
        "payee_name": payee_name,
        "is_qr": is_qr,
        "risk_level": risk_level,
        "confidence_score": 0.88 if risk_level == "HIGH" else 0.75,
        "detected_indicators": indicators or ["Standard format on verified banking PSP."],
        "explanation_en": explanation_en,
        "explanation_hi": explanation_hi,
        "recommended_actions": recommended_actions,
        "limitations": "UPI security check analyses syntax, heuristics, and impersonation flags. It cannot verify live account balances or private NPCI blocklists."
    }
