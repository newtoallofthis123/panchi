import wikipedia
from flask import Blueprint, request, jsonify
import numpy as np
import matplotlib.pyplot as plt
import cv2

from brain.FetchInfo import fetch_bird_info
from brain.pic_code import classify_image

img = Blueprint('img', __name__, url_prefix='/img')
class_indices = np.load('/home/noobscience/Projects/panchi/backend/brain/class_indices_033.npy',
                        allow_pickle=True).item()


def process_images(image_data):
    # Step 1: Convert byte data to image arrays
    img_arr = []
    for img_data in image_data:
        # Convert bytes to an image using OpenCV
        img_array = cv2.imdecode(np.frombuffer(img_data, np.uint8), cv2.IMREAD_COLOR)

        # Ensure all images are the same shape (resize if necessary)
        if img_array is not None:
            img_arr.append(img_array)

    # Ensure we have images of the same shape for averaging
    if len(img_arr) > 1:
        common_shape = img_arr[0].shape
        img_arr = [cv2.resize(img, (common_shape[1], common_shape[0])) for img in img_arr]

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
            images.append('/home/noobscience/Projects/panchi/backend/imgs/' + name)

    if len(images) != 3:
        # return "Please upload exactly 3 images.", 400
        print("Only got " + str(len(files)))

    probabs = []
    # for image in images:
    probabs.append(classify_image(images[0], class_indices))

    pred = max(probabs, key=lambda x: x[1])
    name = pred[0]
    name = name.replace('^[0-9A-Za-z] ', '_')
    info = wikipedia.page(name)
    img = info.images[0]
    summary = wikipedia.summary(name)

    res = {
        'title': info.title,
        'species': name,
        'weight': '1.5 kg',
        'url': info.url,
        'summary': summary,
        'img': img
    }

    print(res)

    return jsonify({'status': 'success', 'predicted': [pred[0], str(pred[1])], 'res': res}), 200
