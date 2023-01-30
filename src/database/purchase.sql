-- Active: 1675034601652@@127.0.0.1@3306

CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users2(id)
);


INSERT INTO purchases (id, total_price, paid, buyer_id)
VALUES
    ("pu001", 90, 1, "u001"),
    ("pu002", 1088, 0, "u001"),
    ("pu003", 887, 0, "u003"),
    ("pu004", 52, 0, "u006");
    


DROP TABLE purchases;


SELECT * FROM purchases;


--UPDATE purchases
--SET delivered_at = DATETIME('now')
--WHERE id = "pu004";


SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id
WHERE users.id = "u006";

