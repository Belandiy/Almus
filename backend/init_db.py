import psycopg2
import os

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://user:password@localhost:5432/almus_db")

def init():
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        
        # Create tables
        cur.execute("""
            CREATE TABLE IF NOT EXISTS vacancies (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                company TEXT,
                skills TEXT[],
                description TEXT
            );

            CREATE TABLE IF NOT EXISTS projects (
                id SERIAL PRIMARY KEY,
                company_name TEXT NOT NULL,
                title TEXT NOT NULL,
                description TEXT,
                budget INTEGER,
                mode TEXT,
                required_skills TEXT[],
                status TEXT DEFAULT 'open'
            );
        """)
        
        conn.commit()
        cur.close()
        conn.close()
        print("Database initialized!")
    except Exception as e:
        print(f"Error initializing database: {e}")

if __name__ == "__main__":
    init()
