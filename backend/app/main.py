"""Main FastAPI application."""

import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import settings
from .routers import health, deepfake, text_analysis, account_verification, trust_score

logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan events for FastAPI."""
    logger.info("Starting up VeriFace application")
    yield
    logger.info("Shutting down VeriFace application")

app = FastAPI(
    title=settings.APP_NAME,
    version="0.1.0",
    lifespan=lifespan,
    debug=settings.DEBUG,
)

# Configure CORS
origins = [origin.strip() for origin in settings.BACKEND_CORS_ORIGINS.split(",")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
api_prefix = "/api/v1"
app.include_router(health.router, prefix=f"{api_prefix}/health", tags=["health"])
app.include_router(deepfake.router, prefix=f"{api_prefix}/deepfake", tags=["deepfake"])
app.include_router(text_analysis.router, prefix=f"{api_prefix}/text", tags=["text"])
app.include_router(account_verification.router, prefix=f"{api_prefix}/account", tags=["account"])
app.include_router(trust_score.router, prefix=f"{api_prefix}/trust-score", tags=["trust-score"])

@app.get("/")
async def root():
    """Root endpoint."""
    return {"app": settings.APP_NAME, "status": "running"}
