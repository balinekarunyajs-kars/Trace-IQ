from ..models import InvestigationCase
from ..dummy_data import security_events, transactions

from .behaviour import analyze_behaviour
from .classifier import classify_threat
from .risk import calculate_risk
from .rootcause import identify_root_cause
from .recommendation import generate_recommendations
from .timeline import build_timeline
from .summary import generate_summary

def correlate_events():

    investigations = []

    usernames = set()

    for event in security_events:
        usernames.add(event.username)

    for transaction in transactions:
        usernames.add(transaction.username)

    for username in usernames:

        user_events = [
            event
            for event in security_events
            if event.username == username
        ]

        user_transactions = [
            transaction
            for transaction in transactions
            if transaction.username == username
        ]

        case = InvestigationCase(
            case_id=f"CASE-{len(investigations)+1:03}",
            username=username,
            events=user_events,
            transactions=user_transactions
        )

        # AI Investigation — order matters: classify → risk → rootcause → summary
        behaviour = analyze_behaviour(case)
        timeline = build_timeline(case)
        case.threat = classify_threat(case)
        risk_score, risk_breakdown = calculate_risk(case)
        case.risk_score = risk_score
        case.root_cause = identify_root_cause(case)
        case.recommendations = generate_recommendations(case)
        summary = generate_summary(case)   # generated last so threat/risk/root_cause are populated

        investigations.append({
            "case": case.dict(),
            "behaviour_analysis": behaviour,
            "timeline": timeline,
            "risk_breakdown": risk_breakdown,
            "confidence_score": min(case.risk_score + 10, 100),
            "executive_summary": summary
        })

    return investigations