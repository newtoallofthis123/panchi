from panchi.utils import hash_gen


class Sighting:
    def __init__(self, bird_id, user_id, location):
        self.bird_id = bird_id
        self.user_id = user_id
        self.location = location

    def encode(self):
        return {'id': hash_gen(), 'bird_id': self.bird_id, 'user_id': self.user_id, 'location': self.location,
                }

    def add_sighting(self, conn):
        cursor = conn.cursor()
        sighting_data = self.encode()

        cursor.execute(
            "INSERT INTO sightings (id, bird_id, user_id, location) VALUES (%s, %s, %s, %s)",
            (sighting_data['id'], sighting_data['bird_id'], sighting_data['user_id'], sighting_data['location']))
        conn.commit()

        cursor.close()

        return sighting_data['id']

    @staticmethod
    def get_sightings(conn):
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM sightings")
        result = cursor.fetchall()
        res = []

        for r in result:
            res.append({
                'id': r[0],
                'bird_id': r[1],
                'user_id': r[2],
                'location': r[3],
                'created_at': r[4]
            })

        cursor.close()

        return res

    @staticmethod
    def get_sighting(id, conn):
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM sightings WHERE id = %s", (id,))
        result = cursor.fetchone()
        res = {}

        if result:
            res['id'] = result[0]
            res['bird_id'] = result[1]
            res['user_id'] = result[2]
            res['location'] = result[3]
            res['created_at'] = result[4]

            return res

        cursor.close()

        return None

    @staticmethod
    def get_by_user(user_id, conn):
        cursor = conn.cursor()

        cursor.execute(
            "SELECT * FROM sightings WHERE user_id = %s", (user_id,))
        result = cursor.fetchall()

        res = []

        for r in result:
            res.append({
                'id': r[0],
                'bird_id': r[1],
                'user_id': r[2],
                'location': r[3],
                'created_at': r[4]
            })

        cursor.close()

        return res
