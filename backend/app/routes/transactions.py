from fastapi import APIRouter
from app.dummy_data import transactions

router = APIRouter(
    tags=["Transactions"]
)


@router.get("/transactions")
def get_transactions():
    return [
        {
            "transaction_id": t.transaction_id,
            "timestamp": t.timestamp,
            "username": t.username,
            "amount": t.amount,
            "beneficiary": t.beneficiary,
            "location": t.location,
            "status": t.status,
        }
        for t in transactions
    ]
