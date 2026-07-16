from ..models import InvestigationCase


def generate_recommendations(case: InvestigationCase):

    recommendations = []

    for event in case.events:

        if event.event_type == "Privilege Escalation":
            recommendations.append(
                "Temporarily revoke privileged access."
            )

        if event.event_type == "New Device Login":
            recommendations.append(
                "Require Multi-Factor Authentication."
            )

    for tx in case.transactions:

        if tx.amount >= 1000000:
            recommendations.append(
                "Place the transaction on hold for manual verification."
            )

    if not recommendations:
        recommendations.append(
            "Continue monitoring."
        )

    return recommendations