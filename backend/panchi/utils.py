import string
import random
from datetime import datetime, date


def hash_gen(n = 8):
    lower = string.ascii_lowercase
    upper = string.ascii_uppercase
    digits = string.digits
    whole = lower + upper + digits
    hash_string = random.sample(whole, n)
    return "".join(hash_string)

def time_cal():
    current_t = datetime.now()
    current_date = str(date.today())
    current_t_f = current_t.strftime("%H:%M:%S")
    return f'{current_t_f} {current_date}'