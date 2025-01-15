from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Retrieve the MongoDB URI from environment variables
MONGO_URI = os.getenv("MONGO_URI")

# Initialize MongoDB client
client = MongoClient(MONGO_URI)
db = client["excel_database"]  # Database name
collection = db["excel_data"]  # Collection name

def insert_excel_data(data):
    """
    Inserts data into the MongoDB collection.
    """
    if collection.count_documents({}) == 0:  # Avoid duplicate inserts
        collection.insert_many(data)
        print("Data inserted successfully!")
    else:
        print("Data already exists in the database.")
