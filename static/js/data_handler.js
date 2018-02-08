// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
dataHandler = {
    keyInLocalStorage: 'proman-data', // the string that you use as a key in localStorage to save your application data
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _darkLight:{},
    _loadData: function() {
        // it is not called from outside
        // loads data from local storage, parses it and put into this._data property
        this._data = JSON.parse(localStorage.getItem(this.keyInLocalStorage));
    },
    _saveData: function() {
        // it is not called from outside
        // saves the data from this._data to local storage
        localStorage.setItem(this.keyInLocalStorage, JSON.stringify(this._data));
    },
    init: function() {
        this._loadData();
        this.getLastClicked();
    },
    getBoards: function(callback) {
        // the boards are retrieved and then the callback function is called with the boards
        let boards = this._data.boards;
        callback(boards);
    },
    getBoard: function(boardId) {
         //the board is retrieved and then the callback function is called with the boar
        let boards = this._data.boards;
        let board;
        for (let i = 0; i < boards.length; i++) {
            if (boards[i].id === boardId) {
                board = boards[i];
                return board;
            }
        }
    },
    getStatuses: function(callback) {
        // the statuses are retrieved and then the callback function is called with the statuses
        let statuses = this._data.statuses;
        callback(statuses);
    },
    getStatus: function(statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
        let statuses = this._data.statuses;
        let status;
        for (let i = 0; i < statuses.length; i++) {
            if (statuses[i].id === statusId) {
                status = statuses[i];
                callback(status);
            }
        }
    },
    getCardsByBoardId: function(boardId, callback) {
        // the cards are retrieved and then the callback function is called with the cards
        let cards = this._data.cards;
        let cardsByBoardId = [];
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].board_id === boardId) {
                cardsByBoardId.push(cards[i])
            }
        }
        callback(cardsByBoardId);
    },
    getCard: function(cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
        let cards = this._data.cards;
        let card;
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].id === cardId) {
                card = cards[i];
                callback(card);
            }
        }
    },
    createNewBoard: function(boardTitle) {
        // creates new board, saves it and calls the callback function with its data
        let existingBoardIDs = [];
        for (let i = 0; i < this._data.boards.length; i++) {
            existingBoardIDs.push(this._data.boards[i].id);
        }
        let newBoardID = Math.max(...existingBoardIDs) + 1;
        let newBoard = {
            "id": newBoardID,
            "title": boardTitle,
            "is_active": true
        };
        this._data.boards.push(newBoard);
        this._saveData();
    },
    createNewCard: function(cardTitle, boardId, statusId, callback) {
        // creates new card, saves it and calls the callback function with its data
    },

    editBoardTitle: function(newTitle, boardID) {
        let board = this.getBoard(boardID);
        board.title=newTitle;
        this._saveData();
    },
    getLastClicked: function () {
        this._darkLight = JSON.parse(localStorage.getItem("lastClicked"));
    },
    passOnLastClicked: function (callback) {
        let lastClickedTheme = this._darkLight;
        callback(lastClickedTheme);
    }
    // here comes more features
};
