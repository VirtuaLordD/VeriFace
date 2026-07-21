"""Tests for Trust Score Engine."""

import pytest
from ml.trust_score.engine import TrustScoreEngine, TrustScore

@pytest.fixture
def engine():
    return TrustScoreEngine()

def test_compute_full_score(engine):
    """Test computing score with all components available."""
    deepfake_res = {"is_deepfake": False, "confidence": 0.9} # High trust (100 * 0.9 + 50 * 0.1) = 95
    text_res = {"is_ai_generated": False, "confidence": 0.8} # High trust (100 * 0.8 + 50 * 0.2) = 90
    account_res = {"is_fake": False, "confidence": 0.9} # High trust (100 * 0.9 + 50 * 0.1) = 95
    
    score = engine.compute_score(deepfake_res, text_res, account_res)
    
    assert isinstance(score, TrustScore)
    assert score.overall_score > 90
    assert score.risk_level == "low"
    assert "deepfake" in score.component_scores
    assert "text" in score.component_scores
    assert "account" in score.component_scores

def test_compute_partial_score(engine):
    """Test computing score with only some components."""
    deepfake_res = {"is_deepfake": True, "confidence": 0.9} # Low trust (0 * 0.9 + 50 * 0.1) = 5
    
    score = engine.compute_score(deepfake_result=deepfake_res)
    
    assert score.overall_score == 5.0
    assert score.risk_level == "critical"
    assert "deepfake" in score.component_scores
    assert "text" not in score.component_scores

def test_risk_level_high(engine):
    """Test risk level classification for high risk."""
    assert engine.get_risk_level(30) == "high"

def test_risk_level_low(engine):
    """Test risk level classification for low risk."""
    assert engine.get_risk_level(85) == "low"
    assert engine.get_risk_level(70) == "low"

def test_normalize_confidence(engine):
    """Test confidence normalization."""
    assert engine.normalize_confidence(0.5) == 50.0
    assert engine.normalize_confidence(1.0) == 100.0
    assert engine.normalize_confidence(0.0) == 0.0

def test_empty_input(engine):
    """Test behavior when no inputs are provided."""
    score = engine.compute_score()
    
    assert score.overall_score == 50.0 # Default fallback
    assert len(score.component_scores) == 0
    assert score.confidence == 0.0
