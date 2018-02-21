import db_connection
import bcrypt


def hash_password(plain_text_password):
    hashed_bytes = bcrypt.hashpw(plain_text_password.encode('utf-8'), bcrypt.gensalt())
    return hashed_bytes.decode('utf-8')


def verify_password(plain_text_password, hashed_password):
    hashed_bytes_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(plain_text_password.encode('utf-8'), hashed_bytes_password)


@db_connection.connection_handler
def get_all_board_data(cursor, user_id):
    cursor.execute('''SELECT * FROM boards WHERE user_id=%(user_id)s;''', {'user_id': user_id})
    return {'boards': cursor.fetchall()}


@db_connection.connection_handler
def get_all_card_data(cursor):
    cursor.execute('''SELECT * FROM cards;''')
    return cursor.fetchall()


@db_connection.connection_handler
def get_all_status_data(cursor):
    cursor.execute('''SELECT * FROM statuses;''')
    return cursor.fetchall()


@db_connection.connection_handler
def decide_if_update_or_insert_cards(cursor, data_dictionary):
    cursor.execute('''SELECT id FROM cards;''')
    ids_from_table_dict = cursor.fetchall()
    ids_from_table = []
    for id_keys in ids_from_table_dict:
        ids_from_table.append(id_keys["id"])
    if data_dictionary["id"] in ids_from_table:
        update_requested_cards(data_dictionary)
    else:
        insert_into_table_cards(data_dictionary)


@db_connection.connection_handler
def decide_if_update_or_insert_boards(cursor, data_dictionary):
    cursor.execute('''SELECT id FROM boards;''')
    ids_from_table_dict = cursor.fetchall()
    ids_from_table = []
    for id_keys in ids_from_table_dict:
        ids_from_table.append(id_keys["id"])
    if data_dictionary["id"] in ids_from_table:
        update_requested_boards(data_dictionary)
    else:
        insert_into_table_boards(data_dictionary)


@db_connection.connection_handler
def update_requested_cards(cursor, data):
    cursor.execute('''UPDATE cards SET title = %(title)s, 
                      board_id = %(board_id)s, 
                      status_id = %(status_id)s, 
                      order_num = %(order_num)s
                      WHERE id = %(id)s; ''', data)


@db_connection.connection_handler
def update_requested_boards(cursor, data):
    cursor.execute('''UPDATE boards SET title = %(title)s, 
                          is_active = %(is_active)s, 
                          user_id = %(user_id)s
                          WHERE id = %(id)s; ''', data)


@db_connection.connection_handler
def insert_into_table_cards(cursor, data):
    cursor.execute('''INSERT INTO cards(title, board_id, status_id, order_num) 
                      VALUES (%(title)s, %(board_id)s, %(status_id)s, %(order_num)s);''', data)


@db_connection.connection_handler
def insert_into_table_boards(cursor, data):
    cursor.execute('''INSERT INTO boards(title, user_id) 
                      VALUES (%(title)s, %(user_id)s);''', data)


@db_connection.connection_handler
def add_new_user_to_db(cursor, user_name, password):
    cursor.execute('''INSERT INTO users(user_name, password) 
                      VALUES (%(user_name)s, %(password)s);''', {'user_name': user_name, 'password': password})


@db_connection.connection_handler
def get_user_password_by_name(cursor, user_name):
    cursor.execute('''SELECT * FROM users WHERE user_name=%(user_name)s;''', {'user_name': user_name})
    return cursor.fetchone()