from enum import Enum
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

class Priority(str, Enum):
    low = 1
    medium = 2
    high = 3

class Repeat(str, Enum):
    none = "none"
    hourly = "hourly"
    daily = "daily"
    weekly = "weekly"
    monthly = "monthly"
    yearly = "yearly"

class Task(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    title: str
    description: Optional[str] = None
    completed: bool = False
    priority: int 
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    deadline: Optional[datetime] = None
    reminder_before: Optional[int] = None  # phút trước deadline
