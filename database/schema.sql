-- DB Name: split_app
-- Run `createdb split_app` in terminal to create the table
-- Then run `psql split_app` to run the below commands in the DB

DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS payment_events;
DROP TABLE IF EXISTS payments_event;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    username VARCHAR(20) NOT NULL UNIQUE, 
    password TEXT NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE payments_event (
    id SERIAL PRIMARY KEY,
    event_name VARCHAR(20) NOT NULL,
    total_amount NUMERIC NOT NULL,
    remaining_amount NUMERIC,
    event_creator_id INTEGER,
    description TEXT NOT NULL,
    creation_date DATE,
    due_date DATE NOT NULL,
    completed boolean
);

CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    amount NUMERIC,
    percentage INTEGER,
    paid_status BOOLEAN,
    received_status BOOLEAN,
    paid_date DATE,
    payment_event_id INTEGER
);

ALTER TABLE payments_event
ADD CONSTRAINT fk_creator_id
FOREIGN KEY(event_creator_id)
REFERENCES users(id);

ALTER TABLE payments
ADD CONSTRAINT fk_user_id
FOREIGN KEY(user_id)
REFERENCES users(id);

ALTER TABLE payments 
ADD CONSTRAINT fk_event_id
FOREIGN KEY(payment_event_id)
REFERENCES payments_event(id);