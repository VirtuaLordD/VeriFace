"""Database models."""

from sqlalchemy import Column, Integer, String, Float, JSON, DateTime
import datetime
from ..database import Base

class AnalysisResult(Base):
    """Model for storing analysis results."""
    __tablename__ = "analysis_results"

    id = Column(Integer, primary_key=True, index=True)
    analysis_type = Column(String, index=True)
    input_type = Column(String)
    result_score = Column(Float)
    confidence = Column(Float)
    details = Column(JSON)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
