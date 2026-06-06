"""Auth router — signup, login, me."""
from fastapi import APIRouter, Depends, Header, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.db import get_session
from app.auth import create_access_token, decode_token
from app.schemas.auth import LoginRequest, SignupRequest, TokenResponse, UserPublic
from app.services.auth_service import AuthError_, authenticate, create_user, get_user_by_email

router = APIRouter()


@router.post("/signup", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def signup(
    body: SignupRequest,
    session: AsyncSession = Depends(get_session),
) -> TokenResponse:
    """Create a new user account. Returns JWT access token."""
    try:
        user = await create_user(
            session=session, email=body.email, password=body.password, full_name=body.full_name
        )
    except AuthError_ as e:
        raise HTTPException(status_code=e.status, detail=e.detail)

    token = create_access_token(user.id, user.email)
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        expires_in=settings.jwt_expire_minutes * 60,
        user=UserPublic(**user.to_public()),
    )


@router.post("/login", response_model=TokenResponse)
async def login(
    body: LoginRequest,
    session: AsyncSession = Depends(get_session),
) -> TokenResponse:
    """Authenticate by email + password. Returns JWT access token."""
    user = await authenticate(session, body.email, body.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    token = create_access_token(user.id, user.email)
    return TokenResponse(
        access_token=token,
        token_type="bearer",
        expires_in=settings.jwt_expire_minutes * 60,
        user=UserPublic(**user.to_public()),
    )


@router.get("/me", response_model=UserPublic)
async def me(
    authorization: str | None = Header(default=None),
    session: AsyncSession = Depends(get_session),
) -> UserPublic:
    """Get current user from JWT token (Bearer auth)."""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid Authorization header")

    token = authorization.removeprefix("Bearer ").strip()
    payload = decode_token(token)
    if not payload or "sub" not in payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user = await get_user_by_email(session, payload["email"])
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return UserPublic(**user.to_public())
