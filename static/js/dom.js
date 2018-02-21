// It uses data_handler.js to visualize elements
dom = {
    loadBoards: function() {
        dataHandler.init();
        dataHandler.sortCardsInBoardsByOrder();
        dataHandler.sortCardsInBoardsByStatus();
        dataHandler.getBoards(dom.showBoards);
        dataHandler.getTheme(themes.themeHandler);
        this.addEventListenerToNewBoardIcon();
        this.addEventListenerToSaveNewBoardButton();
        this.addEventListenerToBoardDetailButton();
        this.addEventListenerToCloseBoardDetailButton();
        this.addEventListenerToEditCardTitle();
        this.addEventListenerToEditBoardTitle();
        themes.addEventListenerForDarkTheme();
        themes.addEventListenerForFunTheme();
        // retrieves boards and makes showBoards called
    },
    showBoards: function(boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        let numberOfBoards = boards.length;

        let boardsDiv = document.getElementById("boards");
        boardsDiv.innerHTML = "";

        for (let board of boards) {

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
        document.getElementById("new_board_clickable_area").addEventListener("click",this.handleClickOnNewBoardIcon)
    },

    addEventListenerToSaveNewBoardButton: function () {
        document.getElementById("save_new_board_button").addEventListener("click", this.handleClickOnSaveNewBoardButton)
    },

    addEventListenerToEditBoardTitle: function () {
        let editableBoard = document.getElementsByClassName("titleEditButton");
        for(let i=0; i<editableBoard.length; i++){
            editableBoard[i].addEventListener("click", this.handleClickOnEditBoardTitle)
        }
    },

    addEventListenerToEditCardTitle: function () {
        let editableCards = document.getElementsByClassName("fas fa-edit");
        for(let editableCard of editableCards){
            editableCard.addEventListener("click", dom.handleClickOnEditCardTitle)
        }

    },

    handleClickOnNewBoardIcon: function () {
        document.getElementById("new_board_input_field").value = "";

        let newBoardText = document.getElementById("new_board_text");
        newBoardText.setAttribute("hidden", true);

        let newBoardInput = document.getElementById("new_board_input_field");
        newBoardInput.removeAttribute("hidden");

        let saveNewBoardButton = document.getElementById("save_new_board_button");
        saveNewBoardButton.removeAttribute("hidden");
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

            dataHandler.createNewBoard(newBoardTitle);

            dom.loadBoards();
        }

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

                let newCardButtonId = document.getElementById("newboardcard" + detailButtonId.replace("boardspan",""));
                newCardButtonId.removeAttribute("hidden");

                newCardButtonId.addEventListener("click", function () {
                    newCardButtonId.setAttribute("hidden", true);
                    let saveButtonForNewCard = document.getElementById("add-card-button" + detailButtonId.replace("boardspan",""));
                    let textBoxForNewCard = document.getElementById("add-card-input" + detailButtonId.replace("boardspan",""));
                    let cancelButtonForNewCard = document.getElementById("add-card-cancel" + detailButtonId.replace("boardspan",""));
                    if(saveButtonForNewCard.hasAttribute("hidden") && textBoxForNewCard.hasAttribute("hidden")
                                                                    && cancelButtonForNewCard.hasAttribute("hidden")) {
                        saveButtonForNewCard.removeAttribute("hidden");
                        textBoxForNewCard.removeAttribute("hidden");
                        cancelButtonForNewCard.removeAttribute("hidden")
                    } else {
                        saveButtonForNewCard.setAttribute("hidden", true);
                        textBoxForNewCard.setAttribute("hidden", true);
                        cancelButtonForNewCard.setAttribute("hidden", true)

                    }

                    saveButtonForNewCard.addEventListener("click", function (){
                        let newCardTitleGiven = textBoxForNewCard.value;
                        if(newCardTitleGiven.length !== 0) {
                            let newCard = dataHandler.createNewCard(newCardTitleGiven, detailButtonId.replace("boardspan", ""), 1);
                            let boardDivDetailContainer = document.getElementById("board" + newCard.board_id + "-New");
                            boardDivDetailContainer.insertAdjacentHTML("beforeend", htmlStrings.initCard(newCard))
                            saveButtonForNewCard.setAttribute("hidden", true);
                            textBoxForNewCard.setAttribute("hidden", true);
                            cancelButtonForNewCard.setAttribute("hidden", true);
                            newCardButtonId.removeAttribute("hidden");
                        }
                    }, false);
                    
                    cancelButtonForNewCard.addEventListener("click", function () {
                        saveButtonForNewCard.setAttribute("hidden", true);
                        textBoxForNewCard.setAttribute("hidden", true);
                        cancelButtonForNewCard.setAttribute("hidden", true);
                        newCardButtonId.removeAttribute("hidden");
                    })
                    
                }, false)
            });
        }
    },

    handleClickOnEditBoardTitle: function () {
        let boardElementID = this.parentElement.getAttribute("id");
        let boardID = Number(boardElementID.replace("board", ""));

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
        for (let i = 0; i < closeDetailButtons.length; i++) {
            closeDetailButtons[i].addEventListener("click", function () {
                let closeDetailButtonId = closeDetailButtons[i].id;
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
        let cardID = Number(cardElementID.replace("card", ""));

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
            for (let i = 0; i < cardsForThisBoard.length; i++) {
                if (cardsForThisBoard[i].status_id === status.id) {
                    orderForThisBoardAndDroppedToStatus.push(cardsForThisBoard[i].order);
                }
            }

            let maxOrderForThisBoardAndStatus = Math.max(...orderForThisBoardAndDroppedToStatus);

            if (sibling === null) {

                if (orderForThisBoardAndDroppedToStatus.length > 0) {
                    card.order = maxOrderForThisBoardAndStatus + 1;
                } else {
                    card.order = 1;
                }
            } else {
                let droppedBeforeCardId = Number(sibling.id.replace("card", ""));
                let droppedBeforeCard = dataHandler.getCard(droppedBeforeCardId);
                if (droppedBeforeCard.order === 1) {
                    for (let i = 0; i < cardsForThisBoard.length; i++) {
                        if (cardsForThisBoard[i].status_id === status.id && cardsForThisBoard[i].id !== card.id) {
                            cardsForThisBoard[i].order++;
                        }
                    }
                    card.order = 1;
                } else {
                    card.order = droppedBeforeCard.order;
                    for (let i = 0; i < cardsForThisBoard.length; i++) {
                        if (cardsForThisBoard[i].status_id === status.id && cardsForThisBoard[i].id !== card.id) {
                            if (cardsForThisBoard[i].order >= card.order) {
                                cardsForThisBoard[i].order++;
                            }

                        }
                    }
                }
            }

            let draggedFrom = source;
            let draggedFromCards = draggedFrom.getElementsByClassName("card new");

            if (draggedFromCards.length > 0) {
                for (let i = 0; i < draggedFromCards.length; i++) {
                    cardId = Number(draggedFromCards[i].id.replace("card", ""));
                    let oldCard = dataHandler.getCard(cardId);
                    oldCard.order = i + 1;
                }
            }

            card.status_id = status.id;
            dataHandler._saveData();
        });
    }
};
