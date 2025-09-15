from fastapi import APIRouter , Depends
from typing import List
from schemas.taskSchemas import Task
from controllers import taskControllers
from config import get_database
from utils import get_current_user

router = APIRouter(
    prefix="/tasks",
    tags=["tasks"]
)

@router.post("/", response_model=Task)
async def create_task(task: Task, user_id: str = Depends(get_current_user) , db = Depends(get_database)):
    return await taskControllers.create_task(task , user_id , db)

@router.get("/", response_model=List[Task])
async def get_tasks(user_id: str = Depends(get_current_user) , db = Depends(get_database)):
    return await taskControllers.get_all_tasks(user_id , db)

@router.get("/{task_id}", response_model=Task)
async def get_task(task_id: str, user_id: str = Depends(get_current_user) , db = Depends(get_database)):
    return await taskControllers.get_task(task_id , user_id ,  db)

@router.put("/{task_id}", response_model=Task)
async def update_task(task_id: str, task: Task , user_id: str = Depends(get_current_user) , db = Depends(get_database)):
    return await taskControllers.update_task(task_id, task , user_id , db)

@router.delete("/{task_id}")
async def delete_task(task_id: str , user_id: str = Depends(get_current_user) , db = Depends(get_database)):
    return await taskControllers.delete_task(task_id ,user_id ,  db )
