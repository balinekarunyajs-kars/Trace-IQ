from ..models import InvestigationCase


def analyze_behaviour(case: InvestigationCase):

    suspicious = []

    # Check for new device login
    for event in case.events:
        if event.event_type == "New Device Login":
            suspicious.append("Login from a new device detected.")

    # Check for privilege escalation
    for event in case.events:
        if event.event_type == "Privilege Escalation":
            suspicious.append("Privilege escalation activity detected.")

    # Check for large transactions
    for tx in case.transactions:
        if tx.amount >= 1000000:
            suspicious.append(
                f"Large transaction of ₹{tx.amount:,.0f} detected."
            )

    return suspicious