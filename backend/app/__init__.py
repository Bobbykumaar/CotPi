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

    @app.route("/")
    def home():
        return {"status": "CotPi backend running"}

    return app
