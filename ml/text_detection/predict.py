"""Text prediction module."""

import torch
import math
from typing import Dict, Any, List
from .model import load_model, TextClassifier

class TextDetector:
    """Detector for AI-generated text."""
    
    def __init__(self, model_name: str = None, device: str = 'cpu'):
        """
        Initialize the text detector.
        
        Args:
            model_name: Hugging Face model name or path.
            device: Device to run on.
        """
        self.device = torch.device(device)
        self.model_name = model_name
        self.classifier = None
        
        if model_name:
            self.classifier = load_model(model_name, self.device)
            
    def _preprocess_text(self, text: str) -> Dict[str, torch.Tensor]:
        """Tokenize and truncate text."""
        if not self.classifier:
            raise RuntimeError("Model not loaded.")
            
        return self.classifier.tokenizer(
            text,
            padding=True,
            truncation=True,
            max_length=512,
            return_tensors="pt"
        ).to(self.device)

    def _analyze_patterns(self, text: str) -> Dict[str, float]:
        """
        Statistical text analysis.
        
        Provides proxies for perplexity, burstiness, and sentence length variation.
        """
        sentences = [s.strip() for s in text.split('.') if s.strip()]
        if not sentences:
            return {"avg_sentence_length": 0, "length_variance": 0}
            
        lengths = [len(s.split()) for s in sentences]
        avg_len = sum(lengths) / len(lengths)
        
        variance = sum((l - avg_len) ** 2 for l in lengths) / len(lengths) if len(lengths) > 1 else 0
        
        return {
            "avg_sentence_length": avg_len,
            "length_variance": variance,
            "sentence_count": len(sentences)
        }
        
    def predict(self, text: str) -> Dict[str, Any]:
        """
        Predict if text is AI-generated.
        
        Args:
            text: The text to analyze.
            
        Returns:
            Dictionary with prediction results.
        """
        if not text or not text.strip():
            return {
                "is_ai_generated": False,
                "confidence": 0.0,
                "label": "unknown",
                "details": "Empty text provided.",
                "error": True
            }
            
        patterns = self._analyze_patterns(text)
            
        if not self.classifier:
            return {
                "is_ai_generated": False,
                "confidence": 0.0,
                "label": "unknown",
                "details": "Model not loaded. Statistical patterns extracted.",
                "patterns": patterns,
                "error": True
            }
            
        try:
            inputs = self._preprocess_text(text)
            
            with torch.no_grad():
                outputs = self.classifier.model(**inputs)
                
            probs = torch.softmax(outputs.logits, dim=-1).squeeze().tolist()
            
            # Assuming class 1 is AI-generated
            is_ai_prob = probs[1] if len(probs) > 1 else probs[0]
            
            return {
                "is_ai_generated": is_ai_prob > 0.5,
                "confidence": is_ai_prob if is_ai_prob > 0.5 else 1 - is_ai_prob,
                "label": "ai_generated" if is_ai_prob > 0.5 else "human_written",
                "details": "Prediction successful.",
                "patterns": patterns
            }
            
        except Exception as e:
            return {
                "is_ai_generated": False,
                "confidence": 0.0,
                "label": "error",
                "details": f"Error during prediction: {str(e)}",
                "error": True
            }

    def predict_batch(self, texts: List[str]) -> List[Dict[str, Any]]:
        """Predict on a batch of texts."""
        return [self.predict(text) for text in texts]
