import numpy as np
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.models import load_model
from PIL import Image
from tensorflow.image import resize

import sys
sys.stdout.reconfigure(encoding='utf-8')

model = load_model("/home/noobscience/Projects/panchi/backend/brain/pic_model.h5",compile=False)
image1=".jpg"
def classify_image(image,class_indices):
    I = Image.open(image)
    image = I.resize((398, 398))
    image = img_to_array(image)

    image = image / 255.0
    image = np.expand_dims(image, axis=0)

    probabilities = model.predict(image)

    prediction_probability = probabilities[0, probabilities.argmax(axis=1)][0]

    class_predicted = np.argmax(probabilities, axis=1)

    inID = class_predicted[0]
    inv_map = {v: k for k, v in class_indices.items()}
    label = inv_map[inID]
    print("[Info] Predicted: {}, Confidence: {}".format(label, prediction_probability))
    return label, prediction_probability

# a1,b1=classify_image(image1,class_indices)
# a2,b2=classify_image(image2,class_indices)
# a3,b3=classify_image(image3,class_indices)

# l1=[a1,a2,a3]
# l2=[b1,b2,b3]

# ans=max(l1,key=l1.count)
# i=l1.index(ans)
# print(a,l2[i])