"""Health check router."""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import datetime
from ..database import get_db
from ..schemas import HealthResponse
import time

router = APIRouter()

START_TIME = time.time()

@router.get("", response_model=HealthResponse)
async def health_check():
    """Basic health check endpoint."""
    return HealthResponse(
        status="healthy",
        version="0.1.0",
        timestamp=datetime.utcnow(),
        uptime=time.time() - START_TIME
    )

@router.get("/ready")
async def readiness_probe(db: Session = Depends(get_db)):
    """Readiness probe checking DB connectivity."""
    try:
        db.execute("SELECT 1")
        return {"status": "ready"}
    except Exception as e:
        raise HTTPException(status_code=503, detail="Database not ready")
