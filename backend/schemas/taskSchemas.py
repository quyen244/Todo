from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime , time

class Task(BaseModel):
    title: str
    description: Optional[str] = None
    completed: bool = False
    degree: List[str] = Field(default_factory=lambda: ["low", "medium", "high"])
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    deadline: Optional[datetime] = None
    reminder: Optional[datetime] = None
    repeat: List[str] = Field(default_factory=lambda: ["hang gio", "hang ngay", "hang tuan", "hang thang" , "hang nam"])
    time : Optional[time] = None
