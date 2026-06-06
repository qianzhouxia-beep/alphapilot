"""Redis async client (lazy, failsafe — returns None if unavailable)."""
from typing import Optional

import structlog
import redis  # 同步 client (用于 get_redis 同步上下文)
from redis.asyncio import Redis as AsyncRedis

from app.config import settings

log = structlog.get_logger()

_redis: Optional[AsyncRedis] = None
_redis_sync: Optional[redis.Redis] = None


def get_redis() -> Optional[redis.Redis]:
    """Lazy init sync Redis client. Used in sync context (like FastAPI sync deps).

    Returns None if connection fails (dev-only). Sync get/set OK.
    """
    global _redis_sync
    if _redis_sync is None:
        try:
            _redis_sync = redis.Redis.from_url(
                settings.redis_url,
                encoding="utf-8",
                decode_responses=True,
                socket_connect_timeout=2,
            )
        except Exception as e:
            log.warning("redis_init_failed", error=str(e))
            _redis_sync = None
    return _redis_sync


async def close_redis() -> None:
    global _redis, _redis_sync
    if _redis is not None:
        try:
            await _redis.aclose()
        except Exception:
            pass
        _redis = None
    _redis_sync = None
