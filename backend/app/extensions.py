from pymongo import MongoClient
import os

client = None
db = None

def init_db():
    global client, db
    client = MongoClient(os.getenv("MONGO_URI"))
    db = client.cotpi
