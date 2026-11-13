from typing import List, Dict, Any

SIMULATOR_SCENARIOS: List[Dict[str, Any]] = [
    {
        "id": "sim_1",
        "level": "beginner",
        "category": "LOTTERY",
        "title": "KBC Maha Lucky Draw Winner",
        "context_type": "sms",
        "scenario_content": "Dear Customer, Congratulations! Your mobile number has won a cash prize of ₹25,00,000 in KBC All India Lucky Draw. To receive your prize cheque, deposit ₹3,500 registration GST charge to Account No: 3829104829. Contact WhatsApp Officer Mr. Sharma: +91-9876543210.",
        "options": [
            "Deposit the ₹3,500 immediately because ₹25 Lakhs is a huge prize.",
            "Call the WhatsApp officer to verify their identity card first.",
            "Report and delete immediately. Legitimate lotteries never ask for advance fees to release prizes.",
            "Forward the message to 10 friends to check if it's true."
        ],
        "correct_index": 2,
        "points": 10,
        "explanation_en": "This is a classic 'Advance-Fee Fraud' (Lottery Scam). You cannot win a lottery you never entered. No genuine organization demands taxes or processing fees in advance through personal bank accounts.",
        "explanation_hi": "Yeh fraud lottery scam hai. Agar aapne kisi contest mein hissa hi nahi liya toh prize kaise jeetenge? Koi bhi real lottery pehle paise nahi mangti.",
        "safety_tips": [
            "Never pay money to claim a prize.",
            "Official organizations do not operate customer care via random WhatsApp mobile numbers.",
            "Block and report the sender to 1930."
        ]
    },
    {
        "id": "sim_2",
        "level": "beginner",
        "category": "UPI_FRAUD",
        "title": "OLX Buyer Scanning QR Code to 'Send' Money",
        "context_type": "upi",
        "scenario_content": "You listed your old sofa for ₹8,000 on OLX. A buyer agrees instantly without haggling. He sends you a QR code on WhatsApp and says: 'I have sent you an advance payment QR. Just open your Google Pay, scan this QR code, and enter your UPI PIN to receive the ₹8,000 in your bank account.'",
        "options": [
            "Scan the QR code and enter UPI PIN quickly before the buyer changes their mind.",
            "Refuse and warn the buyer. Entering a UPI PIN always DEDUCTS money from your account, never deposits money.",
            "Ask the buyer to send ₹1 first as a test.",
            "Enter a wrong PIN on purpose."
        ],
        "correct_index": 1,
        "points": 10,
        "explanation_en": "Rule of UPI: UPI PIN is entered ONLY to SEND money, NEVER to RECEIVE money. Scanning a QR code or entering your PIN will instantly deduct ₹8,000 from your account.",
        "explanation_hi": "UPI ka sabse bada niyam: UPI PIN sirf paise BHEJNE ke liye hota hai, PANE ke liye nahi! QR scan karke PIN dalte hi aapke khate se paise kat jayenge.",
        "safety_tips": [
            "Receiving money requires zero PIN entry.",
            "Anyone sending a QR code claiming it will credit your account is 100% a fraudster.",
            "Deal locally in person whenever possible."
        ]
    },
    {
        "id": "sim_3",
        "level": "intermediate",
        "category": "ELECTRICITY_BILL",
        "title": "Midnight Power Disconnection Warning",
        "context_type": "sms",
        "scenario_content": "SMS from 'VM-BIJLI': 'Dear consumer, your electricity power will be disconnected tonight at 9:30 PM from the electricity office because your previous month's bill was not updated. Immediately contact our electricity verification officer Rahul Verma at 8927163829.'",
        "options": [
            "Call the mobile number in the SMS in panic so your house power is not cut off.",
            "Do not call the number. Check your bill status directly on your official electricity board app or consumer portal.",
            "Ask the officer to send their UPI ID so you can clear the bill right away.",
            "Download whatever quick-support app the officer suggests over the phone."
        ],
        "correct_index": 1,
        "points": 20,
        "explanation_en": "Electricity boards never send disconnection notices via personal 10-digit mobile numbers with immediate same-day cutoffs. Fraudsters use panic to get you to download screen-sharing apps (AnyDesk, RustDesk) or pay into fake UPI VPAs.",
        "explanation_hi": "Bijli vibhag kabhi bhi achanak mobile number se raat 9:30 baje bijli katne ka SMS nahi bhejta. Yeh panic create karke paise lootne ka tarika hai.",
        "safety_tips": [
            "Check electricity bills only on official state discom apps or electricity boards.",
            "Never install remote screen-sharing tools (AnyDesk, TeamViewer) on caller instructions."
        ]
    },
    {
        "id": "sim_4",
        "level": "intermediate",
        "category": "PART_TIME_JOB",
        "title": "Telegram YouTube Like & Earn Work From Home",
        "context_type": "message",
        "scenario_content": "A WhatsApp message from 'Anjali - HR Global Recruiters': 'Hello, we noticed your profile. Earn ₹3,000 - ₹5,000 daily from home. Just like YouTube videos and write Google reviews. We already paid you ₹150 for your first 3 trial likes! Now join our Telegram VIP channel. To unlock VIP tasks paying ₹10,000, you only need to transfer a refundable deposit of ₹2,500.'",
        "options": [
            "Deposit the ₹2,500 since they already proved they are genuine by paying ₹150 earlier.",
            "Deposit ₹5,000 to get double the returns.",
            "Recognize this as a classic Task Scam. The initial ₹150 was bait to lure you into depositing thousands of rupees that you can never withdraw.",
            "Ask other members in the Telegram group if they got paid."
        ],
        "correct_index": 2,
        "points": 20,
        "explanation_en": "This is the 'Task/Prepaid Deposit Scam'. Scammers pay small sums (₹150 - ₹500) initially to build false trust. Once you deposit larger sums for 'cryptocurrency or high-commission tasks', they freeze your funds and demand more money to withdraw.",
        "explanation_hi": "Yeh famous 'Part-time Task Scam' hai. Pehle 100-200 rupaye dekar bharosa jeette hain, fir bada amount jama karwakar account block kar dete hain.",
        "safety_tips": [
            "No legitimate company pays huge daily wages just to like YouTube videos.",
            "Telegram groups with 'happy investors' are full of coordinated bots and fake screenshots.",
            "Never pay money to get a job."
        ]
    },
    {
        "id": "sim_5",
        "level": "advanced",
        "category": "DIGITAL_ARREST",
        "title": "CBI Officer Skype 'Digital Arrest' Video Call",
        "context_type": "video",
        "scenario_content": "You receive a call claiming to be FedEx: 'A parcel sent in your name to Taiwan containing 5 fake passports and 140 grams of MDMA was seized.' The call is transferred to a man in a police uniform sitting in a room with a police emblem on Skype. He shows an 'Arrest Warrant' with your Aadhaar number. He tells you: 'You are under 24-hour Digital Arrest. Keep your camera on. To verify your innocence, you must liquidate your fixed deposits and transfer ₹4,50,000 into the Reserve Bank of India Secret Verification Escrow Account.'",
        "options": [
            "Obey the police officer and transfer the ₹4.5 Lakhs to prove your innocence in the money laundering case.",
            "Stay on the Skype call all night so they don't dispatch local police to your house.",
            "Recognize this as a 100% fake 'Digital Arrest' scam. Police and CBI NEVER arrest anyone via video call or demand bank transfers to 'verification accounts'. Disconnect immediately and call 1930.",
            "Show them your bank passbook on video."
        ],
        "correct_index": 2,
        "points": 30,
        "explanation_en": "Under Indian law, there is NO SUCH THING as a 'Digital Arrest'. Real law enforcement agencies (Police, CBI, ED, Customs) never conduct interrogations on Skype/WhatsApp and NEVER demand money transfers for verification. Uniforms, badges, and letters are all staged props.",
        "explanation_hi": "Kanoon mein 'Digital Arrest' jaisi koi cheez nahi hoti! Real Police ya CBI kabhi video call par arrest nahi karti aur na hi verification ke naam par paise mangti hai. Turant call kaatein aur 1930 par complain karein.",
        "safety_tips": [
            "Indian police never issues arrest warrants over WhatsApp.",
            "RBI does not maintain any 'secret verification escrow accounts'.",
            "Immediately report to cybercrime.gov.in or helpline 1930."
        ]
    },
    {
        "id": "sim_6",
        "level": "advanced",
        "category": "VOICE_CLONE",
        "title": "AI Voice Cloning Emergency Call from 'Son'",
        "context_type": "voice",
        "scenario_content": "You receive a phone call from an unknown number. The voice sounds EXACTLY like your son who studies in another city. In a crying, distressed voice, he says: 'Papa, please help me! My friend had a terrible car accident. The police are going to put me in jail unless we pay the hospital bill of ₹75,000 right now. I am handing the phone to the inspector.' A stern voice takes over and demands an immediate UPI transfer to an unknown ID.",
        "options": [
            "Immediately send the ₹75,000 UPI transfer because your son was crying in panic.",
            "Hang up immediately, take a deep breath, and call your son's actual personal phone number to verify his whereabouts.",
            "Send ₹30,000 as partial emergency aid.",
            "Ask the inspector to reduce the penalty."
        ],
        "correct_index": 1,
        "points": 30,
        "explanation_en": "This is an 'AI Voice Clone Kidnapping / Accident Scam'. Scammers take a 5-second audio clip of your relative from Instagram or YouTube reels, clone their voice with AI, and stage a high-panic emergency. Always hang up and dial their known real phone number directly.",
        "explanation_hi": "Yeh 'AI Voice Cloning Scam' hai. Social media se 5 second ki voice copy karke AI se fake emergency audio banaya jata hai. Pehle phone kaat kar apne bete ke real number par call karein.",
        "safety_tips": [
            "Establish a private family 'Safe Word / Code Word' known only to close relatives.",
            "Never transfer funds to third-party accounts during emotional panic calls.",
            "Always verify directly on their known phone line."
        ]
    }
]

def get_scenarios(level: str = None) -> List[Dict[str, Any]]:
    if level and level != "all":
        return [s for s in SIMULATOR_SCENARIOS if s["level"] == level]
    return SIMULATOR_SCENARIOS

def evaluate_scenario(scenario_id: str, selected_option_index: int) -> Dict[str, Any]:
    scenario = next((s for s in SIMULATOR_SCENARIOS if s["id"] == scenario_id), None)
    if not scenario:
        return {"error": "Scenario not found"}
        
    is_correct = scenario["correct_index"] == selected_option_index
    score = scenario["points"] if is_correct else 0
    
    return {
        "scenario_id": scenario_id,
        "is_correct": is_correct,
        "score_earned": score,
        "selected_option": selected_option_index,
        "correct_option": scenario["correct_index"],
        "explanation_en": scenario["explanation_en"],
        "explanation_hi": scenario["explanation_hi"],
        "safety_tips": scenario["safety_tips"]
    }
