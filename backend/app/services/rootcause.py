from ..models import InvestigationCase


def identify_root_cause(case: InvestigationCase):

    for event in case.events:

        if event.event_type == "Privilege Escalation":
            return "Unauthorized privilege escalation."

        if event.event_type == "New Device Login":
            return "Access from an unrecognized device."

    for tx in case.transactions:

        if tx.amount >= 1000000:
            return "Unusually large financial transaction."

    return "No suspicious activity detected."