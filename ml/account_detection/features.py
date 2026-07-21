"""Feature extraction for account detection."""

import numpy as np
import math
from typing import Dict, Any, List

def _calculate_entropy(text: str) -> float:
    """Calculate Shannon entropy of a string."""
    if not text:
        return 0.0
    prob = [float(text.count(c)) / len(text) for c in set(text)]
    entropy = -sum(p * math.log(p) / math.log(2.0) for p in prob)
    return entropy

def _digit_ratio(text: str) -> float:
    """Calculate ratio of digits in a string."""
    if not text:
        return 0.0
    digits = sum(c.isdigit() for c in text)
    return digits / len(text)

def get_feature_names() -> List[str]:
    """Get list of feature names in order."""
    return [
        "account_age_days",
        "follower_count",
        "following_count",
        "follower_following_ratio",
        "post_count",
        "posts_per_day",
        "has_profile_picture",
        "has_bio",
        "bio_length",
        "username_entropy",
        "username_digit_ratio",
        "average_engagement_rate"
    ]

def extract_features(profile_data: Dict[str, Any]) -> np.ndarray:
    """
    Extract numerical features from profile data.
    
    Args:
        profile_data: Dictionary containing profile information.
        
    Returns:
        Numpy array of extracted features.
    """
    features = []
    
    # 1. Account age (days)
    age = float(profile_data.get('account_age_days', 0))
    features.append(age)
    
    # 2. Follower count
    followers = float(profile_data.get('followers_count', 0))
    features.append(followers)
    
    # 3. Following count
    following = float(profile_data.get('following_count', 0))
    features.append(following)
    
    # 4. Follower/following ratio
    ratio = followers / following if following > 0 else followers
    features.append(ratio)
    
    # 5. Post count
    posts = float(profile_data.get('post_count', 0))
    features.append(posts)
    
    # 6. Posts per day
    ppd = posts / age if age > 0 else 0
    features.append(ppd)
    
    # 7. Has profile picture
    has_pic = 1.0 if profile_data.get('has_profile_picture', False) else 0.0
    features.append(has_pic)
    
    # 8. Has bio
    bio = str(profile_data.get('bio', ''))
    has_bio = 1.0 if len(bio) > 0 else 0.0
    features.append(has_bio)
    
    # 9. Bio length
    features.append(float(len(bio)))
    
    # 10. Username entropy
    username = str(profile_data.get('username', ''))
    features.append(_calculate_entropy(username))
    
    # 11. Digit ratio in username
    features.append(_digit_ratio(username))
    
    # 12. Average engagement rate
    engagement = float(profile_data.get('engagement_rate', 0.0))
    features.append(engagement)
    
    return np.array(features)

def normalize_features(features: np.ndarray, scaler=None) -> np.ndarray:
    """Normalize features. In a real system, use a fitted scaler."""
    # Dummy normalization for stub purposes
    if len(features.shape) == 1:
        features = features.reshape(1, -1)
    
    # In production, apply loaded StandardScaler here
    return features
