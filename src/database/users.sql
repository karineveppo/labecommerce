-- Active: 1674913743717@@127.0.0.1@3306


CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT
);


PRAGMA table_info ('users');


INSERT INTO users (id, email, password, created_at) 
VALUES 
    ("u001", "marcosbenhur@gmail.com", "mb0123", DATETIME('now')),
    ("u002", "karine@gmail.com", "k1234", DATETIME('now')),
    ("u003", "marcos_daniel@gmail.com", "md2345", DATETIME('now')),
    ("u004", "enzo_paschoal@gmail.com", "ep3456", DATETIME('now')),
    ("u005", "rafaelakarine@gmail.com", "rk4567",DATETIME('now')),
    ("u006", "flaviamanuela@gmail.com", "fm5678", DATETIME('now')),
    ("u007", "vinicius_oyama@gmail.com", "vo6789", DATETIME('now'));
    

DROP TABLE users;


SELECT * FROM users;


INSERT INTO users (id, email, password, created_at)
VALUES 
    ("U008", "felipe@gmail.com", "f7890", DATETIME('now'));


DELETE FROM users
WHERE id = "u008";

UPDATE users
SET email = "karineveppo@gmail.com"
WHERE id = "u002";

SELECT * FROM users
ORDER BY email ASC;