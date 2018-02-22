from flask import Flask, render_template, jsonify, request, redirect
import data_handler
import json
app = Flask(__name__)


@app.route("/")
def boards():
    ''' this is a one-pager which shows all the boards and cards '''
    return render_template('boards.html')


@app.route('/data', methods=['GET', 'POST'])
def data_dump():
    boards_data = data_handler.get_all_board_data()
    cards_data = data_handler.get_all_card_data()
    boards_data['cards'] = cards_data
    status_data = data_handler.get_all_status_data()
    boards_data['statuses'] = status_data
    return json.dumps(boards_data)


@app.route("/data_new", methods=['POST'])
def data_received():
    update_or_save = request.get_json(force=True)
    if update_or_save["table"] == "boards":
        data_handler.decide_if_update_or_insert_boards(update_or_save["data"])
    else:
        data_handler.decide_if_update_or_insert_cards(update_or_save["data"])
    return redirect('/data')


def main():
    app.run(debug=True)


if __name__ == '__main__':
    main()