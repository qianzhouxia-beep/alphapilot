"""User ORM model + auth service (M2 2026-06-05)."""
from datetime import datetime, timezone
from typing import Optional

from sqlalchemy import String, Integer, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.db import Base
from app.auth import hash_password, verify_password


class User(Base):
    """User account (M2 stub; W3 add subscription/billing)."""

    __tablename__ = "users"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    password_hash: Mapped[str] = mapped_column(String(255), nullable=False)
    full_name: Mapped[str] = mapped_column(String(100), nullable=False)
    plan: Mapped[str] = mapped_column(String(20), default="free", nullable=False)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), nullable=False
    )

    def to_public(self) -> dict:
        return {
            "id": self.id,
            "email": self.email,
            "full_name": self.full_name,
            "plan": self.plan,
            "created_at": self.created_at.isoformat(),
        }


class AuthError_(Exception):
    """Auth service error with HTTP-friendly detail."""

    def __init__(self, detail: str, status: int = 400):
        self.detail = detail
        self.status = status


async def get_user_by_email(session: AsyncSession, email: str) -> Optional[User]:
    result = await session.execute(select(User).where(User.email == email.lower()))
    return result.scalar_one_or_none()


async def create_user(session: AsyncSession, email: str, password: str, full_name: str) -> User:
    """Create new user. Raises AuthError_ if email taken."""
    email_lower = email.lower()
    existing = await get_user_by_email(session, email_lower)
    if existing:
        raise AuthError_("Email already registered", status=409)

    user = User(
        email=email_lower,
        password_hash=hash_password(password),
        full_name=full_name,
    )
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user


async def authenticate(session: AsyncSession, email: str, password: str) -> Optional[User]:
    """Verify credentials. Returns User on success, None on failure."""
    user = await get_user_by_email(session, email.lower())
    if not user:
        return None
    if not verify_password(password, user.password_hash):
        return None
    return user
