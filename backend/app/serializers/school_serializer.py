def school_list_serializer(school):
    return {
        "id": str(school["_id"]),
        "name": school["name"],
        "slug": school["slug"],
        "address": school.get("address"),
        "board": school.get("board"),
        "rating": school.get("rating", 0),
        "verified": school.get("verified", False)
    }
