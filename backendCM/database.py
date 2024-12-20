from pymongo import MongoClient

# MongoDB connection string (update this with your Atlas or local MongoDB URI)
MONGO_URI = "mongodb+srv://furkan:Mutlufurkan.123@unimoti.dldo0.mongodb.net/"  # Replace with your MongoDB Atlas URI if using cloud

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
