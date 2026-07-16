from pydantic import BaseModel
from typing import List


class SecurityEvent(BaseModel):
    event_id: str
    timestamp: str
    username: str
    ip_address: str
    device: str
    event_type: str
    severity: str


class Transaction(BaseModel):
    transaction_id: str
    timestamp: str
    username: str
    amount: float
    beneficiary: str
    location: str
    status: str


class InvestigationCase(BaseModel):
    case_id: str
    username: str
    events: List[SecurityEvent]
    transactions: List[Transaction]

    threat: str = ""
    risk_score: int = 0
    root_cause: str = ""
    recommendations: List[str] = []