from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    @app.route("/")
    def home():
        return {"status": "CotPi backend running"}

    return app
