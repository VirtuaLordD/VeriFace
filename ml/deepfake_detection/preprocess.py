"""Image and video preprocessing for deepfake detection."""

import cv2
import numpy as np
import torch
from torchvision import transforms
from PIL import Image
from typing import List, Tuple, Optional

def get_transform() -> transforms.Compose:
    """Returns the torchvision transforms pipeline for EfficientNet."""
    return transforms.Compose([
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])

def extract_faces(image: np.ndarray) -> List[np.ndarray]:
    """
    Detect faces using OpenCV's Haar cascade and return crops.
    
    Args:
        image: BGR image as numpy array.
        
    Returns:
        List of face crops as numpy arrays (RGB format).
    """
    # Use Haar cascade for simplicity; in production, consider MTCNN or RetinaFace
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    face_crops = []
    
    # Convert BGR to RGB for PIL/torchvision compatibility
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    for (x, y, w, h) in faces:
        # Add a small margin
        margin_y = int(h * 0.1)
        margin_x = int(w * 0.1)
        
        y1 = max(0, y - margin_y)
        y2 = min(image.shape[0], y + h + margin_y)
        x1 = max(0, x - margin_x)
        x2 = min(image.shape[1], x + w + margin_x)
        
        crop = image_rgb[y1:y2, x1:x2]
        face_crops.append(crop)
        
    return face_crops

def preprocess_image(image_path: str) -> Optional[torch.Tensor]:
    """
    Load image, extract face, and apply transforms.
    
    Args:
        image_path: Path to the image file.
        
    Returns:
        Preprocessed tensor or None if no face found.
    """
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError(f"Could not read image: {image_path}")
        
    faces = extract_faces(img)
    if not faces:
        return None
        
    # Use the largest face found
    largest_face = max(faces, key=lambda f: f.shape[0] * f.shape[1])
    
    # Convert numpy array to PIL Image for torchvision transforms
    pil_img = Image.fromarray(largest_face)
    transform = get_transform()
    tensor = transform(pil_img)
    
    return tensor.unsqueeze(0)  # Add batch dimension

def preprocess_video(video_path: str, num_frames: int = 16) -> List[torch.Tensor]:
    """
    Extract frames uniformly from video and preprocess them.
    
    Args:
        video_path: Path to the video file.
        num_frames: Number of frames to extract.
        
    Returns:
        List of preprocessed frame tensors.
    """
    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        raise ValueError(f"Could not open video: {video_path}")
        
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    
    if total_frames == 0:
        return []
        
    frame_indices = np.linspace(0, total_frames - 1, num_frames, dtype=int)
    preprocessed_frames = []
    
    for frame_idx in frame_indices:
        cap.set(cv2.CAP_PROP_POS_FRAMES, frame_idx)
        ret, frame = cap.read()
        if not ret:
            continue
            
        faces = extract_faces(frame)
        if faces:
            largest_face = max(faces, key=lambda f: f.shape[0] * f.shape[1])
            pil_img = Image.fromarray(largest_face)
            tensor = get_transform()(pil_img)
            preprocessed_frames.append(tensor.unsqueeze(0))
            
    cap.release()
    return preprocessed_frames
