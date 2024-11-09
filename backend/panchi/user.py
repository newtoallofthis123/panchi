from panchi.utils import hash_gen


class User:
    def __init__(self, username, password, img_url=None):
        self.username = username
        self.password = password
        self.img_url = img_url

    # TODO: Implement hashing
    def hash_password(self):
        return self.password

    @staticmethod
    def check_password(password, hashed):
        return password == hashed

    def encode(self):
        return {'username': self.username, 'password': self.hash_password(), 'id': hash_gen(), 'img_url': self.img_url}

    def add_user(self, conn):
        cursor = conn.cursor()
        user_data = self.encode()

        if User.get_user(user_data['username'], conn):
            return None

        if not user_data['img_url']:
            user_data['img_url'] = ''

        cursor.execute("INSERT INTO users (id, username, password, img_url) VALUES (%s, %s, %s, %s)",
                       (user_data['id'], user_data['username'], user_data['password'], user_data['img_url']))
        conn.commit()

        cursor.close()

        return user_data['id']

    def get_info(self, conn):
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM users WHERE username = %s", (self.username,))
        result = cursor.fetchone()

        cursor.close()

    @staticmethod
    def get_user(username, conn):
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM users WHERE username = %s", (username,))
        result = cursor.fetchone()

        res = {}
        if result:
            res['id'] = result[0]
            res['username'] = result[1]
            res['password'] = result[2]
            res['last_login'] = result[3]
            res['created_at'] = result[4]
            res['img_url'] = result[5]

            return res

        cursor.close()

        return result

    @staticmethod
    def get_all_users(conn):
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM users")
        result = cursor.fetchall()
        res = []
        for user in result:
            res.append({
                'id': user[0],
                'username': user[1],
                'password': user[2],
                'last_login': user[3],
                'created_at': user[4],
                'img_url': user[5]
            })

        cursor.close()

        return res
