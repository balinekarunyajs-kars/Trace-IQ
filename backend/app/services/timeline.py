from datetime import datetime


def build_timeline(case):

    timeline = []

    # Add security events
    for event in case.events:
        timeline.append({
            "timestamp": event.timestamp,
            "type": "Security Event",
            "description": event.event_type
        })

    # Add transactions
    for tx in case.transactions:
        timeline.append({
            "timestamp": tx.timestamp,
            "type": "Transaction",
            "description": f"₹{tx.amount:,.0f} transferred"
        })

    # Sort chronologically
    timeline.sort(
        key=lambda x: datetime.strptime(
            x["timestamp"],
            "%Y-%m-%d %H:%M:%S"
        )
    )

    return timeline