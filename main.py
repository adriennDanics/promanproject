from flask import Flask, render_template, request, redirect, session
import data_handler
import json
import psycopg2
app = Flask(__name__)
app.secret_key = 'IMightJustTakeAShortWalkOfALongPier01'


@app.route("/")
def boards():
    return render_template('boards.html')


@app.route("/session", methods=['GET', 'POST'])
def login_data():
    try:
        user_data = request.get_json(force=True)
        user_data_from_database = data_handler.get_user_password_by_name(user_data['user'])
        verify = data_handler.verify_password(user_data['password'], user_data_from_database['password'])
        if verify:
            session['user_id'] = user_data_from_database['id']
            session['user_name'] = user_data['user']
            return redirect('data')
        else:
            session['message'] = 'Wrong username or password'
            return redirect('/')
    except TypeError:
        session['message'] = 'Wrong username or password'
        return redirect('/')


@app.route("/register", methods=['GET', 'POST'])
def registration():
    if request.method == 'GET':
        return render_template("registration.html", message='')
    else:
        try:
            password_hash = data_handler.hash_password(request.form['password'])
            data_handler.add_new_user_to_db(request.form['user_name'], password_hash)
        except psycopg2.IntegrityError:
            return render_template("registration.html", message=request.form['user_name']+" already exists, choose new username")
        return redirect('/')


@app.route('/data', methods=['GET', 'POST'])
def data_dump():
    if 'user_id' in session:
        boards_data = data_handler.get_all_board_data(session['user_id'])
        cards_data = data_handler.get_all_card_data()
        boards_data['cards'] = cards_data
        status_data = data_handler.get_all_status_data()
        boards_data['statuses'] = status_data
        boards_data['user_id'] = session['user_id']
        boards_data['user_name'] = session['user_name']
        return json.dumps(boards_data)
    else:
        if 'message' in session:
            return json.dumps({'message': session['message']})
        else:
            return json.dumps("flag")


@app.route("/data_new", methods=['POST'])
def data_received():
    update_or_save = request.get_json(force=True)
    if update_or_save["table"] == "boards":
        data_handler.decide_if_update_or_insert_boards(update_or_save["data"])
    else:
        data_handler.decide_if_update_or_insert_cards(update_or_save["data"])
    return redirect('/data')


@app.route('/logout')
def logout():
    session.pop('user_id')
    session.pop('message')
    session.pop('user_name')
    return redirect('/')


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()