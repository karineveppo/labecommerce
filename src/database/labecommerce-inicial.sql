

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

SELECT * FROM users;


SELECT * FROM products;


SELECT * FROM products
WHERE name = "Mangá Hunter X Hunter vol.1";


INSERT INTO users (id, email, password)
VALUES 
    ("u008", "felipe@gmail.com", "f7890");


INSERT INTO products (id, name, price, category)
VALUES 
    ("p008", "DNA Revelado das Emoções", 90, "Livros");


SELECT * FROM products
WHERE id = "p005";


DELETE FROM users
WHERE id = "u002";


DELETE FROM products
WHERE id = "p003";


UPDATE users
SET email = "karineveppo@gmail.com"
WHERE id = "u003";


UPDATE products
SET name = "Hellsing vol.1 Capa Dura"
WHERE id = "p007";


SELECT * FROM users
ORDER BY email ASC;


SELECT * FROM products
ORDER BY price ASC
LIMIT 20
OFFSET 0;


SELECT * FROM products
WHERE price >= 50 AND price <= 800 
ORDER BY price ASC;

--Relações-sql-i


CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL UNIQUE NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);


INSERT INTO purchases (id, total_price, paid, delivered_at, buyer_id)
VALUES 
    ("pu001", 90, 1, NULL,"u005"),
    ("pu002", 1088, 0,NULL, "u005"),
    ("pu003", 887, 1, NULL, "u006"),
    ("pu004", 180, 0, NULL, "u007");


DROP TABLE purchases;


SELECT * FROM purchases;

UPDATE purchases
SET delivered_at = DATETIME('now')
WHERE id = "pu004";


SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE users.id = "u005";



--Relações sql-ii

--Como essa lógica funciona?
--Cada compra é registrada uma única vez na tabela purchases.
--Cada produto da mesma compra é registrado uma única vez na tabela purchases_products.
--Exemplo:

--uma pessoa coloca 5 laranjas (p001) e 3 bananas (p002) no carrinho e confirma sua compra

--a compra é registrada com id c001 na tabela purchases

--a seguir, cada item do carrinho é registrado na tabela purchases_products
--5 laranjas são registradas na tabela purchases_products (c001, p001, 5)
--3 bananas são registradas na tabela purchases_products (c001, p002, 3)


CREATE TABLE purchases_products(
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);


DROP TABLE purchases_products;


INSERT INTO purchases_products(purchase_id, product_id, quantity)
VALUES 
    ("pu001", "p001", 1),
    ("pu002", "p002", 2),
    ("pu004", 'p004', 3);


SELECT * FROM purchases_products;


SELECT purchases.id AS purchasesId,
products.id AS productsId,
products.name,
purchases_products.quantity
FROM purchases_products
INNER JOIN purchases 
ON purchases_products.purchase_id = purchasesId
INNER JOIN products
ON purchases_products.product_id = productsId;

