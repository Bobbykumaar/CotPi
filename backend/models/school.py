def school_serializer(school):
    return {
        "id": str(school["_id"]),
        "name": school["name"],
        "slug": school["slug"],
        "address": school["address"],
        "board": school["board"],
        "fees": school["fees"],
        "rating": school.get("rating", 0),
        "verified": school.get("verified", False)
    }
