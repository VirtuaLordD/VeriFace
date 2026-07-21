"""Pydantic schemas."""

from pydantic import BaseModel, Field
from typing import Dict, Any, List, Optional
from datetime import datetime

class DeepfakeRequest(BaseModel):
    """Schema for deepfake analysis request metadata."""
    filename: str

class DeepfakeResponse(BaseModel):
    """Schema for deepfake analysis response."""
    is_deepfake: bool
    confidence: float
    details: Dict[str, Any]

class TextAnalysisRequest(BaseModel):
    """Schema for text analysis request."""
    text: str = Field(..., min_length=1)

class TextAnalysisResponse(BaseModel):
    """Schema for text analysis response."""
    is_ai_generated: bool
    confidence: float
    details: Dict[str, Any]

class AccountVerificationRequest(BaseModel):
    """Schema for account verification request."""
    username: str
    platform: str
    profile_data: Dict[str, Any]

class AccountVerificationResponse(BaseModel):
    """Schema for account verification response."""
    is_fake: bool
    confidence: float
    risk_factors: List[str]

class TrustScoreRequest(BaseModel):
    """Schema for trust score computation request."""
    analysis_ids: Optional[List[int]] = None
    individual_scores: Optional[Dict[str, float]] = None

class TrustScoreResponse(BaseModel):
    """Schema for trust score response."""
    overall_score: float
    component_scores: Dict[str, float]
    risk_level: str
    timestamp: datetime

class HealthResponse(BaseModel):
    """Schema for health check response."""
    status: str
    version: str
    timestamp: datetime
    uptime: Optional[float] = None
