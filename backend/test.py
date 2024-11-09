from panchi.db import PanchiDB
from panchi.user import User

p = PanchiDB('noobscience', 'NoobScience')
print(p.check_connection())
print(p.init())

u = User('root', 'root')
u.add_user(p.get_conn())