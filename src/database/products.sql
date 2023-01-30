-- Active: 1675021643466@@127.0.0.1@3306

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL, 
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);


INSERT INTO products (id, name, price, category, description, image_url)
VALUES
    ("p001", "Box Mangá Bleach - vol 1-21", 1088,"Box Mangá", "Box contendo os Mangás do Anime Bleach vol.1 - 21","COLOCAR A IMAGEM"),
    ("p002", "Box Mangá Demon Slayer - vol 1-23", 981, "Box Mangá", "Box contendo os Mangás do Anime Demon Slayer vol.1 - 23", "COLOCAR A IMAGEM"),
    ("p003", "Box Mangá One Piece - vol 1-23", 1064, "Box Mangá", "Box contendo os Mangás do Anime One Piece vol.1 - 23", "COLOCAR A IMAGEM"),
    ("p004", "Box Mangá Naruto - vol 1-27", 887, "BOX Mangá", "Box contendo os Mangás do Anime Naruto vol.1 - 27", "COLOCAR A IMAGEM"),
    ("p005", "Mangá Hunter X Hunter vol.1", 57, "Mangá Avulso", "Mangá Avulso do Anime Hunter x Hunter vol.1", "COLOCAR A IMAGEM"),
    ("p006", "Tate no Yuusha no Nariagari vol.1", 69, "Mangá Avulso", "Mangá Avulso do Anime Tate no Yuusha no Nariagari vol.1", "COLOCAR A IMAGEM"),
    ("p007", "Hellsing vol.1", 52, "Mangá Avulso", "Mangá Avulso do Anime Hellsing vol.1", "COLOCAR A IMAGEM");


SELECT * FROM products;


DROP TABLE products;


SELECT * FROM products
WHERE name = "Box Mangá Bleach - vol 1-21";



INSERT INTO products (id, name, price, category, description, image_url)
VALUES 
    ("p008", "DNA Revelado das Emoções", 90, "Livros", "Livro da autora Elaine Ourives", "COLOCAR A IMAGEM");


SELECT * FROM products
WHERE id = "p004";


DELETE FROM products
WHERE id = "p008";


UPDATE products
SET name = "Hellsing vol.1 Capa Dura"
WHERE id = "p007";


SELECT * FROM products
ORDER BY price ASC
LIMIT 20
OFFSET 0;


SELECT * FROM products
WHERE price >= 20 AND price <= 800
ORDER BY price ASC;

