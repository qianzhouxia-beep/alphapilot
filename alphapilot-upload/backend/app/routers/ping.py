"""Ping endpoint — health/liveness for demo verification (M2 2026-06-05)."""
from fastapi import APIRouter

router = APIRouter()


@router.get("/ping")
async def ping() -> dict:
    """Liveness probe. Returns 200 OK. Used by boss demo / curl smoke."""
    return {"status": "ok", "service": "alphapilot-backend", "version": "0.1.0"}
