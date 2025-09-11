from enum import Enum
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field

class Priority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"

class Repeat(str, Enum):
    none = "none"
    hourly = "hourly"
    daily = "daily"
    weekly = "weekly"
    monthly = "monthly"
    yearly = "yearly"

class Task(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    user_id: str   # tham chiếu đến User
    title: str
    description: Optional[str] = None
    completed: bool = False
    priority: Priority = Priority.medium
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    deadline: Optional[datetime] = None
    reminder: Optional[datetime] = None
    repeat: Repeat = Repeat.none
    reminder_before: Optional[int] = None  # phút trước deadline




