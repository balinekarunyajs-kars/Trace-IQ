from fastapi import APIRouter
from app.dummy_data import security_events, transactions

router = APIRouter(
    tags=["Analytics"]
)

@router.get("/analytics")
def get_analytics():
    severity_counts = {
        'Critical': 0,
        'High': 0,
        'Medium': 0,
        'Low': 0,
    }
    for event in security_events:
        severity_counts[event.severity] = severity_counts.get(event.severity, 0) + 1

    return {
        "threatDistribution": [
            {"name": severity, "value": count}
            for severity, count in severity_counts.items()
        ],
        "riskLevels": [
            {"name": "Critical", "value": severity_counts['Critical']},
            {"name": "High", "value": severity_counts['High']},
            {"name": "Medium", "value": severity_counts['Medium']},
            {"name": "Low", "value": severity_counts['Low']},
        ],
        "summary": {
            "totalEvents": len(security_events),
            "totalTransactions": len(transactions),
            "criticalEvents": severity_counts['Critical'],
            "highEvents": severity_counts['High'],
        },
    }
