# main.py

from fastapi import FastAPI
from routes import taskRouter , userRouter # Importing taskRouter
from fastapi.middleware.cors import CORSMiddleware
from config import init_db_client, close_db_client

app = FastAPI()

# Khởi tạo MongoDB khi app start
@app.on_event("startup")
async def startup_event():
    init_db_client()

# Đóng connection khi app shutdown
@app.on_event("shutdown")
async def shutdown_event():
    close_db_client()

# Include router

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Đây là frontend React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Đăng ký router
app.include_router(taskRouter.router)
app.include_router(userRouter.router)
