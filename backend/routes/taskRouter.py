from fastapi import APIRouter
from typing import List
from schemas.taskSchemas import Task
from controllers import taskControllers

router = APIRouter(
    prefix="/tasks",
    tags=["tasks"]
)

@router.post("/", response_model=Task)
async def create_task(task: Task):
    return await taskControllers.create_task(task)

@router.get("/", response_model=List[Task])
async def get_tasks():
    return await taskControllers.get_all_tasks()

@router.get("/{task_id}", response_model=Task)
async def get_task(task_id: str):
    return await taskControllers.get_task(task_id)

@router.put("/{task_id}", response_model=Task)
async def update_task(task_id: str, task: Task):
    return await taskControllers.update_task(task_id, task)

@router.delete("/{task_id}")
async def delete_task(task_id: str):
    return await taskControllers.delete_task(task_id)

