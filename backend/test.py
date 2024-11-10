from panchi.db import PanchiDB
from panchi.user import User
from brain.pic_code import classify_image
import numpy as np

class_indices = np.load('/home/noobscience/Projects/panchi/backend/brain/class_indices_033.npy', allow_pickle=True).item()
c = classify_image('/home/noobscience/Projects/panchi/backend/imgs/whatsapp_image_2024-11-10_at_12.54.19_am.jpeg', class_indices)
print(c)