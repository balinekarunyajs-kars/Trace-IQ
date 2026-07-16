from typing import Any, Dict, List

try:
    from pydantic import BaseModel, Field
except ImportError:
    class Field:
        def __init__(self, default=None, default_factory=None, **kwargs):
            self.default = default
            self.default_factory = default_factory

    class BaseModel:
        def __init__(self, **data: Any):
            cls = self.__class__
            annotations = getattr(cls, '__annotations__', {})

            for key, value in data.items():
                setattr(self, key, value)

            for key in annotations:
                if key not in self.__dict__:
                    default = getattr(cls, key, None)
                    if isinstance(default, Field):
                        if default.default_factory is not None:
                            setattr(self, key, default.default_factory())
                        else:
                            setattr(self, key, default.default)
                    elif default is not None:
                        setattr(self, key, default)

        def dict(self) -> Dict[str, Any]:
            return self.__dict__

        def json(self, *args, **kwargs) -> str:
            import json
            return json.dumps(self.dict(), *args, **kwargs)


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
    recommendations: List[str] = Field(default_factory=list)