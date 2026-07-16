from fastapi import APIRouter
from ..services.correlation import correlate_events

router = APIRouter(
    tags=["Investigations"]
)


@router.get("/cases")
def get_cases():

    return correlate_events()