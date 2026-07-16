from fastapi import APIRouter, HTTPException
from app.services.correlation import correlate_events

router = APIRouter(
    tags=["Investigations"]
)


@router.get("/cases")
def get_cases():
    return correlate_events()


@router.get("/cases/{case_id}")
def get_case(case_id: str):
    investigations = correlate_events()
    for investigation in investigations:
        case = investigation.get("case")
        if case and case.get("case_id") == case_id:
            return investigation
    raise HTTPException(status_code=404, detail="Case not found")