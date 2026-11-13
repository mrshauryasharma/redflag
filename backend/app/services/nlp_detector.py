import re
from typing import Dict, Any, List

SCAM_CATEGORIES = {
    "DIGITAL_ARREST": {
        "keywords": ["cbi", "police", "customs", "narcotics", "parcel containing drugs", "digital arrest", "mumbai police", "court order", "arrest warrant", "skype call", "surveillance"],
        "name": "Digital Arrest & Law Enforcement Impersonation Scam",
        "description": "Criminals impersonate police, CBI, or customs officials claiming an illegal parcel or money laundering case, demanding video surveillance or financial deposits.",
        "severity": "HIGH"
    },
    "KYC_EXPIRY": {
        "keywords": ["kyc expired", "account blocked", "pan update", "aadhar link", "sim deactivation", "within 24 hours", "click here to update", "sbi kyc", "hdfc kyc", "yono"],
        "name": "Bank / SIM KYC Expiry Scam",
        "description": "Fraudsters create false panic that your bank account or SIM will be blocked unless you click a link or download an APK to update KYC.",
        "severity": "HIGH"
    },
    "ELECTRICITY_BILL": {
        "keywords": ["electricity power will be disconnected", "electricity bill", "tonight at 9.30", "call electricity officer", "light cut", "bijli bill", "unpaid bill"],
        "name": "Electricity / Utility Disconnection Scam",
        "description": "Urgent fake SMS threatening power disconnection tonight unless a phone number is called or a fake bill payment app is installed.",
        "severity": "HIGH"
    },
    "PART_TIME_JOB": {
        "keywords": ["part time job", "earn 3000 to 5000 daily", "youtube like and subscribe", "hotel review task", "telegram task", "daily payout", "work from home", "hr recruiter"],
        "name": "Part-Time Task & Telegram Job Scam",
        "description": "Lures victims with small payouts for liking videos or rating hotels, then demands large advance deposits for 'prepaid crypto tasks'.",
        "severity": "HIGH"
    },
    "LOTTERY_PRIZE": {
        "keywords": ["lottery winner", "kbc lucky draw", "won 25 lakh", "dear customer you won", "claim prize", "spin the wheel", "processing fee", "gst charges"],
        "name": "Lottery & Advance-Fee Fraud",
        "description": "Claims you won a massive lottery or car and asks for 'processing fees' or 'tax charges' before releasing the non-existent prize.",
        "severity": "HIGH"
    },
    "COURIER_CUSTOMS": {
        "keywords": ["fedex parcel", "package detained", "customs duty", "undelivered package", "indapost", "delivery address incomplete", "update delivery details"],
        "name": "Courier & Package Delivery Smishing",
        "description": "Fake SMS claiming a package cannot be delivered until you click a link to pay a small verification charge, stealing card credentials.",
        "severity": "MEDIUM"
    }
}

URGENCY_TRIGGERS = [
    "immediately", "within 1 hour", "urgent", "tonight", "last chance", "account will be suspended",
    "warrant issued", "do not disconnect", "strictly confidential", "penalty will apply"
]

CALL_TO_ACTION_TRIGGERS = [
    "download apk", "install anydesk", "teamviewer", "rustdesk", "click link", "share otp",
    "send pin", "deposit money", "transfer to secure account", "call officer"
]

def analyze_scam_message(text: str) -> Dict[str, Any]:
    content = text.strip()
    lowered = content.lower()
    
    detected_categories: List[Dict[str, str]] = []
    indicators: List[str] = []
    risk_level = "LOW"
    
    # 1. Evaluate against Scam Categories
    for cat_key, cat_data in SCAM_CATEGORIES.items():
        matched = [kw for kw in cat_data["keywords"] if kw in lowered]
        if len(matched) >= 1:
            detected_categories.append({
                "code": cat_key,
                "name": cat_data["name"],
                "description": cat_data["description"]
            })
            indicators.append(f"Matches {cat_data['name']}: Detected trigger phrases ({', '.join(matched[:3])}).")
            if cat_data["severity"] == "HIGH":
                risk_level = "HIGH"
            elif risk_level != "HIGH":
                risk_level = "MEDIUM"

    # 2. Check Urgency / Fear Triggers
    found_urgency = [trig for trig in URGENCY_TRIGGERS if trig in lowered]
    if found_urgency:
        indicators.append(f"Psychological Pressure: High urgency tactics detected ({', '.join(found_urgency)}).")
        if risk_level == "LOW":
            risk_level = "MEDIUM"

    # 3. Check Action Demands (APK, Remote access, OTP)
    found_cta = [cta for cta in CALL_TO_ACTION_TRIGGERS if cta in lowered]
    if found_cta:
        indicators.append(f"Dangerous Action Request: Solicits high-risk action ({', '.join(found_cta)}).")
        risk_level = "HIGH"

    # 4. Links / Phone numbers extraction
    found_urls = re.findall(r'https?://\S+|www\.\S+', content)
    found_phones = re.findall(r'(?:\+91[\-\s]?)?[6789]\d{9}', content)
    found_apks = re.findall(r'\b\w+\.apk\b', lowered)
    
    if found_apks:
        indicators.append(f"Malware Vector: Requests downloading an Android application package (.apk): {', '.join(found_apks)}.")
        risk_level = "HIGH"

    # Explanations
    if risk_level == "HIGH":
        primary_cat = detected_categories[0]["name"] if detected_categories else "Advanced Digital Fraud"
        explanation_en = f"This communication exhibits strong indicators of a {primary_cat}. It uses psychological pressure, threats, or unsolicited financial rewards to trick victims into paying money or compromising sensitive credentials."
        explanation_hi = f"Yeh message bilkul fraud lagta hai ({primary_cat}). Isme dar (police/bijli katna) ya lalach (job/lottery) ka use karke aapko fasane ki koshish ki gayi hai. Is par kabhi vishwas na karein aur koi link na dabayein."
        recommended_actions = [
            "DO NOT click any links or download attached .apk / app files.",
            "NEVER share OTP, UPI PIN, or bank passwords.",
            "Legitimate police or courts NEVER conduct 'digital arrests' over Skype or WhatsApp calls.",
            "Banks and electricity departments do not deactivate accounts with generic mobile numbers.",
            "Report to national cybercrime portal (1930 or cybercrime.gov.in) and block the sender."
        ]
        confidence = 0.93
    elif risk_level == "MEDIUM":
        explanation_en = "This message contains unsolicited promotional claims, delivery alerts, or generic urgency. Verify with the official entity directly."
        explanation_hi = "Is message mein kuch sandigdh batein hain (jaise achanak delivery alert ya urgency). Directly official app par jaakar check karein."
        recommended_actions = [
            "Do not use contact numbers provided inside the message.",
            "Reach out to customer support through their official application."
        ]
        confidence = 0.76
    else:
        explanation_en = "No recognized fraud patterns, malicious urgency triggers, or scam keywords detected."
        explanation_hi = "Is message mein koi dangerous fraud keyword ya urgency nahi mili. Phir bhi anjan logon se alert rahein."
        recommended_actions = [
            "Maintain standard digital vigilance.",
            "Never share personal identification without a verified business context."
        ]
        confidence = 0.85

    return {
        "text_length": len(content),
        "risk_level": risk_level,
        "confidence_score": confidence,
        "detected_categories": detected_categories,
        "detected_indicators": indicators or ["No anomalous social engineering patterns detected."],
        "found_urls": found_urls,
        "found_phones": found_phones,
        "has_apk_reference": len(found_apks) > 0,
        "explanation_en": explanation_en,
        "explanation_hi": explanation_hi,
        "recommended_actions": recommended_actions,
        "limitations": "NLP pattern and social-engineering heuristic engine. Tailored contextual spear-phishing may require manual human verification."
    }
