import psycopg

class PanchiDB:
    def __init__(self, username, password, dbname = 'panchi', host = 'localhost', port = '5432'):
        self.engine = PanchiDB.create_engine(username, password, dbname, host, port)
        if self.engine is None:
            raise Exception("Could not connect to database")

    @staticmethod
    def create_engine(username, password, dbname, host, port):
        conn = psycopg.connect(
            dbname = dbname,
            user = username,
            password = password,
            host = host,
            port = port
        )

        return conn

    def check_connection(self):
        cursor = self.engine.cursor()

        cursor.execute("SELECT 1")
        result = cursor.fetchone()

        cursor.close()

        return result[0] == 1

    def get_conn(self):
        return self.engine

    def init(self):
        cursor = self.engine.cursor()

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id VARCHAR(255) PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                password TEXT NOT NULL,
                last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                img_url TEXT
            );
            CREATE TABLE IF NOT EXISTS birds (
                id VARCHAR(255) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                species VARCHAR(255) NOT NULL,
                img_url TEXT,
                description TEXT,
                wiki_url TEXT,
                info VARCHAR(255),
                endangered BOOLEAN DEFAULT FALSE
            );
            CREATE TABLE IF NOT EXISTS sightings (
                id VARCHAR(255) PRIMARY KEY,
                bird_id VARCHAR(255) NOT NULL,
                user_id VARCHAR(255) NOT NULL,
                location VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (bird_id) REFERENCES birds(id),
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
        """)

        self.engine.commit()

        cursor.close()