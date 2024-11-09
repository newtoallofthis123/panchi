import os

from flask import Flask, Blueprint, request, jsonify
from panchi.db import PanchiDB
from panchi.user import User
from panchi.bird import Bird
from panchi.sighting import Sighting
from panchi.img import img

app = Flask(__name__)
env = os.environ.get('ENV', 'dev')
username = os.environ.get('DB_USER')
password = os.environ.get('DB_PASS')
if not username or not password:
    raise Exception("Database credentials not found")

db = PanchiDB(username, password)
if not db.check_connection():
    raise Exception("Could not connect to database")
db.init()


@app.route('/ping')
def ping():
    return 'pong'


auth = Blueprint('auth', __name__, url_prefix='/auth')


@auth.route('/signup', methods=['POST'])
def signup():
    req = request.get_json()
    username = req.get('username')
    password = req.get('password')
    if not username or not password:
        return jsonify({'Error': 'Username and password are required'}), 400

    user = User(username, password)
    user_id = user.add_user(db.get_conn())
    if not user_id:
        return jsonify({'Error': 'User already exists'}), 409

    return jsonify({'id': user_id}), 201


@auth.route('/login', methods=['POST'])
def login():
    if request.method == 'GET':
        return jsonify({'Error': 'Method not allowed'}), 405

    req = request.get_json()
    username = req.get('username')
    password = req.get('password')
    if not username or not password:
        return jsonify({'Error': 'Username and password are required'}), 400

    user = User.get_user(username, db.get_conn())
    if not user:
        return jsonify({'Error': 'User not found'}), 404

    if not User.check_password(password, user['password']):
        return jsonify({'Error': 'Invalid password'}), 401

    return jsonify({'id': user['id'], 'status': 'success'}), 200


info = Blueprint('info', __name__, url_prefix='/info')


@info.route('/user/<id>', methods=['GET'])
def user_info(id):
    user = User.get_user(id, db.get_conn())
    if not user:
        return jsonify({'Error': 'User not found'}), 404

    return jsonify(user), 200


@info.route('/bird/<id>', methods=['GET'])
def bird_info(id):
    bird = Bird.get_info(id, db.get_conn())
    if not bird:
        return jsonify({'Error': 'Bird not found'}), 404

    return jsonify(bird), 200


@info.route('/sighting/<id>', methods=['GET'])
def sighting_info(id):
    sighting = Sighting.get_sighting(id, db.get_conn())
    if not sighting:
        return jsonify({'Error': 'Sighting not found'}), 404

    return jsonify(sighting), 200


app.register_blueprint(auth)
app.register_blueprint(info)
app.register_blueprint(img)
