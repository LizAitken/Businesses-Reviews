CREATE DATABASE securitypracticedb;

CREATE TABLE restaurantstb (
    id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    address VARCHAR(200),
    street VARCHAR(200),
    city VARCHAR(200),
    state VARCHAR(50),
    menu VARCHAR(500)
);

CREATE TABLE userstb (
    id  SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(200),
    password VARCHAR(500)
);

CREATE TABLE reviewstb (
    id  SERIAL PRIMARY KEY,
    score integer,
    context text,
    restaurant_id integer REFERENCES restaurantstb(id),
    user_id INTEGER REFERENCES userstb(id)
);