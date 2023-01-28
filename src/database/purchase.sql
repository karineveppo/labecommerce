-- Active: 1674913743717@@127.0.0.1@3306

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