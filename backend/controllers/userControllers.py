from fastapi import HTTPException
from schemas.userSchemas import LoginRequest, SignupRequest, TokenResponse, SignupResponse
from utils import verify_password, create_access_token, create_refresh_token, pwd_context
from datetime import datetime

async def Signup(user_data: SignupRequest, db):
    existing_user = await db['users'].find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed_password = pwd_context.hash(user_data.password)
    user_doc = {
        "username": user_data.username,
        "email": user_data.email,
        "hashed_password": hashed_password,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
    result = await db['users'].insert_one(user_doc)
    user_doc["_id"] = str(result.inserted_id)
    return SignupResponse(**user_doc)


async def Login(login_data: LoginRequest, db):
    user = await db['users'].find_one({"email": login_data.email})
    if not user or not verify_password(login_data.password, user["hashed_password"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    user_id = str(user["_id"])
    access_token = create_access_token(data={"sub": user_id})
    refresh_token = create_refresh_token(data={"sub": user_id})
    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}
