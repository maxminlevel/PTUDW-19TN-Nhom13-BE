CREATE TABLE users ( 
ID SERIAL PRIMARY KEY,
name VARCHAR(30),
email VARCHAR(30)
);
INSERT INTO users (name, email)
VALUES 
    ('Adam', 'adam@heaven.com'),
    ('Eva', 'eva@heaven.com'),
    ('Jesus', 'jesus@heaven.com'),
    ('Evil', 'evil@heaven.com');