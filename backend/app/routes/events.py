from fastapi import APIRouter
from ..dummy_data import security_events

router = APIRouter(
    tags=["Security Events"]
)


@router.get("/events")
def get_events():
    return [
        {
            "event_id": e.event_id,
            "timestamp": e.timestamp,
            "username": e.username,
            "ip_address": e.ip_address,
            "device": e.device,
            "event_type": e.event_type,
            "severity": e.severity,
        }
        for e in security_events
    ]