from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime, timedelta
from passlib.context import CryptContext
class User(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")  # MongoDB _id
    username: str
    email: EmailStr
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    refresh_token :str
    token_type: str = "bearer" 

class SignupRequest(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")  # MongoDB _id
    username: str
    email: EmailStr
    password: str

class SignupResponse(BaseModel):
    id: str = Field(..., alias="_id")
    username: str
    email: EmailStr
    created_at: datetime

class Request(BaseModel):
    refresh_token : str


class RefreshTokenRequest(BaseModel):
    refresh_token: str
