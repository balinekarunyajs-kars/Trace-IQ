from .models import SecurityEvent, Transaction

security_events = [

    SecurityEvent(
        event_id="EV001",
        timestamp="2026-07-16 08:55:10",
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
        timestamp="2026-07-16 09:22:05",
        username="Database Administrator",
        ip_address="185.220.101.45",
        device="Unknown Device",
        event_type="Bulk Data Export",
        severity="Critical"
    ),

    SecurityEvent(
        event_id="EV005",
        timestamp="2026-07-16 09:25:30",
        username="Treasury Officer",
        ip_address="192.168.1.20",
        device="Treasury-PC",
        event_type="Failed Login",
        severity="Medium"
    ),

    SecurityEvent(
        event_id="EV006",
        timestamp="2026-07-16 09:28:00",
        username="Treasury Officer",
        ip_address="192.168.1.20",
        device="Treasury-PC",
        event_type="Successful Login",
        severity="Low"
    ),

    SecurityEvent(
        event_id="EV007",
        timestamp="2026-07-16 09:30:00",
        username="Treasury Officer",
        ip_address="203.45.167.89",
        device="Mobile-Unknown",
        event_type="New Device Login",
        severity="High"
    ),

    SecurityEvent(
        event_id="EV008",
        timestamp="2026-07-16 10:45:00",
        username="Branch Manager",
        ip_address="192.168.2.50",
        device="BM-Workstation",
        event_type="Successful Login",
        severity="Low"
    ),

    SecurityEvent(
        event_id="EV009",
        timestamp="2026-07-16 10:50:00",
        username="Branch Manager",
        ip_address="192.168.2.50",
        device="BM-Workstation",
        event_type="Config Change",
        severity="Medium"
    ),

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
        beneficiary="Vendor Payment - Tech Corp",
        location="Chennai",
        status="Completed"
    ),

    Transaction(
        transaction_id="TX003",
        timestamp="2026-07-16 09:31:00",
        username="Treasury Officer",
        amount=875000,
        beneficiary="Offshore Holdings Ltd",
        location="Dubai",
        status="Pending"
    ),

    Transaction(
        transaction_id="TX004",
        timestamp="2026-07-16 11:00:00",
        username="Branch Manager",
        amount=50000,
        beneficiary="Salary Disbursement",
        location="Mumbai",
        status="Completed"
    ),

]