from flask import Blueprint, request, jsonify
from app.extensions import db
from datetime import datetime

inquiry_bp = Blueprint("inquiries", __name__)

@inquiry_bp.route("/", methods=["POST"])
def create_inquiry():
    print("🔥 Inquiry API hit")

    data = request.json
    print("📦 Data received:", data)

    db.inquiries.insert_one({
        "school_slug": data.get("school_slug"),
        "parent_name": data.get("parent_name"),
        "phone": data.get("phone"),
        "email": data.get("email"),
        "message": data.get("message"),
        "created_at": datetime.utcnow()
    })

    return jsonify({"message": "Inquiry submitted"}), 201


@inquiry_bp.route("/", methods=["GET"])
def list_inquiries():
    school_slug = request.args.get("school_slug")

    query = {}
    if school_slug:
        query["school_slug"] = school_slug

    inquiries = list(db.inquiries.find(query).sort("created_at", -1))

    for i in inquiries:
        i["_id"] = str(i["_id"])

    return jsonify(inquiries)
