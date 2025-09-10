# main.py

from fastapi import FastAPI
from routes import taskRouter  # Importing taskRouter

# Create FastAPI instance
app = FastAPI()

# Đăng ký router
app.include_router(taskRouter.router)