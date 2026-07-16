from fastapi import APIRouter
from ..dummy_data import security_events

router = APIRouter(
    tags=["Security Events"]
)

@router.get("/events")
def get_events():
    return security_events