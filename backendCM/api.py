from fastapi import APIRouter, HTTPException, Query
from typing import Optional, Dict, List, Union
from bson.objectid import ObjectId  # Use this if your MongoDB uses ObjectId
from database import collection  # Import your MongoDB collection
from fastapi import Request

# Create a FastAPI router for handling data-related endpoints
router = APIRouter()

# Utility to validate column names
def validate_column(column: str):
    # Fetch a sample document to verify if the column exists in the collection
    sample_doc = collection.find_one()
    if column not in sample_doc:
        raise HTTPException(status_code=400, detail=f"Invalid column name: {column}")

# Utility to build pagination response
def paginate_results(cursor, query, page: int, page_size: int):
    total_count = collection.count_documents(query)  # Count the total matching documents
    skip = max(0, (page - 1) * page_size)  # Calculate the number of documents to skip
    results = list(cursor.skip(skip).limit(page_size))  # Fetch the required page of results
    return {
        "page": page,
        "page_size": page_size,
        "total_records": total_count,
        "total_pages": (total_count + page_size - 1) // page_size,  # Calculate total pages with // floor division
        "data": results,
    }

# Endpoint to get all data
@router.get("/data/", summary="Get All Data", tags=["Data"])
def get_all_data(
    page: int = Query(1, description="Page number (starting from 1)"),
    page_size: int = Query(10, description="Number of records per page"),
):
    # Validate that page and page_size are greater than 0
    if page < 1 or page_size < 1:
        raise HTTPException(status_code=400, detail="Page and page_size must be greater than 0.")

    try:
        query = {}  # No filters, fetch all documents
        cursor = collection.find(query, {"_id": 0})  # Exclude `_id` from results
        return paginate_results(cursor, query, page, page_size)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving data: {str(e)}")

# Endpoint to get unique values for specific columns
@router.get("/data/unique-values/", summary="Get Unique Values for Specified Columns", tags=["Data"])
def get_unique_values():
    try:
        # Specify the columns for which to fetch unique values
        columns = ["flowName", "processName", "country", "CAS"]

        # MongoDB aggregation pipeline to extract unique values for each column
        pipeline = [
            {"$project": {column: 1 for column in columns}},  # Include only specified columns
            {"$group": {
                "_id": None,  # Group all documents together
                **{column: {"$addToSet": f"${column}"} for column in columns},  # Extract unique values
            }},
            {"$project": {  # Restructure response to exclude `_id`
                "_id": 0,
                **{column: 1 for column in columns},
            }},
        ]

        result = list(collection.aggregate(pipeline))  # Execute the aggregation pipeline
        if not result:
            return {column: [] for column in columns}  # Return empty lists if no data exists
        return result[0]  # Return the first document with unique values
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving unique values: {str(e)}")

# Endpoint to filter, sort, and paginate data
@router.get("/data/filter/", summary="Filter, Sort, and Paginate Data", tags=["Data"])
def filter_data(
    contains: Optional[str] = Query(None, description="Text to search across all columns"),
    sort_by: Optional[str] = Query(None, description="Column to sort by"),
    sort_order: Optional[str] = Query("asc", description="Sort order: 'asc' or 'desc'"),
    page: int = Query(1, description="Page number (starting from 1)"),
    page_size: int = Query(10, description="Number of records per page"),
    request: Request = None,  # Capture the entire request for dynamic query handling
):
    """
    Filters: Passed as query parameters, e.g., /data/filter/?flowName=carbonone&country=Argentina
    Contains: A string to search across all columns.
    """
    query = {}

    # Handle `contains` functionality
    if contains:
        # Create regex-based search across all valid columns
        
        # valid_columns = ["flowName", "processName", "country", "CAS"] 
        # query["$or"] = [{col: {"$regex": contains, "$options": "i"}} for col in valid_columns]


        # All Columns
        sample_doc = collection.find_one()
        if sample_doc is None:
          print("Sample document is None. The collection might be empty.")
          all_columns = []  # No columns available
        else:
          all_columns = list(sample_doc.keys())  # Extract keys from the sample document
          print("Available Columns:", all_columns)  # Print the columns to the console

    # Check if `all_columns` is empty and handle it
        if not all_columns:
          print("No columns available for searching. The collection might be empty or misconfigured.")
          raise HTTPException(status_code=400, detail="No columns available for searching.")

    # Create regex-based search across all available columns
        query["$or"] = [{col: {"$regex": contains, "$options": "i"}} for col in all_columns]

    # Extract additional filters dynamically from query parameters
    for key, value in request.query_params.items():
        if key in ["contains", "sort_by", "sort_order", "page", "page_size"]:
            continue  # Skip special parameters
        validate_column(key)  # Ensure the column exists
        query[key] = value

    # Validate pagination parameters
    if page < 1 or page_size < 1:
        raise HTTPException(status_code=400, detail="Page and page_size must be greater than 0.")

    # Sorting options
    sort_options = [(sort_by, -1 if sort_order.lower() == "desc" else 1)] if sort_by else None

    try:
        cursor = collection.find(query, {"_id": 0})  # Query without `_id`
        if sort_options:
            cursor = cursor.sort(sort_options)  # Apply sorting if specified

        return paginate_results(cursor, query, page, page_size)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error filtering data: {str(e)}")

# Endpoint to update a specific column in a document
@router.put("/data/update/", summary="Update a Specific Column", tags=["Data"])
def update_column(
    id: str = Query(..., description="ID of the record to update"),
    column: str = Query(..., description="Column to update"),
    new_value: Union[str, int, float] = Query(..., description="New value for the column"),
):
    validate_column(column)  # Validate the column exists

    try:
        result = collection.update_one(
            {"_id": ObjectId(id)},  # Match the record by its ID
            {"$set": {column: new_value}},  # Update the specified column
        )

        if result.matched_count == 0:  # If no record is matched
            raise HTTPException(status_code=404, detail="Record not found.")

        return {"message": "Record updated successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating record: {str(e)}")

# Endpoint to add a new row (insert a new document)
# @router.post("/data/add/", summary="Add a New Row", tags=["Data"])
# def add_row(new_row: Dict[str, Union[str, int, float]]):
#     try:
#         # Insert the new document into the collection
#         result = collection.insert_one(new_row)
        
#         # Return a success message along with the inserted ID
#         return {"message": "Row added successfully.", "id": str(result.inserted_id)}
#     except Exception as e:
#         # Catch any exception that occurs and return an appropriate HTTP error
#         raise HTTPException(status_code=500, detail=f"Error adding row: {str(e)}")

