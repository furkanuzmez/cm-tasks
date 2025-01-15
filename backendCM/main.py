from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import HTMLResponse
from api import router
import pandas as pd
from database import insert_excel_data, collection
import os
import logging

logging.basicConfig(level=logging.DEBUG)


logger = logging.getLogger("pymongo.topology")
logger.disabled = True

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for dev only)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods: GET, POST, PUT, DELETE, etc.
    allow_headers=["*"],  # Allow all headers
)

FILE_PATH = os.path.abspath("TestData.xlsx")

async def load_excel_to_mongo():
    """
    Load data from the Excel file into MongoDB on startup.
    """
    logging.debug(f"Loading data from {FILE_PATH}")
    try:
        df = pd.read_excel(FILE_PATH, engine="openpyxl")
        data = df.to_dict(orient="records")
        insert_excel_data(data)  # Call without 'await' since it's a synchronous function
        logging.debug("Data successfully loaded into MongoDB")
    except Exception as e:
        logging.error(f"Error loading data: {e}")

# Add startup event handler
app.add_event_handler("startup", load_excel_to_mongo)

# Include the router
app.include_router(router)

# Serve React static assets from dist/assets
app.mount("/assets", StaticFiles(directory="dist/assets"), name="assets")

# Serve React index.html for the root route and other non-API routes
@app.get("/{full_path:path}", include_in_schema=False)
async def serve_react_app(full_path: str):
    """
    Serve the React app's index.html for all non-API routes.
    """
    try:
        file_path = os.path.join("dist", "index.html")
        with open(file_path, "r") as f:
            return HTMLResponse(f.read())
    except FileNotFoundError:
        return HTMLResponse(
            "<h1>React build not found. Make sure to build your app!</h1>",
            status_code=404,
        )

@app.get("/api", tags=["Root"])
async def api_root():
    """
    Root endpoint of the API.
    """
    return {"message": "Welcome to the MongoDB Excel REST API!"}
