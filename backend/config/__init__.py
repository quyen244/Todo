from motor.motor_asyncio import AsyncIOMotorClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")
mongo_client = None  

def init_db_client():
    global mongo_client
    mongo_client = AsyncIOMotorClient(MONGO_URI)
    if not mongo_client:
        print('can not connect to db')
    print("Connected to MongoDB")

def close_db_client():
    global mongo_client
    if mongo_client:
        mongo_client.close()
        print("MongoDB connection closed")

def get_database():
    return mongo_client['todo_db']
