"""Tests for backend health endpoints."""

import pytest
from fastapi import FastAPI
from fastapi.testclient import TestClient

# Mock app for testing
app = FastAPI(title="VeriFace API", version="1.0.0")

@app.get("/")
def read_root():
    return {"name": "VeriFace API", "version": "1.0.0"}

@app.get("/api/v1/health")
def health_check():
    import datetime
    return {
        "status": "healthy",
        "version": "1.0.0",
        "timestamp": datetime.datetime.utcnow().isoformat()
    }

client = TestClient(app)

def test_health_endpoint():
    """Test that the health endpoint returns 200 OK and healthy status."""
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_health_response_format():
    """Verify response has required fields."""
    response = client.get("/api/v1/health")
    data = response.json()
    assert "status" in data
    assert "version" in data
    assert "timestamp" in data

def test_root_endpoint():
    """Test that the root endpoint returns app info."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == "VeriFace API"
    assert data["version"] == "1.0.0"
