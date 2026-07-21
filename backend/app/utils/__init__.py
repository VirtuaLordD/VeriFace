"""Utility functions."""

import uuid
from datetime import datetime, timezone
import os

ALLOWED_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}
ALLOWED_VIDEO_EXTENSIONS = {".mp4", ".avi", ".mov", ".mkv"}

def validate_image_format(filename: str) -> bool:
    """Validate if the file has an allowed image extension."""
    ext = os.path.splitext(filename)[1].lower()
    return ext in ALLOWED_IMAGE_EXTENSIONS

def validate_video_format(filename: str) -> bool:
    """Validate if the file has an allowed video extension."""
    ext = os.path.splitext(filename)[1].lower()
    return ext in ALLOWED_VIDEO_EXTENSIONS

def generate_analysis_id() -> str:
    """Generate a unique analysis ID."""
    return str(uuid.uuid4())

def get_timestamp() -> str:
    """Get a current ISO format timestamp."""
    return datetime.now(timezone.utc).isoformat()
