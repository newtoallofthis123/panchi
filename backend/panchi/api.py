import wikipedia
from brain.pic_code import classify_image
from brain.FetchInfo import fetch_bird_info
import cv2
import matplotlib.pyplot as plt
import numpy as np
from flask import Blueprint, request, jsonify
import os

from flask import Flask, Blueprint, request, jsonify
from panchi.db import PanchiDB
from panchi.user import User
from panchi.bird import Bird
from panchi.sighting import Sighting

app = Flask(__name__)
env = os.environ.get('ENV', 'dev')
username = os.environ.get('DB_USER', 'noobscience')
password = os.environ.get('DB_PASS', 'NoobScience')
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


@info.route('/sightings/<user_id>', methods=['GET'])
def sightings(user_id):
    sightings = Sighting.get_by_user(user_id, db.get_conn())
    print(sightings)
    if not sightings:
        return jsonify({'Error': 'Sightings not found'}), 404

    for sighting in sightings:
        bird = Bird.get_info(sighting['bird_id'], db.get_conn())
        sighting['bird'] = bird

    return jsonify(sightings), 200


new = Blueprint('new', __name__, url_prefix='/new')


@new.route('/bird', methods=['POST'])
def new_bird():
    req = request.get_json()
    name = req.get('name')
    species = req.get('species')
    weight = req.get('weight')
    if not name or not species or not weight:
        return jsonify({'Error': 'Name, species, and weight are required'}), 400

    bird = Bird(name, species, weight)
    bird_id = bird.add_bird(db.get_conn())
    if not bird_id:
        return jsonify({'Error': 'Bird already exists'}), 409

    return jsonify({'id': bird_id}), 201


@new.route('/sighting', methods=['POST'])
def new_sighting():
    req = request.get_json()
    bird_id = req.get('bird_id')
    user_id = req.get('user_id')
    location = req.get('location')
    if not bird_id or not user_id or not location:
        return jsonify({'Error': 'Bird ID, user ID, and location are required'}), 400

    sighting = Sighting(bird_id, user_id, location)
    sighting_id = sighting.add_sighting(db.get_conn())
    if not sighting_id:
        return jsonify({'Error': 'Sighting already exists'}), 409

    return jsonify({'id': sighting_id}), 201


img = Blueprint('img', __name__, url_prefix='/img')
class_indices = np.load('/home/noobscience/Projects/panchi/backend/brain/class_indices_033.npy',
                        allow_pickle=True).item()


def process_images(image_data):
    # Step 1: Convert byte data to image arrays
    img_arr = []
    for img_data in image_data:
        # Convert bytes to an image using OpenCV
        img_array = cv2.imdecode(np.frombuffer(
            img_data, np.uint8), cv2.IMREAD_COLOR)

        # Ensure all images are the same shape (resize if necessary)
        if img_array is not None:
            img_arr.append(img_array)

    # Ensure we have images of the same shape for averaging
    if len(img_arr) > 1:
        common_shape = img_arr[0].shape
        img_arr = [cv2.resize(img, (common_shape[1], common_shape[0]))
                   for img in img_arr]

    # Step 2: Calculate the average
    img_avg = np.mean(img_arr, axis=0).astype(np.uint8)

    return img_avg


@img.route('/predict', methods=['POST'])
def predict():
    files = request.files.getlist('images')
    if len(files) != 3:
        # return "Please upload exactly 3 images.", 400
        print("Only got " + str(len(files)))

    images = []

    for file in files:
        if file and file.filename != '':
            name = file.filename
            name = name.replace(" ", "_")
            name = name.lower()
            file.save('imgs/' + name)
            images.append(
                '/home/noobscience/Projects/panchi/backend/imgs/' + name)

    if len(images) != 3:
        # return "Please upload exactly 3 images.", 400
        print("Only got " + str(len(files)))

    probabs = []
    # for image in images:
    probabs.append(classify_image(images[0], class_indices))

    pred = max(probabs, key=lambda x: x[1])
    name = pred[0]

    # name = name.replace('^[0-9A-Za-z] ', '_')
    search = wikipedia.search(name)
    if len(search) == 0:
        return jsonify({'status': 'error', 'message': 'Bird not found'}), 404

    name = search[0]
    info = wikipedia.page(name)
    img = info.images[0]

    # HACK: Fix this hack
    if name == 'Common Kingfisher':
        img = 'https://upload.wikimedia.org/wikipedia/commons/7/72/Alcedo_azurea_-_Julatten.jpg'

    summary = wikipedia.summary(name)

    bird = Bird.search_by_name(name, db.get_conn())
    if bird is None:
        bird = Bird(info.title, name, img, summary, info.url, '', False)
        bird_id = bird.add_bird(db.get_conn())
    else:
        bird_id = bird['id']

    res = {
        'id': bird_id,
        'title': info.title,
        'species': name,
        'weight': '1.5 kg',
        'url': info.url,
        'summary': summary,
        'img': img
    }

    print(res)

    return jsonify({'status': 'success', 'predicted': [pred[0], str(pred[1])], 'res': res}), 200


app.register_blueprint(auth)
app.register_blueprint(info)
app.register_blueprint(img)
app.register_blueprint(new)
