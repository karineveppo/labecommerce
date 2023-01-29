-- Active: 1674913743717@@127.0.0.1@3306


CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);


PRAGMA table_info ('users');


INSERT INTO users (id, name, email, password ) 
VALUES 
    ("u001", "Marcos Benhur", "marcosbenhur@gmail.com", "mb0123"),
    ("u002", "Karine", "karine@gmail.com", "k1234"),
    ("u003", "Marcos Daniel", "marcosdaniel@gmail.com","md2345"),
    ("u004", "Enzo Paschoal", "enzopaschoal@gmail.com", "ep3456"),
    ("u005", "Rafaela Karine", "rafaelakarine@gmail.com", "rk4567"),
    ("u006", "Flávia Manuela", "flaviamanuela@gmail.com", "fm5678")
    ("u007", "Vinícius Oyama", "viniciusoyama@gmail.com", "vo6789");


DROP TABLE users;


SELECT * FROM users;
       