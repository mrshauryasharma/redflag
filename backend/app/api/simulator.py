from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.services.simulator_bank import get_scenarios, evaluate_scenario

router = APIRouter(prefix="/simulator", tags=["Scam Simulator Training"])

class ScenarioSubmitRequest(BaseModel):
    scenario_id: str
    selected_option_index: int

@router.get("/scenarios")
def list_scenarios(level: Optional[str] = None):
    scenarios = get_scenarios(level)
    # Hide correct answers from the list endpoint so user can't inspect cheat
    sanitized = []
    for s in scenarios:
        item = s.copy()
        item.pop("correct_index", None)
        item.pop("explanation_en", None)
        item.pop("explanation_hi", None)
        sanitized.append(item)
    return sanitized

@router.post("/submit")
def submit_answer(req: ScenarioSubmitRequest):
    result = evaluate_scenario(req.scenario_id, req.selected_option_index)
    if "error" in result:
        raise HTTPException(status_code=404, detail=result["error"])
    return result
