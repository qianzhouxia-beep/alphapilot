"""FastAPI app entry — registers routers + middleware + lifespan."""
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app import __version__
from app.config import settings
from app.routers import health, screener, auth, ping, paypal, cn
from app.cache import close_redis
from app.db import dispose_engine, get_engine
from app.db import Base
import app.services.auth_service  # ensure User model registers


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Start/stop shared resources."""
    # Startup: create all ORM tables (M2 stub, W3 switch to Alembic)
    engine = get_engine()
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    # Shutdown
    await close_redis()
    await dispose_engine()


app = FastAPI(
    title="AlphaPilot API",
    version=__version__,
    description="AI-Powered Stock Intelligence & Trading Decision Platform",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS — open in dev, restrict in prod via env
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(health.router, tags=["health"])
app.include_router(ping.router, prefix="/api/v1", tags=["ping"])
app.include_router(screener.router, prefix="/v1/screener", tags=["screener"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(paypal.router, prefix="/api/paypal", tags=["paypal"])
app.include_router(cn.router, prefix="/v1/cn", tags=["cn"])
