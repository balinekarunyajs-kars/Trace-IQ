from ..models import InvestigationCase


def calculate_risk(case: InvestigationCase):

    risk = 0
    breakdown = {}

    # Analyze Security Events
    for event in case.events:

        if event.event_type == "Privilege Escalation":
            risk += 35
            breakdown["Privilege Escalation"] = 35

        elif event.event_type == "New Device Login":
            risk += 25
            breakdown["New Device Login"] = 25

        elif event.event_type == "Failed Login":
            risk += 10
            breakdown["Failed Login"] = 10

    # Analyze Transactions
    for tx in case.transactions:

        if tx.amount >= 1000000:
            risk += 30
            breakdown["Large Transaction"] = 30

    return min(risk, 100), breakdown