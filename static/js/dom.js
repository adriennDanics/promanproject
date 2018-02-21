// It uses data_handler.js to visualize elements
dom = {
    loadBoards: function() {
        dataHandler.sortCardsInBoardsByOrder();
        dataHandler.sortCardsInBoardsByStatus();
        dataHandler.getBoards(dom.showBoards);
        dataHandler.getTheme(themes.themeHandler);
        dom.addEventListenerToNewBoardIcon();
        dom.addEventListenerToSaveNewBoardButton();
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

        /*for(let i=0; i<numberOfBoards; i++){
            let newDivForBoard = document.createElement("div");
            newDivForBoard.innerHTML = boards[i].title;
            newDivForBoard.classList.add("row", "card", "bg-light", "container");
            newDivForBoard.setAttribute("id", "board"+boards[i].id);
            boardsDiv.appendChild(newDivForBoard);

            let detailButton = document.createElement("i");
            detailButton.classList.add("fas", "fa-angle-down");
            detailButton.setAttribute("id", "detail"+boards[i].id);
            newDivForBoard.appendChild(detailButton);

            let closeDetailButton = document.createElement("i");
            closeDetailButton.classList.add("fas", "fa-angle-up");
            closeDetailButton.setAttribute("id", "closedetail"+boards[i].id);
            closeDetailButton.setAttribute("hidden", true);
            newDivForBoard.appendChild(closeDetailButton);

            let editButton = document.createElement("i");
            editButton.classList.add("far", "fa-edit");
            editButton.setAttribute("id", "edit"+boards[i].id);
            newDivForBoard.appendChild(editButton);

            let newDivForBoardDetails = document.createElement("div");
            newDivForBoardDetails.classList.add("row", "bg-info");
            newDivForBoardDetails.setAttribute("id", "boarddetail" + boards[i].id);
            newDivForBoardDetails.setAttribute("hidden", true);
            newDivForBoard.appendChild(newDivForBoardDetails);

            let newButtonForAddCard = document.createElement("button");
            newButtonForAddCard.classList.add("fas", "fa-plus", "card");
            newButtonForAddCard.setAttribute("id", "newboardcard" + boards[i].id);
            newButtonForAddCard.setAttribute("hidden", true);
            newDivForBoard.appendChild(newButtonForAddCard);

            let statuses = dataHandler.getStatuses();
            for (let j = 0; j < statuses.length; j++) {
                let newStatusColumn = document.createElement("div");
                newStatusColumn.classList.add("col", "bg-secondary");
                newDivForBoardDetails.appendChild(newStatusColumn);

                let newDivForCardsContainer = document.createElement("div");
                newDivForCardsContainer.classList.add("dragula-container");
                newDivForCardsContainer.setAttribute("id", "board"+boards[i].id+"-"+statuses[j].name);
                newStatusColumn.appendChild(newDivForCardsContainer);

                let newDivForCardsContainerStatus = document.createElement("div");
                newDivForCardsContainerStatus.classList.add("status");
                newDivForCardsContainerStatus.setAttribute("id", "status" + statuses[j].name);
                newDivForCardsContainerStatus.innerHTML = statuses[j].name;
                newDivForCardsContainer.appendChild(newDivForCardsContainerStatus);

                let cardsByBoardId = dataHandler.getCardsByBoardId(boards[i].id);
                for (let k = 0; k < cardsByBoardId.length; k++) {
                    if (cardsByBoardId[k].status_id === statuses[j].id) {
                        let newDivForCards = document.createElement("div");
                        newDivForCards.classList.add("card", "new");
                        newDivForCards.setAttribute("id", "card" + cardsByBoardId[k].id);
                        newDivForCards.innerHTML = cardsByBoardId[k].title;
                        newDivForCardsContainer.appendChild(newDivForCards);

                        let newDivForCardEdit = document.createElement("i");
                        newDivForCardEdit.classList.add("fas", "fa-edit", "forcards");
                        newDivForCardEdit.setAttribute("id", "cardEdit" + cardsByBoardId[k].id);
                        newDivForCards.appendChild(newDivForCardEdit)
                    }
                }
            }*/


    loadCards: function(boardId) {
        // retrieves cards and makes showCards called
    },
    showCards: function(cards) {
        // shows the cards of a board
        // it adds necessary event listeners also
    },
    // here comes more features
    addEventListenerToNewBoardIcon: function () {
        document.getElementById("new_board_icon").addEventListener("click",this.handleClickOnNewBoardIcon)
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
        let editableCard = document.getElementsByClassName("fas fa-edit");
        for( let i = 0; i < editableCard.length; i++){
            editableCard[i].addEventListener("click", this.handleClickOnEditCardTitle)
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
        let newBoardText = document.getElementById("new_board_text");
        newBoardText.removeAttribute("hidden");

        let newBoardInput = document.getElementById("new_board_input_field");
        newBoardInput.setAttribute("hidden", true);

        let saveNewBoardButton = document.getElementById("save_new_board_button");
        saveNewBoardButton.setAttribute("hidden", true);

        let newBoardTitle = document.getElementById("new_board_input_field").value;
        dataHandler.createNewBoard(newBoardTitle);

        dom.loadBoards();
    },

    addEventListenerToBoardDetailButton: function () {
        let detailForBoards = document.getElementsByClassName("boards");
        for (let detailForBoard of detailForBoards) {
            detailForBoard.addEventListener("click", function () {

                let detailButtonId = detailForBoard.id;
                let boardDetail = document.getElementById("boarddetail" + detailButtonId.replace("board",""));
                if(boardDetail.hasAttribute("hidden")) {
                    boardDetail.removeAttribute("hidden");
                } else {
                    boardDetail.setAttribute("hidden", true)
                }

                let newCardButtonId = document.getElementById("newboardcard" + detailButtonId.replace("board",""));
                newCardButtonId.removeAttribute("hidden");
                newCardButtonId.addEventListener("click", function () {
                    newCardButtonId.setAttribute("hidden", true);

                    let textBoxForNewCard = document.createElement("input");
                    textBoxForNewCard.classList.add("form-control", "card");
                    textBoxForNewCard.setAttribute("placeholder", "New Card Title");
                    newCardButtonId.parentElement.appendChild(textBoxForNewCard);

                    let saveButtonForNewCard = document.createElement("button");
                    saveButtonForNewCard.classList.add("btn");
                    saveButtonForNewCard.innerText= "Save";

                    newCardButtonId.parentElement.appendChild(saveButtonForNewCard);
                    saveButtonForNewCard.addEventListener("click", function (){
                        let newCardTitleGiven = textBoxForNewCard.value;
                        dataHandler.createNewCard(newCardTitleGiven, detailButtonId.replace("board",""), 1);
                        location.reload()
                    }, false)
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
            dataHandler.editBoardTitle(newBoardTitle, boardID);
            document.getElementById(boardElementID).innerHTML = newBoardTitle;

            
            dom.loadBoards();

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
        let editCardTitleinput = document.createElement("input");

        this.parentElement.appendChild(editCardTitleinput);
        editCardTitleinput.setAttribute("placeholder", "New card title");
        editCardTitleinput.setAttribute("type", "text");
        editCardTitleinput.setAttribute("id", "edit-card-input-field" + cardID);
        editCardTitleinput.setAttribute("class", "form-control");

        let saveEditButton = document.createElement("button");
        this.parentElement.appendChild(saveEditButton);
        saveEditButton.setAttribute("class", "btn");
        saveEditButton.innerHTML = "Save";

        saveEditButton.addEventListener("click", function () {

            let newCardTitle = document.getElementById("edit-card-input-field"+cardID).value;
            dataHandler.editCardTitle(newCardTitle, cardID);
            document.getElementById(cardElementID).innerHTML = newCardTitle;

            let Card = document.getElementById(cardElementID);
            let newiForCardEdit = document.createElement("i");
                newiForCardEdit.classList.add("fas", "fa-edit", "forcards");
                newiForCardEdit.setAttribute("id", "cardEdit" + cardID);
                Card.appendChild(newiForCardEdit);
                dom.addEventListenerToEditCardTitle();
        });
    },

    handleCardDrop: function (drake) {
        drake.on('drop', function(el, target, source, sibling) {
            let cardId = Number(el.id.replace("card", ""));
            let card = dataHandler.getCard(cardId);
            let statusName = target.dataset.status
            let status = dataHandler.getStatusIDByName(statusName);

            let boardId = card.board_id;
            let cardsForThisBoard = dataHandler.getCardsByBoardId(boardId);
            let orderForThisBoardAndDroppedToStatus = [];
            for (let i = 0; i < cardsForThisBoard.length; i++) {
                if (cardsForThisBoard[i].status_id === status.id) {
                    orderForThisBoardAndDroppedToStatus.push(cardsForThisBoard[i].order_num);
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
                    for (let i = 0; i < cardsForThisBoard.length; i++) {
                        if (cardsForThisBoard[i].status_id === status.id && cardsForThisBoard[i].id !== card.id) {
                            cardsForThisBoard[i].order_num++;
                        }
                    }
                    card.order_num = 1;
                } else {
                    card.order_num = droppedBeforeCard.order_num;
                    for (let i = 0; i < cardsForThisBoard.length; i++) {
                        if (cardsForThisBoard[i].status_id === status.id && cardsForThisBoard[i].id !== card.id) {
                            if (cardsForThisBoard[i].order_num >= card.order_num) {
                                cardsForThisBoard[i].order_num++;
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
                    oldCard.order_num = i + 1;
                }
            }

            card.status_id = status.id;
            dataHandler._saveData("cards", card);
        });
    }
};
