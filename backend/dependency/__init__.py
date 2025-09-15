
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()  # Loads variables from a .env file into environment

MONGO_URI = os.getenv("MONGO_URI")

def get_database():
    try:
        client = AsyncIOMotorClient(MONGO_URI)
        db = client['todo_db']
        print("Connected to MongoDB")
        return db
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")