# app.py
from flask import Flask
from flask_migrate import Migrate
from config import Config
from models import db # Import db instance from models.py
from routes import main_bp # Import the blueprint from routes.py
import os

# Function to create the Flask app instance
def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
        print(f"Instance folder created at {app.instance_path}")
    except OSError:
        pass # Already exists

    # Initialize extensions
    db.init_app(app)
    migrate = Migrate(app, db) # Initialize Flask-Migrate

    # Register Blueprints (our routes)
    app.register_blueprint(main_bp)
    # Register other blueprints here (e.g., auth_bp, api_bp) if you create them

    # You might initialize other extensions like Flask-Login, Flask-Mail here

    print("Flask App Created")
    print(f"Database URI: {app.config['SQLALCHEMY_DATABASE_URI']}")

    # Optional: Create database tables if they don't exist
    # It's generally better to use migrations (Flask-Migrate) for this
    with app.app_context():
        # db.create_all() # Use migrations instead for better DB management
        print("App context pushed.")

    return app

# Create the app instance when this file is run directly
if __name__ == '__main__':
    app = create_app()
    # For development server:
    # Use `flask run` command instead of app.run() generally
    # But you can use app.run() for simple testing:
    app.run(debug=True) # debug=True is NOT for production!