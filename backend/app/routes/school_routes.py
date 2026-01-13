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
    city = request.args.get("city")
    query = {}
    if city:
        query["address.city"] = city

    schools = list(db.schools.find(query))
    for s in schools:
        s["_id"] = str(s["_id"])
    return jsonify(schools)


@school_bp.route("/<slug>", methods=["GET"])
def get_school(slug):
    school = db.schools.find_one({"slug": slug})
    if not school:
        return {"error": "Not found"}, 404
    school["_id"] = str(school["_id"])
    return school
