def school_serializer(school):
    return {
        "id": str(school["_id"]),
        "name": school.get("name", "Unnamed School"),
        "slug": school.get("slug", ""),
        "address": school.get("address", {}),  # default empty dict
        "board": school.get("board", []),      # default empty list
        "fees": school.get("fees", {}),
        "rating": school.get("rating", 0),
        "verified": school.get("verified", False),
    }
