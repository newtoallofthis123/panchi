from panchi.utils import hash_gen


class Bird:
    def __init__(self, name, species, img_url, description, wiki_url, info, endangered):
        self.name = name
        self.species = species
        self.img_url = img_url
        self.description = description
        self.wiki_url = wiki_url
        self.info = info
        self.endangered = endangered

    def encode(self):
        return {'id': hash_gen(), 'name': self.name, 'species': self.species, 'img_url': self.img_url,
                'description': self.description,
                'wiki_url': self.wiki_url, 'info': self.info, 'endangered': self.endangered}

    def add_bird(self, conn):
        cursor = conn.cursor()
        bird_data = self.encode()

        cursor.execute(
            "INSERT INTO birds (id, name, species, img_url, description, wiki_url, info, endangered) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
            (bird_data['id'], bird_data['name'], bird_data['species'], bird_data['img_url'], bird_data['description'],
             bird_data['wiki_url'], bird_data['info'], bird_data['endangered']))
        conn.commit()

        cursor.close()

        return bird_data['id']

    @staticmethod
    def search_by_name(name, conn):
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM birds WHERE name = %s", (name,))
        result = cursor.fetchone()
        res = {}

        if result:
            res['id'] = result[0]
            res['name'] = result[1]
            res['species'] = result[2]
            res['img_url'] = result[3]
            res['description'] = result[4]
            res['wiki_url'] = result[5]
            res['info'] = result[6]
            res['endangered'] = result[7]

            return res

        cursor.close()

        return None

    @staticmethod
    def get_info(id, conn):
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM birds WHERE id = %s", (id,))
        result = cursor.fetchone()
        res = {}

        if result:
            res['id'] = result[0]
            res['name'] = result[1]
            res['species'] = result[2]
            res['img_url'] = result[3]
            res['description'] = result[4]
            res['wiki_url'] = result[5]
            res['info'] = result[6]
            res['endangered'] = result[7]

            return res

        cursor.close()

        return None

    @staticmethod
    def get_birds(conn):
        cursor = conn.cursor()

        cursor.execute("SELECT * FROM birds")
        result = cursor.fetchall()

        res = []
        for bird in result:
            res.append({
                'id': bird[0],
                'name': bird[1],
                'species': bird[2],
                'img_url': bird[3],
                'description': bird[4],
                'wiki_url': bird[5],
                'info': bird[6],
                'endangered': bird[7]
            })

        return res
