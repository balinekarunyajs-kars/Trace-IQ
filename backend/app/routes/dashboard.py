from fastapi import APIRouter
from ..dummy_data import security_events, transactions

router = APIRouter(
    tags=["Dashboard"]
)


@router.get("/dashboard")
def get_dashboard():

    critical_events = sum(
        1
        for event in security_events
        if event.severity == "Critical"
    )

    high_events = sum(
        1
        for event in security_events
        if event.severity == "High"
    )

    latest_threat = {
        "case_id": "CASE-001",
        "threat": "Potential Account Takeover",
        "risk_score": 94,
        "status": "Under Investigation"
    }

    return {
        "total_security_events": len(security_events),
        "total_transactions": len(transactions),
        "critical_events": critical_events,
        "high_events": high_events,
        "active_cases": 1,
        "system_status": "Secure",
        "latest_threat": latest_threat
    }