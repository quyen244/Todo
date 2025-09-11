from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
from bson import ObjectId  # nếu bạn dùng motor/mongodb

class User(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")  # MongoDB _id
    username: str
    email: EmailStr
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    # Danh sách id của task
    tasks: List[str] = Field(default_factory=list)
