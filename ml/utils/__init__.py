"""Utility functions for ML modules."""

import os
import torch
from typing import Dict, Any, Union

def get_device() -> torch.device:
    """
    Auto-detect and return the best available PyTorch device.
    """
    if torch.cuda.is_available():
        return torch.device("cuda")
    elif torch.backends.mps.is_available():
        return torch.device("mps")
    return torch.device("cpu")

def load_checkpoint(path: str, device: torch.device) -> Dict[str, Any]:
    """
    Generic model loading utility.
    
    Args:
        path: Path to the checkpoint file.
        device: Device to load onto.
        
    Returns:
        Loaded state dictionary.
    """
    if not os.path.exists(path):
        raise FileNotFoundError(f"Checkpoint not found at {path}")
    return torch.load(path, map_location=device)

def validate_image(file_path: str) -> bool:
    """Check if file has a valid image extension."""
    valid_extensions = {'.jpg', '.jpeg', '.png', '.bmp', '.webp'}
    ext = os.path.splitext(file_path)[1].lower()
    return ext in valid_extensions and os.path.exists(file_path)

def validate_video(file_path: str) -> bool:
    """Check if file has a valid video extension."""
    valid_extensions = {'.mp4', '.avi', '.mov', '.mkv'}
    ext = os.path.splitext(file_path)[1].lower()
    return ext in valid_extensions and os.path.exists(file_path)

def format_prediction(prediction_dict: Dict[str, Any]) -> Dict[str, Any]:
    """Format a prediction dictionary for API output."""
    return {
        "status": "error" if prediction_dict.get("error") else "success",
        "data": prediction_dict
    }
