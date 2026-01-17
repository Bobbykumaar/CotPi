from flask import Blueprint, request, jsonify
from app.extensions import db
from datetime import datetime

pending_school_bp = Blueprint("pending_schools", __name__)

@pending_school_bp.route("/", methods=["POST"])
def add_pending_school():
    data = request.json

    data["status"] = "pending"
    data["created_at"] = datetime.utcnow()

    db.pending_schools.insert_one(data)

    return jsonify({"message": "School submitted for review"}), 201


from bson.objectid import ObjectId

@pending_school_bp.route("/<id>/approve", methods=["POST"])
def approve_school(id):
    school = db.pending_schools.find_one({"_id": ObjectId(id)})

    if not school:
        return {"error": "Not found"}, 404

    school.pop("_id")          # remove Mongo ID
    school["verified"] = True # mark verified

    db.schools.insert_one(school)
    db.pending_schools.delete_one({"_id": ObjectId(id)})

    return {"message": "School approved"}
