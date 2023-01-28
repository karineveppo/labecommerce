-- Active: 1674870063847@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

PRAGMA table_info ('users');

INSERT INTO users (id, email, password) 
VALUES 
    ("u001", "marcosbenhur@gmail.com", "mb0123"),
    ("u002", "karine@gmail.com", "k1234"),
    ("u003", "marcos_daniel@gmail.com", "md2345"),
    ("u004", "enzo_paschoal@gmail.com", "ep3456"),
    ("u005", "rafaelakarine@gmail.com", "rk4567"),
    ("u006", "flaviamanuela@gmail.com", "fm5678"),
    ("u007", "vinicius_oyama@gmail.com", "vo6789");

DROP TABLE users;

SELECT * FROM users;

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

PRAGMA table_info ('products');

INSERT INTO products (id, name, price, category)
VALUES ("p001", "Box Mangá Bleach - vol 1-21", 1088, "Box Mangá"),
       ("p002", "Box Mangá Demon Slayer - vol 1-23", 981, "BOx Mangá"),
       ("p003", "Box Mangá One Piece - vol 1-23", 1064, "Box Mangá"),
       ("p004", "Box Mangá Naruto - vol 1-27", 887, "BOX Mangá"),
       ("p005", "Mangá Hunter X Hunter vol.1", 57, "Mangá Avulso"),
       ("p006", "Tate no Yuusha no Nariagari vol.1", 69, "Mangá Avulso"),
       ("p007", "Hellsing vol.1", 52, "Mangá Avulso");


DROP TABLE products;


SELECT * FROM products;
