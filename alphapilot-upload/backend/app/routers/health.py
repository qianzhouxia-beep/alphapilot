"""Health check endpoints."""
from fastapi import APIRouter

from app import __version__

router = APIRouter()


@router.get("/health")
async def health() -> dict:
    """Liveness probe. Returns 200 if app is up."""
    return {"status": "ok", "version": __version__}


@router.get("/health/ready")
async def ready() -> dict:
    """Readiness probe. W2: check DB + Redis + Polygon connectivity."""
    return {"status": "ready", "version": __version__, "checks": {"db": "pending", "redis": "pending"}}
