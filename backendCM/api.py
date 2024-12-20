from fastapi import APIRouter, HTTPException, Query
from typing import Optional, Dict, List, Union
from bson.objectid import ObjectId  # Use this if your MongoDB uses ObjectId
from database import collection

router = APIRouter()

# Utility to validate column names
def validate_column(column: str):
    sample_doc = collection.find_one()
    if column not in sample_doc:
        raise HTTPException(status_code=400, detail=f"Invalid column name: {column}")

# Utility to build pagination response
# Utility to build pagination response
def paginate_results(cursor, query, page: int, page_size: int):
    total_count = collection.count_documents(query)  # Use count_documents
    skip = max(0, (page - 1) * page_size)
    results = list(cursor.skip(skip).limit(page_size))
    return {
        "page": page,
        "page_size": page_size,
        "total_records": total_count,
        "total_pages": (total_count + page_size - 1) // page_size,
        "data": results,
    }


# Endpoint to get all data
@router.get("/data/", summary="Get All Data", tags=["Data"])
def get_all_data(
    page: int = Query(1, description="Page number (starting from 1)"),
    page_size: int = Query(10, description="Number of records per page"),
):
    if page < 1 or page_size < 1:
        raise HTTPException(status_code=400, detail="Page and page_size must be greater than 0.")

    try:
        query = {}
        cursor = collection.find(query, {"_id": 0})
        return paginate_results(cursor, query, page, page_size)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving data: {str(e)}")

# Endpoint to filter, sort, and paginate data
@router.get("/data/filter/", summary="Filter, Sort, and Paginate Data", tags=["Data"])
def filter_data(
    column: Optional[str] = Query(None, description="Column to filter on"),
    value: Optional[str] = Query(None, description="Exact value to match"),
    min_value: Optional[float] = Query(None, description="Minimum value for range queries"),
    max_value: Optional[float] = Query(None, description="Maximum value for range queries"),
    contains: Optional[str] = Query(None, description="Text that the column value should contain"),
    sort_by: Optional[str] = Query(None, description="Column to sort by"),
    sort_order: Optional[str] = Query("asc", description="Sort order: 'asc' or 'desc'"),
    page: int = Query(1, description="Page number (starting from 1)"),
    page_size: int = Query(10, description="Number of records per page"),
):
    query = {}

    # Validate sort column
    if sort_by:
        validate_column(sort_by)

    # Build the query
    if contains:
        query = {"$or": [{field: {"$regex": contains, "$options": "i"}} for field in collection.find_one().keys() if field != "_id"]}
    elif column:
        validate_column(column)
        if value:
            query[column] = value
        elif min_value is not None or max_value is not None:
            range_query = {}
            if min_value is not None:
                range_query["$gte"] = min_value
            if max_value is not None:
                range_query["$lte"] = max_value
            query[column] = range_query

    # Pagination safety
    if page < 1 or page_size < 1:
        raise HTTPException(status_code=400, detail="Page and page_size must be greater than 0.")

    # Sorting
    sort_options = [(sort_by, -1 if sort_order.lower() == "desc" else 1)] if sort_by else None

    try:
        cursor = collection.find(query, {"_id": 0})
        if sort_options:
            cursor = cursor.sort(sort_options)

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
    validate_column(column)

    try:
        result = collection.update_one(
            {"_id": ObjectId(id)},  # Match the record by ID
            {"$set": {column: new_value}},  # Set the new value for the specified column
        )

        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Record not found.")

        return {"message": "Record updated successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating record: {str(e)}")

# Endpoint to add a new row (insert a new document)
@router.post("/data/add/", summary="Add a New Row", tags=["Data"])
def add_row(new_row: Dict[str, Union[str, int, float]]):
    try:
        collection.insert_one(new_row)
        return {"message": "New row added successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error adding new row: {str(e)}")
