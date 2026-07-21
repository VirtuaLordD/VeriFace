"""Deepfake prediction module."""

import os
import torch
from typing import Dict, Any, Union
from .model import DeepfakeClassifier, load_model
from .preprocess import preprocess_image, preprocess_video

class DeepfakeDetector:
    """Detector for deepfake images and videos."""
    
    def __init__(self, model_path: str = None, device: str = 'cpu'):
        """
        Initialize the detector.
        
        Args:
            model_path: Path to model weights. If None, runs in stub mode.
            device: Device to run inference on ('cpu' or 'cuda').
        """
        self.device = torch.device(device)
        self.model_path = model_path
        self.model = None
        
        if model_path and os.path.exists(model_path):
            self.model = load_model(model_path, self.device)
            
    def _postprocess(self, output: torch.Tensor) -> float:
        """Convert model output logits to probability."""
        prob = torch.sigmoid(output).item()
        return prob
        
    def predict_image(self, image_path: str) -> Dict[str, Any]:
        """
        Predict if an image is a deepfake.
        
        Args:
            image_path: Path to the image file.
            
        Returns:
            Dictionary with prediction results.
        """
        if not self.model:
            # Return stub response when no model is available
            return {
                "is_deepfake": False,
                "confidence": 0.0,
                "face_count": 0,
                "details": "Model not loaded. Please provide a valid model path.",
                "error": True
            }
            
        try:
            tensor = preprocess_image(image_path)
            if tensor is None:
                return {
                    "is_deepfake": False,
                    "confidence": 0.0,
                    "face_count": 0,
                    "details": "No face detected in the image.",
                }
                
            tensor = tensor.to(self.device)
            with torch.no_grad():
                output = self.model(tensor)
                
            prob = self._postprocess(output)
            
            return {
                "is_deepfake": prob > 0.5,
                "confidence": prob if prob > 0.5 else 1 - prob,
                "face_count": 1,
                "details": "Prediction successful.",
            }
        except Exception as e:
            return {
                "is_deepfake": False,
                "confidence": 0.0,
                "face_count": 0,
                "details": f"Error during prediction: {str(e)}",
                "error": True
            }

    def predict_video(self, video_path: str) -> Dict[str, Any]:
        """
        Predict if a video is a deepfake.
        
        Args:
            video_path: Path to the video file.
            
        Returns:
            Dictionary with prediction results.
        """
        if not self.model:
             return {
                "is_deepfake": False,
                "confidence": 0.0,
                "frame_scores": [],
                "details": "Model not loaded. Please provide a valid model path.",
                "error": True
            }
            
        try:
            tensors = preprocess_video(video_path)
            if not tensors:
                return {
                    "is_deepfake": False,
                    "confidence": 0.0,
                    "frame_scores": [],
                    "details": "No faces detected in the video frames.",
                }
                
            batch = torch.cat(tensors).to(self.device)
            
            with torch.no_grad():
                outputs = self.model(batch)
                
            probs = torch.sigmoid(outputs).squeeze().cpu().numpy().tolist()
            if isinstance(probs, float):
                probs = [probs]
                
            avg_prob = sum(probs) / len(probs)
            
            return {
                "is_deepfake": avg_prob > 0.5,
                "confidence": avg_prob if avg_prob > 0.5 else 1 - avg_prob,
                "frame_scores": probs,
                "details": f"Analyzed {len(probs)} frames.",
            }
        except Exception as e:
            return {
                "is_deepfake": False,
                "confidence": 0.0,
                "frame_scores": [],
                "details": f"Error during prediction: {str(e)}",
                "error": True
            }
