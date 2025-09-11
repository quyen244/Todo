# main.py

from fastapi import FastAPI
from routes import taskRouter  # Importing taskRouter
from fastapi.middleware.cors import CORSMiddleware
# Create FastAPI instance
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Đây là frontend React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Đăng ký router
app.include_router(taskRouter.router)

