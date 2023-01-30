-- Active: 1675034601652@@127.0.0.1@3306


CREATE TABLE users2 (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);


PRAGMA table_info ('users2');


INSERT INTO users2 (id, name, email, password ) 
VALUES
    ("u001", "Marcos Benhur", "marcosbenhur@gmail.com", "mb0123"),
    ("u002", "Karine", "karine@gmail.com", "k1234"),
    ("u003", "Marcos Daniel", "marcos_daniel@gmail.com", "md2345"),
    ("u004", "Enzo Paschoal", "enzo_paschoal@gmail.com", "ep3456"),
    ("u005", "Rafaela Karine", "rafaelakarine@gmail.com", "rk4567"),
    ("u006", "Flavia Manuela", "flaviamanuela@gmail.com", "fm5678"),
    ("u007", "Vinicius Oyama", "vinicius_oyama@gmail.com", "vo6789");


DROP TABLE users2;


SELECT * FROM users2;


INSERT INTO users2 (id, name, email, password)
VALUES ("u008", "Felipe", "felipe@gmail.com", "f7890");


DELETE FROM users2
WHERE id = "u008";


UPDATE users2
SET email = "karineveppo@gmail.com"
WHERE id = "u002";


SELECT * FROM users2
ORDER BY email ASC;