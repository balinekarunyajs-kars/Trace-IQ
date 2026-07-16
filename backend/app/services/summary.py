def generate_summary(case):

    return (
        f"{case.username} shows suspicious behaviour. "
        f"The detected threat is '{case.threat}' with a "
        f"risk score of {case.risk_score}. "
        f"The likely root cause is '{case.root_cause}'. "
        f"Immediate investigation is recommended."
    )