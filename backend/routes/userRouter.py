from fastapi import APIRouter , Depends
from schemas.userSchemas import LoginRequest, TokenResponse, SignupRequest, SignupResponse
from controllers import userControllers
from config import get_database
from utils import get_refresh_token
from schemas.userSchemas import RefreshTokenRequest

router = APIRouter(
    prefix="/user",
    tags=["user"]
)

# SignUp
@router.post('/signup', response_model=SignupResponse)
async def signup(user_data: SignupRequest , db = Depends(get_database)):
    return await userControllers.Signup(user_data , db )

# Login
@router.post('/login', response_model=TokenResponse)
async def login(login_data: LoginRequest,  db = Depends(get_database)):
    return await userControllers.Login(login_data , db)


@router.post("/login/refresh")
async def refresh_token(user_id: str = Depends(get_refresh_token)):
    new_access_token = create_access_token({"sub": user_id})
    return {"access_token": new_access_token, "token_type": "bearer"}