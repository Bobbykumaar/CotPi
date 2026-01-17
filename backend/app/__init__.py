from flask import Flask
from flask_cors import CORS
from .extensions import init_db

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Initialize MongoDB
    init_db()

    # ---- REGISTER BLUEPRINTS HERE ----
    from .routes.school_routes import school_bp
    app.register_blueprint(school_bp, url_prefix="/api/schools")
    # ---------------------------------
    from app.routes.inquiry_routes import inquiry_bp
    app.register_blueprint(inquiry_bp, url_prefix="/api/inquiries")

    from app.routes.pending_school_routes import pending_school_bp
    app.register_blueprint(pending_school_bp, url_prefix="/api/pending-schools")

    @app.route("/")
    def home():
        return {"status": "CotPi backend running"}

    return app
