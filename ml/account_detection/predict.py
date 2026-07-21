"""Account prediction module."""

import os
import numpy as np
from typing import Dict, Any, List
from .model import AccountClassifier
from .features import extract_features, normalize_features, get_feature_names

class AccountDetector:
    """Detector for fake social media accounts."""
    
    def __init__(self, model_path: str = None):
        """
        Initialize the detector.
        
        Args:
            model_path: Path to trained Scikit-learn model.
        """
        self.model_path = model_path
        self.classifier = AccountClassifier()
        self.is_loaded = False
        
        if model_path and os.path.exists(model_path):
            try:
                self.classifier.load_model(model_path)
                self.is_loaded = True
            except Exception as e:
                print(f"Failed to load account model from {model_path}: {e}")
                
    def _identify_risk_factors(self, profile_data: Dict[str, Any], features: np.ndarray, feature_importance: np.ndarray = None) -> List[str]:
        """Identify which features indicate a fake account based on simple heuristics or importances."""
        risks = []
        
        if profile_data.get('account_age_days', 100) < 7:
            risks.append("Account is very new.")
            
        followers = profile_data.get('followers_count', 1)
        following = profile_data.get('following_count', 0)
        
        if following > 1000 and followers < 50:
            risks.append("High following-to-follower ratio.")
            
        if not profile_data.get('has_profile_picture', True):
            risks.append("No profile picture.")
            
        username = str(profile_data.get('username', ''))
        from .features import _digit_ratio
        if _digit_ratio(username) > 0.4:
            risks.append("High number of digits in username.")
            
        return risks

    def predict(self, profile_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Predict if an account is fake.
        
        Args:
            profile_data: Dictionary containing profile information.
            
        Returns:
            Dictionary with prediction results.
        """
        try:
            features = extract_features(profile_data)
            normalized = normalize_features(features)
            
            risk_factors = self._identify_risk_factors(profile_data, features)
            
            if not self.is_loaded:
                # Heuristic-based fallback if no model
                risk_score = len(risk_factors) / 4.0
                is_fake = risk_score > 0.5
                return {
                    "is_fake": is_fake,
                    "confidence": min(1.0, risk_score + 0.1) if is_fake else 1.0 - risk_score,
                    "risk_factors": risk_factors,
                    "feature_importance": None,
                    "details": "Model not loaded. Using heuristic fallback.",
                    "error": True
                }
                
            probs = self.classifier.model.predict_proba(normalized)[0]
            is_fake = bool(self.classifier.model.predict(normalized)[0])
            
            importances = dict(zip(get_feature_names(), self.classifier.get_feature_importance().tolist()))
            
            return {
                "is_fake": is_fake,
                "confidence": float(probs[1]) if is_fake else float(probs[0]),
                "risk_factors": risk_factors,
                "feature_importance": importances,
                "details": "Prediction successful."
            }
            
        except Exception as e:
            return {
                "is_fake": False,
                "confidence": 0.0,
                "risk_factors": [],
                "details": f"Error during prediction: {str(e)}",
                "error": True
            }
