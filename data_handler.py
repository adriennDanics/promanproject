import db_connection


@db_connection.connection_handler
def get_all_board_data(cursor):
    cursor.execute('''SELECT * FROM boards;''')
    return {'boards': cursor.fetchall()}


@db_connection.connection_handler
def get_all_card_data(cursor):
    cursor.execute('''SELECT * FROM cards;''')
    return cursor.fetchall()


@db_connection.connection_handler
def get_all_status_data(cursor):
    cursor.execute('''SELECT * FROM statuses;''')
    return cursor.fetchall()
