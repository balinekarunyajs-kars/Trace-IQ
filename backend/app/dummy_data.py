from .models import SecurityEvent, Transaction

security_events = [

    SecurityEvent(
        event_id="EV001",
        timestamp="2026-07-16 09:15:20",
        username="Database Administrator",
        ip_address="192.168.1.10",
        device="Admin-PC-01",
        event_type="Successful Login",
        severity="Low"
    ),

    SecurityEvent(
        event_id="EV002",
        timestamp="2026-07-16 09:18:40",
        username="Database Administrator",
        ip_address="185.220.101.45",
        device="Unknown Device",
        event_type="New Device Login",
        severity="High"
    ),

    SecurityEvent(
        event_id="EV003",
        timestamp="2026-07-16 09:20:15",
        username="Database Administrator",
        ip_address="185.220.101.45",
        device="Unknown Device",
        event_type="Privilege Escalation",
        severity="Critical"
    ),

    SecurityEvent(
        event_id="EV004",
        timestamp="2026-07-16 09:25:30",
        username="Treasury Officer",
        ip_address="192.168.1.20",
        device="Treasury-PC",
        event_type="Failed Login",
        severity="Medium"
    )

]

transactions = [

    Transaction(
        transaction_id="TX001",
        timestamp="2026-07-16 09:22:10",
        username="Database Administrator",
        amount=1500000,
        beneficiary="Unknown External Account",
        location="Singapore",
        status="Pending"
    ),

    Transaction(
        transaction_id="TX002",
        timestamp="2026-07-16 10:05:15",
        username="Treasury Officer",
        amount=25000,
        beneficiary="Vendor Payment",
        location="Chennai",
        status="Completed"
    )

]