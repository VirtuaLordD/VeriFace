"""Account detection model."""

import numpy as np
import joblib
from sklearn.ensemble import RandomForestClassifier
from typing import Tuple, List, Optional

class AccountClassifier:
    """Wrapper for Scikit-learn account classification model."""
    
    def __init__(self, model_type: str = 'rf'):
        """
        Initialize the model.
        """
        self.model = RandomForestClassifier(
            n_estimators=100, 
            max_depth=10, 
            random_state=42
        )
        self.is_trained = False
        
    def train(self, X: np.ndarray, y: np.ndarray):
        """Train the model."""
        self.model.fit(X, y)
        self.is_trained = True
        
    def save_model(self, path: str):
        """Save the model to disk."""
        if not self.is_trained:
            raise RuntimeError("Cannot save an untrained model.")
        joblib.dump(self.model, path)
        
    def load_model(self, path: str):
        """Load the model from disk."""
        self.model = joblib.load(path)
        self.is_trained = True
        
    def get_feature_importance(self) -> np.ndarray:
        """Get feature importance scores."""
        if not self.is_trained:
            raise RuntimeError("Model must be trained to get feature importances.")
        return self.model.feature_importances_
