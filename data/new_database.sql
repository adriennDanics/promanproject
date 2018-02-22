CREATE SEQUENCE user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE users (
	id INT NOT NULL PRIMARY KEY DEFAULT nextval('user_id_seq'), 
	user_name VARCHAR(255) NOT NULL UNIQUE, 
  	password VARCHAR(255) NOT NULL
);


CREATE SEQUENCE board_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE boards (
	id INT NOT NULL PRIMARY KEY DEFAULT nextval('board_id_seq'), 
	title VARCHAR(255), 
  	is_active BIT(1) NOT NULL DEFAULT 1::bit,
	user_id INT NOT NULL
);

CREATE SEQUENCE status_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE statuses (
	id INT NOT NULL PRIMARY KEY DEFAULT nextval('status_id_seq'),
	name VARCHAR(255) NOT NULL
);


CREATE SEQUENCE card_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE cards (
	id INT NOT NULL PRIMARY KEY DEFAULT nextval('card_id_seq'),
	title VARCHAR(255),
  	board_id INT NOT NULL,
	status_id INT NOT NULL,
	order_num INT NOT NULL,
	is_active BIT(1) NOT NULL DEFAULT 1::bit
);

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_status_id FOREIGN KEY (status_id) REFERENCES statuses(id);
ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_board_id FOREIGN KEY (board_id) REFERENCES boards(id);
ALTER TABLE ONLY boards
    ADD CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id);

INSERT INTO users (user_name, password) VALUES ('Adrienn', '$2b$12$CtB5MYM/bCROQAgcgHdsMeyKwhZXmIf0r4gHMkuAEM2SXRSIEJLvW');
INSERT INTO users (user_name, password) VALUES ('Dávid', '$2b$12$CtB5MYM/bCROQAgcgHdsMeyKwhZXmIf0r4gHMkuAEM2SXRSIEJLvW');
INSERT INTO users (user_name, password) VALUES ('Kondi', '$2b$12$CtB5MYM/bCROQAgcgHdsMeyKwhZXmIf0r4gHMkuAEM2SXRSIEJLvW');
INSERT INTO statuses (name) VALUES ('New');
INSERT INTO statuses (name) VALUES ('In progress');
INSERT INTO statuses (name) VALUES ('Testing');
INSERT INTO statuses (name) VALUES ('Done');
INSERT INTO boards(title, user_id) VALUES ('Test Board 1', 1);
INSERT INTO boards(title, user_id) VALUES ('Test Board 2', 2);
INSERT INTO cards (title, board_id, status_id, order_num) VALUES ('task1', 1, 1, 1);
INSERT INTO cards (title, board_id, status_id, order_num) VALUES ('task2', 1, 2, 1);
INSERT INTO cards (title, board_id, status_id, order_num) VALUES ('task3', 1, 4, 1);
INSERT INTO cards (title, board_id, status_id, order_num) VALUES ('task4', 2, 1, 1);
INSERT INTO cards (title, board_id, status_id, order_num) VALUES ('task5', 2, 2, 1);
INSERT INTO cards (title, board_id, status_id, order_num) VALUES ('task6', 2, 3, 1);