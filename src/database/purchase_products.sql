-- Active: 1675021643466@@127.0.0.1@3306


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
    ("pu001", "p001", 2),
    ("pu002", "p002", 1),
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