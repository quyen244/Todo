from fastapi import APIRouter, HTTPException
from schemas.taskSchemas import Task
from typing import List
from config import get_database
# Initialize database connection
db, todo_collection = get_database()

router = APIRouter()


@router.get("/", response_model=List[Task])
async def get_all_tasks():
    try:
        print("Fetching all tasks")
        tasks = await task_collection.find().to_list(length=None)
        return tasks
    except Exception as e:
        print(f"Error fetching tasks: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.post("/", response_model=Task)
def create_task(task: Task):
    try:
        print(f"Creating task: {task}")
        result = todo_collection.insert_one(task.dict())
        task.id = result.inserted_id
        return task
    except Exception as e:
        print(f"Error creating task: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.put("/{task_id}", response_model=Task)
def update_task(task_id: int, task: Task):
    try:
        print(f"Updating task {task_id} with data: {task}")
        result = todo_collection.update_one({"_id": task_id}, {"$set": task.dict()})
        if result.modified_count == 0:
            raise HTTPException(status_code=404, detail="Task not found")
        return task
    except Exception as e:
        print(f"Error updating task: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

@router.delete("/{task_id}", response_model=Task)
def delete_task(task_id: int):
    try:
        print(f"Deleting task with ID: {task_id}")
        result = todo_collection.delete_one({"_id": task_id})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Task not found")
        return {"message": "Task deleted successfully"}
    except Exception as e:
        print(f"Error deleting task: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")