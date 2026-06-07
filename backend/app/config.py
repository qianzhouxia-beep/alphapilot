"""Settings loaded from .env via pydantic-settings."""
from functools import lru_cache
from typing import List

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # App
    app_name: str = "AlphaPilot"
    app_env: str = Field(default="development", description="development | staging | production")
    log_level: str = "INFO"

    # CORS — comma-separated string parsed to list
    cors_origins_raw: str = "http://localhost:3000,http://localhost:3727"

    # Database
    database_url: str = "postgresql+asyncpg://alphapilot:alphapilot@localhost:5432/alphapilot"

    @field_validator("database_url", mode="after")
    @classmethod
    def _normalize_async_pg_url(cls, v: str) -> str:
        """Force asyncpg driver — code uses create_async_engine, so a sync driver (psycopg2/psycopg) will fail at runtime with 'asyncio extension requires an async driver'. Auto-rewrite the scheme so the env var can stay postgresql:// or postgresql+psycopg2:// without breaking the async engine."""
        if not v:
            return v
        # Schemes that are sync and need rewriting
        for sync_scheme in ("postgresql+psycopg2", "postgresql+psycopg", "postgresql+psycopg2cffi"):
            if v.startswith(sync_scheme + "://"):
                return "postgresql+asyncpg://" + v[len(sync_scheme) + 3:]
        # Bare postgresql:// — let SQLAlchemy pick default; force asyncpg
        if v.startswith("postgresql://"):
            return "postgresql+asyncpg://" + v[len("postgresql://"):]
        return v

    # Redis
    redis_url: str = "redis://localhost:6379/0"

    # Polygon.io
    polygon_api_key: str = "REPLACE_ME"
    polygon_rest_url: str = "https://api.polygon.io"
    polygon_ws_url: str = "wss://socket.polygon.io/stocks"

    # Stripe (W2)
    stripe_secret_key: str = "REPLACE_ME"
    stripe_publishable_key: str = "REPLACE_ME"
    stripe_webhook_secret: str = "REPLACE_ME"

    # PayPal sandbox (W2 老板 L1 09:23 拍板, 11:29 截图给 key)
    paypal_client_id: str = "REPLACE_ME"
    paypal_client_secret: str = "REPLACE_ME"
    paypal_mode: str = "sandbox"  # sandbox | live
    paypal_webhook_id: str = "REPLACE_ME"

    # Auth (W2)
    jwt_secret: str = "REPLACE_ME_GENERATE_WITH_openssl_rand_hex_32"
    jwt_algorithm: str = "HS256"
    jwt_expire_minutes: int = 60 * 24  # 24h

    @field_validator("cors_origins_raw")
    @classmethod
    def _strip_origins(cls, v: str) -> str:
        return v.strip()

    @property
    def cors_origins(self) -> List[str]:
        return [o.strip() for o in self.cors_origins_raw.split(",") if o.strip()]

    @property
    def is_production(self) -> bool:
        return self.app_env == "production"


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
