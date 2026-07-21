"""Account verification router."""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..schemas import AccountVerificationRequest, AccountVerificationResponse
from ..database import get_db

router = APIRouter()

@router.post("/verify", response_model=AccountVerificationResponse)
async def verify_account(request: AccountVerificationRequest, db: Session = Depends(get_db)):
    """Verify an account profile."""
    # TODO: Integrate ML/rules for account verification
    return AccountVerificationResponse(
        is_fake=False,
        confidence=0.80,
        risk_factors=["New account", "Missing profile picture"]
    )

@router.get("/results/{analysis_id}", response_model=AccountVerificationResponse)
async def get_result(analysis_id: int, db: Session = Depends(get_db)):
    """Get a previous account verification result."""
    # TODO: Fetch from DB
    return AccountVerificationResponse(
        is_fake=False,
        confidence=0.99,
        risk_factors=["None"]
    )
