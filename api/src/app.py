import os

import cloudinary

from dotenv import load_dotenv
from flask import Flask, request, jsonify, render_template
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS

from models.database import db
from models.user import User

from routes.auth import bpAuth
from routes.users import bpUsers

load_dotenv()

cloudinary.config( 
  cloud_name = os.getenv('CLOUD_NAME'), 
  api_key = os.getenv('CLOUD_API_KEY'), 
  api_secret = os.getenv('CLOUD_SECRET_KEY'),
  secure = True
)

app = Flask(__name__)
app.url_map.strict_slashes = False
app.config['DEBUG'] = True
app.config['ENV'] = 'development' 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
app.config['JWT_SECRET_KEY'] = 'secret-key'

db.init_app(app)
jwt = JWTManager(app)
Migrate(app, db)
CORS(app)

app.register_blueprint(bpAuth, url_prefix='/api')
app.register_blueprint(bpUsers, url_prefix='/api')

@app.route('/')
def main():
    return render_template('index.html')



if __name__ == '__main__':
    app.run()