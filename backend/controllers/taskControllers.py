
from fastapi import APIRouter, HTTPException , Depends
from schemas.taskSchemas import Task
from typing import List
from config import get_database
from bson import ObjectId

# get all
async def get_all_tasks(user_id: str , db):
    tasks = await db['tasks'].find({"user_id": user_id}).to_list(length=None)
    for task in tasks:
        task["_id"] = str(task["_id"])
    return tasks
        
# create
async def create_task(task: Task , user_id: str , db):
    try:
        task_dict = task.dict(exclude_unset=True)
        task_dict['user_id'] = user_id
        result = await db['tasks'].insert_one(task_dict)
        task_dict["_id"] = str(result.inserted_id)
        print({'message': 'create a task successfully'})
        return task_dict
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
#update 
async def update_task(task_id: str, task: Task, user_id: str, db):
    try:
        updates = {k: v for k, v in task.dict().items() if v is not None}
        result = await db['tasks'].update_one(
            {"_id": ObjectId(task_id), "user_id": user_id},
            {"$set": updates}
        )
        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Task not found")
        updated_task = await db['tasks'].find_one({"_id": ObjectId(task_id)})
        updated_task["_id"] = str(updated_task["_id"])
        return updated_task
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
#delete
async def delete_task(task_id: str, user_id: str , db):
    try:
        result = await db['tasks'].delete_one(
            {"_id": ObjectId(task_id), "user_id": user_id}
        )
        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Task not found")
        return {"message": "Task deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

