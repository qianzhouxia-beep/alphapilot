"""Smoke test for /health endpoint."""
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_ok() -> None:
    """Health endpoint returns 200 + status ok."""
    resp = client.get("/health")
    assert resp.status_code == 200
    body = resp.json()
    assert body["status"] == "ok"
    assert "version" in body


def test_screener_top_mock() -> None:
    """Screener top endpoint returns mock data."""
    resp = client.get("/v1/screener/top?n=5")
    assert resp.status_code == 200
    body = resp.json()
    assert body["count"] == 5
    assert body["source"] == "mock"
    assert len(body["items"]) == 5
    assert body["items"][0]["symbol"] == "AAPL"


def test_cors_allows_localhost() -> None:
    """CORS allows localhost dev origin."""
    resp = client.get("/health", headers={"Origin": "http://localhost:3000"})
    assert resp.status_code == 200
    assert "access-control-allow-origin" in {k.lower() for k in resp.headers.keys()}
