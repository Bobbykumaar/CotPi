from flask import Blueprint, request, jsonify
from app.extensions import db
from datetime import datetime

review_bp = Blueprint("reviews", __name__)

# Add review
@review_bp.route("/", methods=["POST"])
def add_review():
    data = request.json

    review = {
        "school_slug": data.get("school_slug"),
        "parent_name": data.get("parent_name"),
        "rating": int(data.get("rating")),
        "comment": data.get("comment"),
        "created_at": datetime.utcnow()
    }

    db.reviews.insert_one(review)

    # 🔥 Recalculate rating
    reviews = list(db.reviews.find(
        {"school_slug": review["school_slug"]},
        {"rating": 1}
    ))

    avg_rating = round(
        sum(r["rating"] for r in reviews) / len(reviews), 1
    )

    db.schools.update_one(
        {"slug": review["school_slug"]},
        {"$set": {
            "rating": avg_rating,
            "review_count": len(reviews)
        }}
    )

    return jsonify({"message": "Review added"}), 201


# Get reviews for a school
@review_bp.route("/<slug>", methods=["GET"])
def get_reviews(slug):
    reviews = list(
        db.reviews.find(
            {"school_slug": slug},
            {"school_slug": 0}
        ).sort("created_at", -1)
    )

    for r in reviews:
        r["_id"] = str(r["_id"])

    return jsonify(reviews)
