"""Configuration for VeriFace Backend."""

from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    """Application settings."""
    APP_NAME: str = "VeriFace"
    APP_ENV: str = "development"
    DEBUG: bool = True
    SECRET_KEY: str = "your-super-secret-key-change-in-production"
    
    BACKEND_HOST: str = "127.0.0.1"
    BACKEND_PORT: int = 8000
    BACKEND_CORS_ORIGINS: str = "http://localhost,http://localhost:8080,http://localhost:3000"
    
    DATABASE_URL: str = "sqlite:///./veriface.db"
    MODEL_CACHE_DIR: str = "./model_cache"
    DEVICE: str = "cpu"
    
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")
    
settings = Settings()
