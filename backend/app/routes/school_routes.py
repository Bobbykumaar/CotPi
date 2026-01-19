from flask import Blueprint, request, jsonify
from app.extensions import db
from bson.objectid import ObjectId
from datetime import datetime

school_bp = Blueprint("schools", __name__)


@school_bp.route("/", methods=["POST"])
def add_school():
    data = request.json
    data["created_at"] = datetime.utcnow()
    data["updated_at"] = datetime.utcnow()

    db.schools.insert_one(data)

    return {"message": "School added"}, 201


@school_bp.route("/", methods=["GET"])
def get_schools():
    page = int(request.args.get("page", 1))
    limit = int(request.args.get("limit", 10))
    skip = (page - 1) * limit

    city = request.args.get("city")
    board = request.args.get("board")
    search = request.args.get("search")

    query = {}

    if city:
        query["address.city"] = {"$regex": city, "$options": "i"}

    if board:
        query["board"] = board

    if search:
        query["name"] = {"$regex": search, "$options": "i"}

    total = db.schools.count_documents(query)

    schools = (
        db.schools
        .find(query)
        .skip(skip)
        .limit(limit)
    )

    data = []
    for school in schools:
        school["_id"] = str(school["_id"])
        data.append(school)

    return jsonify({
        "data": data,
        "total": total,
        "page": page,
        "totalPages": (total + limit - 1) // limit
    })


@school_bp.route("/<slug>", methods=["GET"])
def get_school(slug):
    school = db.schools.find_one({"slug": slug})

    if not school:
        return {"error": "Not found"}, 404

    school["_id"] = str(school["_id"])
    return jsonify(school)
