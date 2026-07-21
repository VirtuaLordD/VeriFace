"""Trust score computation engine."""

from dataclasses import dataclass, field
from datetime import datetime
from typing import Dict, Any, Optional

@dataclass
class TrustScore:
    """Dataclass representing the computed trust score."""
    overall_score: float
    risk_level: str
    component_scores: Dict[str, float]
    confidence: float
    timestamp: str = field(default_factory=lambda: datetime.utcnow().isoformat())
    details: str = ""

class TrustScoreEngine:
    """Engine for aggregating various signals into a single trust score."""
    
    def __init__(self):
        # Default weights for different components
        self.weights = {
            "deepfake": 0.40,
            "text": 0.35,
            "account": 0.25
        }
        
    def get_risk_level(self, score: float) -> str:
        """
        Determine the risk level based on the trust score.
        
        Args:
            score: The computed trust score (0-100).
            
        Returns:
            Risk level string.
        """
        if score >= 70:
            return "low"
        elif score >= 40:
            return "medium"
        elif score >= 20:
            return "high"
        else:
            return "critical"
            
    def normalize_confidence(self, raw_confidence: float) -> float:
        """Normalize a confidence value (0.0 to 1.0) to a 0-100 scale."""
        return min(max(raw_confidence * 100.0, 0.0), 100.0)

    def compute_score(self, 
                      deepfake_result: Optional[Dict[str, Any]] = None,
                      text_result: Optional[Dict[str, Any]] = None,
                      account_result: Optional[Dict[str, Any]] = None) -> TrustScore:
        """
        Compute the overall trust score based on available components.
        
        Args:
            deepfake_result: Result from DeepfakeDetector.
            text_result: Result from TextDetector.
            account_result: Result from AccountDetector.
            
        Returns:
            TrustScore object.
        """
        components = {}
        active_weights = {}
        total_weight = 0.0
        overall_confidence_sum = 0.0
        
        # Process deepfake component
        if deepfake_result and not deepfake_result.get('error', False):
            # If it IS a deepfake, trust is low (0). If NOT, trust is high (100).
            # We scale this by the confidence.
            is_fake = deepfake_result.get('is_deepfake', False)
            conf = deepfake_result.get('confidence', 0.5)
            
            base_score = 0.0 if is_fake else 100.0
            # Blend towards 50 based on uncertainty (lower confidence)
            score = base_score * conf + 50.0 * (1 - conf)
            
            components['deepfake'] = score
            active_weights['deepfake'] = self.weights['deepfake']
            total_weight += self.weights['deepfake']
            overall_confidence_sum += conf
            
        # Process text component
        if text_result and not text_result.get('error', False):
            is_ai = text_result.get('is_ai_generated', False)
            conf = text_result.get('confidence', 0.5)
            
            base_score = 0.0 if is_ai else 100.0
            score = base_score * conf + 50.0 * (1 - conf)
            
            components['text'] = score
            active_weights['text'] = self.weights['text']
            total_weight += self.weights['text']
            overall_confidence_sum += conf
            
        # Process account component
        if account_result and not account_result.get('error', False):
            is_fake = account_result.get('is_fake', False)
            conf = account_result.get('confidence', 0.5)
            
            base_score = 0.0 if is_fake else 100.0
            score = base_score * conf + 50.0 * (1 - conf)
            
            components['account'] = score
            active_weights['account'] = self.weights['account']
            total_weight += self.weights['account']
            overall_confidence_sum += conf
            
        # Calculate overall score
        if total_weight > 0:
            final_score = sum(components[k] * (w / total_weight) for k, w in active_weights.items())
            avg_confidence = overall_confidence_sum / len(components)
            details = f"Computed using {len(components)} components."
        else:
            final_score = 50.0  # Unknown baseline
            avg_confidence = 0.0
            details = "No valid components provided for scoring."
            
        return TrustScore(
            overall_score=round(final_score, 2),
            risk_level=self.get_risk_level(final_score),
            component_scores={k: round(v, 2) for k, v in components.items()},
            confidence=round(self.normalize_confidence(avg_confidence), 2),
            details=details
        )
