# config.py
import os
from dotenv import load_dotenv

# Load environment variables from .env file if it exists
load_dotenv()

# Find the absolute path of the directory where this file resides
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    """Base configuration class."""
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-should-really-change-this-secret-key' # CHANGE THIS!
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # Define the database URI. Default to SQLite in the 'instance' folder.
    # For production, you'd use PostgreSQL or MySQL, likely set via environment variable.
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'instance', 'site.db')

    # You can add other config variables here, e.g., for mail server, etc.
    UPLOAD_FOLDER = os.path.join(basedir, 'static', 'uploads') # Example for uploads
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp'} # Example

# You could add DevelopmentConfig, TestingConfig, ProductionConfig classes here
# inheriting from Config and overriding settings if needed.