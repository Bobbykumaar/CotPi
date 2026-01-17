from flask import Blueprint, request, jsonify
from app.extensions import db
from app.serializers.school_serializer import school_list_serializer
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
    query = {}

    city = request.args.get("city")
    board = request.args.get("board")
    search = request.args.get("search")

    if city:
        query["address.city"] = city

    if board:
        query["board"] = board

    if search:
        query["name"] = {"$regex": search, "$options": "i"}

    schools = db.schools.find(query)
    return jsonify([school_list_serializer(s) for s in schools])


@school_bp.route("/<slug>", methods=["GET"])
def get_school(slug):
    school = db.schools.find_one({"slug": slug})
    if not school:
        return {"error": "Not found"}, 404
    school["_id"] = str(school["_id"])
    return school