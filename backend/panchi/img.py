from flask import Blueprint, request, jsonify
import numpy as np
import matplotlib.pyplot as plt
import cv2

img = Blueprint('img', __name__, url_prefix='/img')


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
        return "Please upload exactly 3 images.", 400

    image_data = []

    for file in files:
        if file and file.filename != '':
            file.stream.seek(0)
            image_data.append(file.read())

    if len(image_data) != 3:
        return "Please upload exactly 3 images.", 400

    img_arr = []
    for img_data in image_data:
        img_arr.append(np.frombuffer(img_data, np.uint8))

    print(img_arr)

    # img_avg = np.mean(img_arr, axis=0)
    # plt.imshow(img_avg)
    # plt.axis('off')
    # plt.savefig("exported_image.png", bbox_inches='tight', pad_inches=0)
    # plt.close()
    # img_avg = process_images(image_data)
    # cv2.imwrite("averaged_image.png", img_avg)

    return jsonify({'status': 'success'}), 200
