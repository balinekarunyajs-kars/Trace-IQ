from fastapi import APIRouter
from ..dummy_data import transactions

router = APIRouter(
    tags=["Transactions"]
)

@router.get("/transactions")
def get_transactions():
    return [transaction.dict() for transaction in transactions]
