// It uses data_handler.js to visualize elements
dom = {
    loadBoards: function() {
        let boardsDiv = document.getElementById("boards");
        boardsDiv.innerHTML = '';
        dataHandler.sortCardsInBoardsByOrder();
        dataHandler.sortCardsInBoardsByStatus();
        dataHandler.getBoards(dom.showBoards);
        dataHandler.getTheme(themes.themeHandler);
        dom.addEventListenerToNewBoardIcon();
        dom.addEventListenerToSaveNewBoardButton();
        dom.addEventListenerToCancelSavingNewBoardButton();
        dom.addEventListenerToBoardDetailButton();
        dom.addEventListenerToCloseBoardDetailButton();
        dom.addEventListenerToEditCardTitle();
        dom.addEventListenerToEditBoardTitle();
        themes.addEventListenerForDarkTheme();
        themes.addEventListenerForFunTheme();
        // retrieves boards and makes showBoards called
    },
    showBoards: function(boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        let numberOfBoards = boards.length;
        let logOutDiv = document.getElementById("logout");
        logOutDiv.innerHTML = "";

        let logOutLink = htmlStrings.initLogOutLink(dataHandler._data.user_name);
        logOutDiv.insertAdjacentHTML("beforeend", logOutLink);

        let boardsDiv = document.getElementById("boards");

        for (let board of boards) {
            dom.initBoards(board, boardsDiv)

        }
    },

    loadCards: function(boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function(cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    // here comes more features
    addEventListenerToNewBoardIcon: function () {
        let new_board_icon = document.getElementById("new_board_clickable_area");
        new_board_icon.addEventListener("click", dom.handleClickOnNewBoardIcon)
    },

    addEventListenerToSaveNewBoardButton: function () {
        let save_new_board_butt = document.getElementById("save_new_board_button");
        save_new_board_butt.addEventListener("click", dom.handleClickOnSaveNewBoardButton)
    },

    addEventListenerToCancelSavingNewBoardButton: function () {
        let cancel_button = document.getElementById("cancel_saving_new_board_button");
        cancel_button.addEventListener("click", dom.handleClickOnCancelSavingNewBoardButton)
    },

    addEventListenerToEditBoardTitle: function () {
        let editableBoards = document.getElementsByClassName("titleEditButton");
        for(let editableBoard of editableBoards){
            editableBoard.addEventListener("click", dom.handleClickOnEditBoardTitle)
        }
    },

    addEventListenerToEditCardTitle: function () {
        let editableCards = document.getElementsByClassName("fas fa-edit");
        for(let editableCard of editableCards){
            editableCard.addEventListener("click", dom.handleClickOnEditCardTitle)
        }

    },

    addEventlistenerToSaveNewCard: function (boardid) {
        let addNewCardButton = document.getElementById("newboardcard" + boardid);
        addNewCardButton.addEventListener("click", dom.handleClickOnNewCardIcon(boardid))
    },

    handleClickOnNewBoardIcon: function () {
        document.getElementById("new_board_input_field").value = "";

        let newBoardText = document.getElementById("new_board_text");
        newBoardText.setAttribute("hidden", true);

        let newBoardInput = document.getElementById("new_board_input_field");
        newBoardInput.removeAttribute("hidden");

        let saveNewBoardButton = document.getElementById("save_new_board_button");
        saveNewBoardButton.removeAttribute("hidden");

        let cancelSavingNewBoardButton = document.getElementById("cancel_saving_new_board_button");
        cancelSavingNewBoardButton.removeAttribute("hidden");
    },

    handleClickOnSaveNewBoardButton: function () {
        let newBoardTitle = document.getElementById("new_board_input_field").value;

        if (newBoardTitle.length > 0) {
            let newBoardText = document.getElementById("new_board_text");
            newBoardText.removeAttribute("hidden");

            let newBoardInput = document.getElementById("new_board_input_field");
            newBoardInput.setAttribute("hidden", true);

            let saveNewBoardButton = document.getElementById("save_new_board_button");
            saveNewBoardButton.setAttribute("hidden", true);

            let cancelSavingNewBoardButton = document.getElementById("cancel_saving_new_board_button");
            cancelSavingNewBoardButton.setAttribute("hidden", true);

            let board = dataHandler.createNewBoard(newBoardTitle);

            let boardsDiv = document.getElementById("boards");
            dom.initBoards(board, boardsDiv);
            dom.addEventListenerToEditSingleBoardTitle(board.id);
            dom.addEventlistenerToSingleBoard(board.id);
            dom.addEventlistenerToSaveNewCard(board.id)



        }

    },
    handleClickOnNewCardIcon: function (boardid) {
        let newCardButtonId = document.getElementById("newboardcard" + boardid);
        newCardButtonId.removeAttribute("hidden");

        newCardButtonId.addEventListener("click", function () {
            newCardButtonId.setAttribute("hidden", true);

            let saveButtonForNewCard = document.getElementById("add-card-button" + boardid);
            let textBoxForNewCard = document.getElementById("add-card-input" + boardid);
            let cancelButtonForNewCard = document.getElementById("add-card-cancel" + boardid);

            if(saveButtonForNewCard.hasAttribute("hidden") && textBoxForNewCard.hasAttribute("hidden")
                                                            && cancelButtonForNewCard.hasAttribute("hidden")) {
                saveButtonForNewCard.removeAttribute("hidden");
                textBoxForNewCard.removeAttribute("hidden");
                cancelButtonForNewCard.removeAttribute("hidden")
            }

            saveButtonForNewCard.addEventListener("click", function (){
                let newCardTitleGiven = textBoxForNewCard.value;
                if(newCardTitleGiven.length !== 0) {
                    let newCard = dataHandler.createNewCard(newCardTitleGiven, boardid, 1);
                    let boardDivDetailContainer = document.getElementById("board" + boardid + "-New");
                    boardDivDetailContainer.insertAdjacentHTML("beforeend", htmlStrings.initCard(newCard));
                    dom.addEventlistenerToSingleCard(newCard.id);
                    dom.addEventListenerToDeleteCardButton(newCard.id);
                    textBoxForNewCard.value = "";
                    saveButtonForNewCard.setAttribute("hidden", true);
                    textBoxForNewCard.setAttribute("hidden", true);
                    cancelButtonForNewCard.setAttribute("hidden", true);
                    newCardButtonId.removeAttribute("hidden");

                }
            }, false);

            cancelButtonForNewCard.addEventListener("click", function () {
                textBoxForNewCard.value = "";
                saveButtonForNewCard.setAttribute("hidden", true);
                textBoxForNewCard.setAttribute("hidden", true);
                cancelButtonForNewCard.setAttribute("hidden", true);
                newCardButtonId.removeAttribute("hidden");
            })
        })
    },

    handleClickOnCancelSavingNewBoardButton: function () {
        let newBoardText = document.getElementById("new_board_text");
        newBoardText.removeAttribute("hidden");

        let newBoardInput = document.getElementById("new_board_input_field");
        newBoardInput.setAttribute("hidden", true);

        let saveNewBoardButton = document.getElementById("save_new_board_button");
        saveNewBoardButton.setAttribute("hidden", true);

        let cancelSavingNewBoardButton = document.getElementById("cancel_saving_new_board_button");
        cancelSavingNewBoardButton.setAttribute("hidden", true);
    },

    addEventListenerToBoardDetailButton: function () {
        let detailForBoards = document.getElementsByClassName("boards");

        for (let detailForBoard of detailForBoards) {

            detailForBoard.addEventListener("click", function () {

                let detailButtonId = detailForBoard.id;
                let boardDetail = document.getElementById("boarddetail" + detailButtonId.replace("boardspan",""));
                if(boardDetail.hasAttribute("hidden")) {
                    boardDetail.removeAttribute("hidden");
                } else {
                    boardDetail.setAttribute("hidden", true)
                }



                }, false)
        }
    },

    handleClickOnEditBoardTitle: function () {
        let boardElementID = this.parentElement.getAttribute("id");
        let boardID = Number(boardElementID.replace("board_button_span", ""));

        let inputField = document.getElementById("edit-input-field" + boardID);
        let saveButton = document.getElementById("edit-input-button" + boardID);

        if(inputField.hasAttribute("hidden") && saveButton.hasAttribute("hidden")) {
            inputField.removeAttribute("hidden");
            saveButton.removeAttribute("hidden");
        } else {
            inputField.setAttribute("hidden", true);
            saveButton.setAttribute("hidden", true);
        }

        saveButton.addEventListener("click", function() {
            let newBoardTitle = document.getElementById("edit-input-field"+boardID).value;
            if (newBoardTitle.length > 0) {
                dataHandler.editBoardTitle(newBoardTitle, boardID);
                document.getElementById("boardspan" + boardID).innerText = newBoardTitle;
                inputField.setAttribute("hidden", true);
                saveButton.setAttribute("hidden", true);
            }
        });
    },

    addEventListenerToCloseBoardDetailButton: function () {
        let closeDetailButtons = document.getElementsByClassName("fas fa-angle-up");
        for (let closeDetailButton of closeDetailButtons) {
            closeDetailButton.addEventListener("click", function () {
                let closeDetailButtonId = closeDetailButton.id;
                document.getElementById(closeDetailButtonId).setAttribute("hidden", true);

                let DetailButton = document.getElementById("detail" + closeDetailButtonId.replace("closedetail",""));
                DetailButton.removeAttribute("hidden");

                let boardDetail = document.getElementById("boarddetail" + closeDetailButtonId.replace("closedetail",""));
                boardDetail.setAttribute("hidden", true);

                let newCardButtonId = document.getElementById("newboardcard" + closeDetailButtonId.replace("closedetail",""));
                newCardButtonId.setAttribute("hidden", true);
            });
        }
    },

    handleClickOnEditCardTitle: function () {
        let cardElementID = this.parentElement.getAttribute("id");
        let cardID = Number(cardElementID.replace("cardButton", ""));

        let inputField = document.getElementById("edit-card-input" + cardID);
        let saveButton = document.getElementById("edit-card-button" + cardID);

        if(inputField.hasAttribute("hidden") && saveButton.hasAttribute("hidden")) {
            inputField.removeAttribute("hidden");
            saveButton.removeAttribute("hidden");
        } else {
            inputField.setAttribute("hidden", true);
            saveButton.setAttribute("hidden", true);
        }

        saveButton.addEventListener("click", function () {
            let newCardTitle = document.getElementById("edit-card-input"+cardID).value;

            if (newCardTitle.length > 0) {
                dataHandler.editCardTitle(newCardTitle, cardID);
                document.getElementById("cardTitle" + cardID).innerText = newCardTitle;
                inputField.setAttribute("hidden", "hidden");
                saveButton.setAttribute("hidden", "hidden");
            }

        });
    },

    handleCardDrop: function (drake) {
        drake.on('drop', function(el, target, source, sibling) {
            let cardId = Number(el.id.replace("card", ""));
            let card = dataHandler.getCard(cardId);
            let statusName = target.dataset.status;
            let status = dataHandler.getStatusIDByName(statusName);

            let boardId = card.board_id;
            let cardsForThisBoard = dataHandler.getCardsByBoardId(boardId);
            let orderForThisBoardAndDroppedToStatus = [];
            for (let cardForThisBoard of cardsForThisBoard) {
                if (cardForThisBoard.status_id === status.id) {
                    orderForThisBoardAndDroppedToStatus.push(cardForThisBoard.order_num);
                }
            }

            let maxOrderForThisBoardAndStatus = Math.max(...orderForThisBoardAndDroppedToStatus);

            if (sibling === null) {

                if (orderForThisBoardAndDroppedToStatus.length > 0) {
                    card.order_num = maxOrderForThisBoardAndStatus + 1;
                } else {
                    card.order_num = 1;
                }
            } else {
                let droppedBeforeCardId = Number(sibling.id.replace("card", ""));
                let droppedBeforeCard = dataHandler.getCard(droppedBeforeCardId);
                if (droppedBeforeCard.order_num === 1) {
                    for (let cardForThisBoard of cardsForThisBoard) {
                        if (cardForThisBoard.status_id === status.id && cardForThisBoard.id !== card.id) {
                            cardForThisBoard.order_num++;
                        }
                    }
                    card.order_num = 1;
                } else {
                    card.order_num = droppedBeforeCard.order_num;
                    for (let cardForThisBoard of cardsForThisBoard) {
                        if (cardForThisBoard.status_id === status.id && cardForThisBoard.id !== card.id) {
                            if (cardForThisBoard.order_num >= card.order_num) {
                                cardForThisBoard.order_num++;
                            }

                        }
                    }
                }
            }

            let draggedFrom = source;
            let draggedFromCards = draggedFrom.getElementsByClassName("card new");

            if (draggedFromCards.length > 0) {
                for (let draggedFromCard of draggedFromCards) {
                    cardId = Number(draggedFromCard.id.replace("card", ""));
                    let oldCard = dataHandler.getCard(cardId);
                    oldCard.order_num ++;
                }
            }

            card.status_id = status.id;
            dataHandler._saveData("cards", card, dom.showBoards);
        });
    },

    initBoards: function (board, boardsDiv) {
         let htmlForBoard = htmlStrings.initBoard(board);
            boardsDiv.insertAdjacentHTML("beforeend", htmlForBoard);

            let boardDiv = document.getElementById("board" + board.id);
            let htmlForDetail = htmlStrings.initDetails(board);
            boardDiv.insertAdjacentHTML("beforeend", htmlForDetail);

            let statuses = dataHandler.getStatuses();
            for(let status of statuses){
                let boardDivDetail = document.getElementById("boarddetail" + board.id);
                let htmlForStatus = htmlStrings.initStatusCard(status, board);
                boardDivDetail.insertAdjacentHTML("beforeend", htmlForStatus);
                if(status.name === "New") {
                    let newStatusDiv = document.getElementById("statusNew" + board.id + "span");
                    newStatusDiv.insertAdjacentHTML("beforeend", htmlStrings.initNewCardButton(board));
                }

                let cards = dataHandler.getCardsByBoardId(board.id);
                let boardDivDetailContainer = document.getElementById("board" + board.id + "-" + status.name);
                for(let card of cards){
                    if(card.status_id === status.id){
                        let htmlForCard = htmlStrings.initCard(card);
                        boardDivDetailContainer.insertAdjacentHTML("beforeend", htmlForCard);
                        dom.addEventListenerToDeleteCardButton(card.id);
                    }
                }
            }

            let cardContainerListForBoard = [];
            let dragulaContainersForBoard = document.getElementsByClassName('dragula-container');
            for (let container of dragulaContainersForBoard) {
                if (Number(container.dataset.board) === board.id){
                    cardContainerListForBoard.push(container)
                }
            }
            let drake = drag.addDragNDrop(cardContainerListForBoard);
            dom.handleCardDrop(drake);
            dom.addEventlistenerToSaveNewCard(board.id);
            dom.addEventListenerToDeleteBoardButton(board.id)
    },

    addEventlistenerToSingleBoard: function (boardid) {

        let detailForBoard = document.getElementById("boardspan" + boardid);
        detailForBoard.addEventListener("click", function () {
            let boardDetail = document.getElementById("boarddetail" + boardid);
            if (boardDetail.hasAttribute("hidden")) {
                boardDetail.removeAttribute("hidden");
            } else {
                boardDetail.setAttribute("hidden", true)
            }


        })
    },


    addEventlistenerToSingleCard: function (cardid) {
        let editableCard = document.getElementById("cardEdit" + cardid);
        editableCard.addEventListener("click", dom.handleClickOnEditCardTitle)

    },

    addEventListenerToEditSingleBoardTitle: function (boardid) {
        let editableBoard = document.getElementById("edit" + boardid);
        editableBoard.addEventListener("click", dom.handleClickOnEditBoardTitle)

    },

    loginScreen: function (message) {
        let boardsDiv = document.getElementById("boards");
        boardsDiv.classList.remove("loader");
        boardsDiv.innerHTML = "";

        if (message){
            let messageContent = document.getElementById("logout-message");
            debugger;
            messageContent.innerHTML = message;
        }

        let htmlForLogin = htmlStrings.initLoginScreen();
        boardsDiv.insertAdjacentHTML("beforeend", htmlForLogin);

        document.getElementById("login_button").addEventListener("click", function(){
            let userToLogIn = document.getElementById("user_name").value;
            let passwordToLogIn = document.getElementById("password").value;
            boardsDiv.innerHTML="";
            boardsDiv.classList.add("loader");
            dataHandler._loginUser({'user':userToLogIn, 'password':passwordToLogIn})
        })
    },

    addEventListenerToDeleteBoardButton: function (boardId) {
        let deleteBoardButton = document.getElementById('delete_board' + boardId);
        deleteBoardButton.addEventListener('click', function () {
            let deletedBoard = document.getElementById('board' + boardId);
            deletedBoard.setAttribute("hidden", true);
            dataHandler.changeBoardStatusToInactive(boardId)
        })
    },

    addEventListenerToDeleteCardButton: function (cardId) {
        let deleteCardButton = document.getElementById('cardDelete' + cardId);
        deleteCardButton.addEventListener('click', function () {
            let deletedCard = document.getElementById('card' + cardId);
            deletedCard.setAttribute("hidden", true);
            dataHandler.changeCardStatusToInactive(cardId)
        })
    }
};
