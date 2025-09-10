from fastapi import APIRouter
from controllers import taskControllers  # Importing taskControllers

router = APIRouter(
    prefix="/tasks",
    tags=["tasks"]
)

# Registering the taskControllers with the router
@router.get("/")
def get_tasks():
    return taskControllers.get_all_tasks()
@router.post("/")
def create_task(task: dict):
    return taskControllers.create_task(task)
@router.put("/{task_id}")
def update_task(task_id: int, task: dict):
    return taskControllers.update_task(task_id, task)
@router.delete("/{task_id}")
def delete_task(task_id: int):
    return taskControllers.delete_task(task_id)