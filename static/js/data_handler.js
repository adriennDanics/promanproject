// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
dataHandler = {
    keyInLocalStorage: 'proman-data', // the string that you use as a key in localStorage to save your application data
    _data: {}, // it contains the boards and their cards and statuses. It is not called from outside.
    _theme:{},
    _loadData: function(callback) {
        // it is not called from outside
        // loads data from local storage, parses it and put into this._data property
        $.ajax({
            dataType: "json",
            url: "http://127.0.0.1:5000/data" ,
            method: 'GET',
            success: function(response) {
                dataHandler._data = response;
                console.log(response);
                callback();
            }
        });
        dataHandler._theme = JSON.parse(localStorage.getItem("theme"));
    },
    _saveData: function(whatToUpdateOrAdd, dataToSave) {
        // it is not called from outside
        // whatToUpdateOrAdd parameter: board/card/etc.
        // dataToSave parameter: piece of data specifically to be updated
        if(dataToSave === "theme"){
           localStorage.setItem("theme", JSON.stringify(dataHandler._theme));
        } else {
            let dataToPost = {"table": whatToUpdateOrAdd, "data": dataToSave};
            console.log(dataToPost);
            $.ajax({
                type: "POST",
                url: "http://127.0.0.1:5000/data_new",
                data: JSON.stringify(dataToPost),
                async: false,
                contentType: "application/json; charset=utf-8",
                dataType: 'json',
                });
        }
    },
    init: function() {
        dataHandler._loadData();
    },
    getBoards: function(callback) {
        // the boards are retrieved and then the callback function is called with the boards
        let boards = dataHandler._data.boards;
        callback(boards);
    },
    getBoard: function(boardId) {
         //the board is retrieved and then the callback function is called with the boar
        let boards = dataHandler._data.boards;
        let board;
        for (let i = 0; i < boards.length; i++) {
            if (boards[i].id === boardId) {
                board = boards[i];
                return board;
            }
        }
    },
    getStatuses: function(callback = "default") {
        // the statuses are retrieved and then the callback function is called with the statuses
        let statuses = dataHandler._data.statuses;
        if ( callback === "default") {
            return statuses;
        } else {
            callback(statuses);
        }
    },
    getStatusIDByName: function(statusName, callback="default") {
        // the status is retrieved and then the callback function is called with the status
        let statuses = dataHandler._data.statuses;
        let status;
        for (let i = 0; i < statuses.length; i++) {
            if (statuses[i].name === statusName) {
                status = statuses[i];
            }
        }
        if( callback === "default"){
            return status
        } else {
            callback(status)
        }
    },

    getCardsByBoardId: function(boardId, callback="default") {
        // the cards are retrieved and then the callback function is called with the cards
        let cards = dataHandler._data.cards;
        let cardsByBoardId = [];
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].board_id === boardId) {
                cardsByBoardId.push(cards[i])
            }
        }
        if ( callback === "default") {
            return cardsByBoardId;
        } else {
            callback(cardsByBoardId);
        }
    },
    getCard: function(cardId, callback="default") {
        // the card is retrieved and then the callback function is called with the card
        let cards = dataHandler._data.cards;
        let card;
        for (let i = 0; i < cards.length; i++) {
            if (cards[i].id === cardId) {
                card = cards[i];
            }
        }
        if( callback === "default"){

            return card

        } else {

            callback(card)

        }
    },
    createNewBoard: function(boardTitle) {
        // creates new board, saves it and calls the callback function with its data
        let existingBoardIDs = [];
        for (let i = 0; i < dataHandler._data.boards.length; i++) {
            existingBoardIDs.push(dataHandler._data.boards[i].id);
        }
        let newBoardID = Math.max(...existingBoardIDs) + 1;
        let newBoard = {
            "id": newBoardID,
            "title": boardTitle,
            "is_active": true,
            "user_id": 1
        };
        dataHandler._data.boards.push(newBoard);
        dataHandler._saveData('boards',newBoard);
    },
    createNewCard: function(cardTitle, boardId, statusId) {
        // creates new card, saves it and calls the callback function with its data
        let existingCardIDs = [];
        for (let i = 0; i < dataHandler._data.cards.length; i++) {
            existingCardIDs.push(dataHandler._data.cards[i].id);
        }
        let newCardID = Math.max(...existingCardIDs) + 1;
        let cardsForThisBoard = dataHandler.getCardsByBoardId(Number(boardId));
        let orderForThisBoard = [];
        for (let i = 0; i < cardsForThisBoard.length; i++) {
            if (cardsForThisBoard[i].status_id === 1) {
                orderForThisBoard.push(cardsForThisBoard[i].order_num);
            }
        }
        if(orderForThisBoard.length) {
            var newCardOrder = Math.max(...orderForThisBoard) + 1;
        } else {
            var newCardOrder = 1;
        }
        let newCard = {
            "id": newCardID,
            "title": cardTitle,
            "board_id": Number(boardId),
            "status_id": statusId,
            "order_num": Number(newCardOrder)
        };
        dataHandler._data.cards.push(newCard);
        dataHandler._saveData("cards", newCard);
    },

    editBoardTitle: function(newTitle, boardID) {
        let board = dataHandler.getBoard(boardID);
        board.title=newTitle;
        dataHandler._saveData("boards", board);
    },
    getTheme: function (callback) {
        callback(dataHandler._theme);
    },
    setTheme: function (theme) {
        dataHandler._theme = theme;
        dataHandler._saveData("theme", "theme");
    },
    // here comes more features

    editCardTitle: function (newTitle, cardID) {
        let card = dataHandler.getCard(cardID);
        card.title = newTitle;
        dataHandler._saveData("cards", card);

    },

    sortCardsInBoardsByOrder: function () {
        let allCardsInAllBoards = dataHandler._data.cards;
        allCardsInAllBoards.sort(function (a, b) {
            return a.order_num - b.order_num
        });
    },

    sortCardsInBoardsByStatus: function () {
        let allCardsInAllBoards = dataHandler._data.cards;
        allCardsInAllBoards.sort(function (a, b) {
            return a.status_id - b.status_id
        });
    },
};
