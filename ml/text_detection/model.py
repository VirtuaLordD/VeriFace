"""Text detection model setup."""

import torch
from transformers import AutoModelForSequenceClassification, AutoTokenizer
from typing import Tuple, Optional

class TextClassifier:
    """Wrapper for Hugging Face sequence classification models."""
    
    def __init__(self, model: AutoModelForSequenceClassification, tokenizer: AutoTokenizer, device: torch.device):
        self.model = model
        self.tokenizer = tokenizer
        self.device = device
        self.model.to(self.device)
        self.model.eval()

def load_model(model_name_or_path: str, device: torch.device) -> Optional[TextClassifier]:
    """
    Load a Hugging Face model and tokenizer.
    
    Args:
        model_name_or_path: Hugging Face model name or local path.
        device: Device to load the model onto.
        
    Returns:
        TextClassifier instance or None if loading fails.
    """
    try:
        tokenizer = AutoTokenizer.from_pretrained(model_name_or_path)
        model = AutoModelForSequenceClassification.from_pretrained(model_name_or_path)
        return TextClassifier(model, tokenizer, device)
    except Exception as e:
        print(f"Failed to load text model {model_name_or_path}: {e}")
        return None
