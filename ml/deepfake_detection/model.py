"""Deepfake detection model architecture."""

import torch
import torch.nn as nn
import torchvision.models as models

class DeepfakeClassifier(nn.Module):
    """
    Deepfake detection classifier using EfficientNet-B0 backbone.
    
    This architecture uses a pretrained EfficientNet-B0 as a feature extractor,
    followed by a custom classification head for binary classification (real vs fake).
    EfficientNet is chosen for its excellent trade-off between accuracy and computational efficiency.
    """
    def __init__(self, pretrained: bool = True):
        super(DeepfakeClassifier, self).__init__()
        # Load EfficientNet-B0 backbone
        weights = models.EfficientNet_B0_Weights.IMAGENET1K_V1 if pretrained else None
        self.backbone = models.efficientnet_b0(weights=weights)
        
        # Modify the classifier head for binary classification
        in_features = self.backbone.classifier[1].in_features
        self.backbone.classifier = nn.Sequential(
            nn.Dropout(p=0.3, inplace=True),
            nn.Linear(in_features, 512),
            nn.ReLU(),
            nn.Dropout(p=0.3),
            nn.Linear(512, 1)  # Output a single logit for binary classification
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        """Forward pass of the model."""
        return self.backbone(x)

def load_model(checkpoint_path: str, device: torch.device) -> DeepfakeClassifier:
    """
    Load a model from a checkpoint file.
    
    Args:
        checkpoint_path: Path to the model weights.
        device: Device to load the model onto.
        
    Returns:
        Loaded DeepfakeClassifier model.
    """
    model = DeepfakeClassifier(pretrained=False)
    try:
        state_dict = torch.load(checkpoint_path, map_location=device)
        model.load_state_dict(state_dict)
        model.to(device)
        model.eval()
        return model
    except Exception as e:
        raise RuntimeError(f"Failed to load model from {checkpoint_path}: {e}")
