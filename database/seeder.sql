-- test data
INSERT INTO users
(first_name, username, password, email)
VALUES ('Jane', 'janedoe', 'test', 'jane.doe@test.com'),
('John', 'johndoe', 'test', 'john.doe@test.com'),
('Kate', 'katedoe', 'test', 'kate.doe@test.com'),
('Alex', 'alexdoe', 'test', 'alex.doe@test.com');

INSERT INTO payments_event
(event_name, total_amount, event_creator_id, description, creation_date, due_date, completed, remaining_amount)
VALUES ('Work dinner', 300.00, 1, 'Dinner with work people on Feb 27th 2022', '2022-02-27', '2022-03-01', false, 300.00);

INSERT INTO payments
(user_id, amount, percentage, paid_status, received_status, paid_date, payment_event_id)
VALUES (1, 75.00, 25, true, true, '2022-02-27', 1);

INSERT INTO payments
(user_id, amount, percentage, paid_status, received_status, payment_event_id) VALUES (2, 75.00, 25, true, false, 1), (3, 75.00, 25, false, false, 1), (4, 75.00, 25, false, false, 1);