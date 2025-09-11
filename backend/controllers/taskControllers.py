
from fastapi import APIRouter, HTTPException
from schemas.taskSchemas import Task
from typing import List
from config import get_database
from bson import ObjectId

db = get_database()
task_collection = db["todos"]
# get all
async def get_all_tasks():
    try:
        print("Fetching all tasks")
        tasks = await task_collection.find().to_list(length=None)
        for task in tasks:
            task["_id"] = str(task["_id"])  # convert ObjectId -> string
        print({'message': 'get all task successfully'})
        return tasks
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
# create
async def create_task(task: Task):
    try:
        task_dict = task.dict(exclude_unset=True)
        result = await task_collection.insert_one(task_dict)
        task_dict["_id"] = str(result.inserted_id)
        print({'message': 'create a task successfully'})
        return task_dict
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
#update 
async def update_task(task_id: str, task: Task):
    try:
        updates = {k: v for k, v in task.dict().items() if v is not None}
        result = await task_collection.update_one(
            {"_id": ObjectId(task_id)},
            {"$set": updates}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Task not found")
        updated_task = await task_collection.find_one({"_id": ObjectId(task_id)})
        updated_task["_id"] = str(updated_task["_id"])
        print({'message': 'update task by id successfully'})
        return updated_task
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
#delete
async def delete_task(task_id: str):
    try:
        result = await task_collection.delete_one({"_id": ObjectId(task_id)})
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Task not found")
        return {"message": "Task deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

