from ..models import InvestigationCase


def classify_threat(case: InvestigationCase):

    has_privilege = any(
        event.event_type == "Privilege Escalation"
        for event in case.events
    )

    has_new_device = any(
        event.event_type == "New Device Login"
        for event in case.events
    )

    has_large_transaction = any(
        tx.amount >= 1000000
        for tx in case.transactions
    )

    # Threat Classification Logic
    if has_privilege and has_large_transaction:
        return "Potential Account Takeover"

    if has_new_device and has_large_transaction:
        return "Suspicious Financial Activity"

    if has_privilege:
        return "Insider Threat"

    if has_new_device:
        return "Suspicious Login"

    return "Normal Activity"