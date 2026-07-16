from fastapi import APIRouter
from ..dummy_data import security_events

router = APIRouter(
    tags=["Events"]
)

@router.get("/events")
def get_events():
    return [event.dict() for event in security_events]
