// It uses data_handler.js to visualize elements
dom = {
    loadBoards: function() {
        dataHandler.init();
        dataHandler.sortCardsInBoards();
        dataHandler.getBoards(this.showBoards);
        dataHandler.getTheme(this.themeHandler);
        this.addEventListenerToNewBoardIcon();
        this.addEventListenerToSaveNewBoardButton();
        this.addEventListenerToBoardDetailButton();
        this.addEventListenerToCloseBoardDetailButton();
        this.addEventListenerToEditCardTitle();
        this.addEventListenerToEditBoardTitle();
        this.addEventListenerForDarkTheme();
        // retrieves boards and makes showBoards called
    },
    showBoards: function(boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        let numberOfBoards = boards.length;

        let boardDiv = document.getElementById("boards");
        boardDiv.innerHTML = "";

        for(let i=0; i<numberOfBoards; i++){
            let newDivForBoard = document.createElement("div");
            newDivForBoard.innerHTML = boards[i].title;
            newDivForBoard.classList.add("row", "card", "bg-light", "container");
            newDivForBoard.setAttribute("id", "board"+boards[i].id);
            boardDiv.appendChild(newDivForBoard);

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
            }

            let cardContainerListForBoard = [];
            newDivForBoardDetails.childNodes;
            for (let l = 0; l < newDivForBoardDetails.childNodes.length; l++) {
                cardContainerListForBoard.push(newDivForBoardDetails.childNodes[l].firstChild)
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
        document.getElementById("new_board_icon").addEventListener("click",this.handleClickOnNewBoardIcon)
    },

    addEventListenerToSaveNewBoardButton: function () {
        document.getElementById("save_new_board_button").addEventListener("click", this.handleClickOnSaveNewBoardButton)
    },

    addEventListenerToEditBoardTitle: function () {
        let editableBoard = document.getElementsByClassName("far fa-edit");
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


    addEventListenerForDarkTheme: function (){
        document.getElementById("dark-theme").addEventListener("click", this.handleEventListenerForDarkTheme, false)
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

        location.reload();
    },

    addEventListenerToBoardDetailButton: function () {
        let detailButtons = document.getElementsByClassName("fas fa-angle-down");
        for (let i = 0; i < detailButtons.length; i++) {
            detailButtons[i].addEventListener("click", function () {

                let detailButtonId = detailButtons[i].id;
                document.getElementById(detailButtonId).setAttribute("hidden", true);

                let closeDetailButton = document.getElementById("closedetail" + detailButtonId.replace("detail",""));
                closeDetailButton.removeAttribute("hidden");

                let boardDetail = document.getElementById("boarddetail" + detailButtonId.replace("detail",""));
                boardDetail.removeAttribute("hidden");

                let newCardButtonId = document.getElementById("newboardcard" + detailButtonId.replace("detail",""));
                newCardButtonId.removeAttribute("hidden");
                newCardButtonId.innerText= "Add New Card At New Status";
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
                        dataHandler.createNewCard(newCardTitleGiven, detailButtonId.replace("detail",""), 1);
                        location.reload()
                    }, false)
                }, false)
                });
        }
    },

    handleClickOnEditBoardTitle: function () {
        let boardID = Number(this.parentElement.getAttribute("id").replace("board",""));
        let editTitleInput = document.createElement("input");
        this.parentElement.appendChild(editTitleInput);
        this.setAttribute("hidden", true);

        editTitleInput.setAttribute("placeholder", "New Title");
        editTitleInput.setAttribute("type", "text");
        editTitleInput.setAttribute("id", "edit-input-field"+boardID);
        editTitleInput.setAttribute("class", "form-control");

        let editSaveButton=document.createElement("button");
        this.parentElement.appendChild(editSaveButton);
        editSaveButton.setAttribute("class", "btn");
        editSaveButton.innerHTML="Save";

        editSaveButton.addEventListener("click", function() {
            let newBoardTitle = document.getElementById("edit-input-field"+boardID).value;
            dataHandler.editBoardTitle(newBoardTitle, boardID);
            location.reload();
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
    handleEventListenerForDarkTheme: function () {
        dataHandler.setTheme("dark");
        let lettersFas = document.getElementsByClassName("fas");
        for(let i=0;i<lettersFas.length;i++) {
            lettersFas[i].classList.add("dark")
        }
        let lettersFar = document.getElementsByClassName("far");
        for(let i=0;i<lettersFar.length;i++) {
            lettersFar[i].classList.add("dark")
        }
        let cardsClass = document.getElementsByClassName("card");
        for(let i=0;i<cardsClass.length;i++) {
            cardsClass[i].classList.add("dark")
        }
        let newBoardButton = document.getElementsByClassName("btn-outline-info");
        for(let i=0;i<newBoardButton.length;i++) {
            newBoardButton[i].classList.add("dark")
        }
        let header = document.getElementsByTagName("h1");
        for(let i=0;i<header.length;i++) {
            header[i].classList.add("dark")
        }
        let cardsForBoards = document.getElementsByClassName("row");
        for(let i=0;i<cardsForBoards.length;i++) {
            cardsForBoards[i].classList.remove("bg-light");
            cardsForBoards[i].classList.add("bg-dark")
        }
        let allDivs = document.getElementsByTagName("div");
        for(let i=0;i<allDivs.length;i++) {
            allDivs[i].classList.add("dark");
        }
        document.body.style.backgroundImage = "url('/static/css/almostblackground.jpg')";
        let darkThemeButton = document.getElementById("dark-theme");
        darkThemeButton.classList.add("bg-light");
        darkThemeButton.classList.remove("bg-dark");
        darkThemeButton.innerText="Light";
        darkThemeButton.addEventListener("click", function () {
            dataHandler.setTheme("light");
            dom.handleEventListenerForLightTheme();
        }, false)
    },
    handleEventListenerForLightTheme:function () {
        dataHandler.setTheme("light");
            let lettersFas = document.getElementsByClassName("fas");
            for(let i=0;i<lettersFas.length;i++) {
                lettersFas[i].classList.remove("dark")
            }
            let lettersFar = document.getElementsByClassName("far");
            for(let i=0;i<lettersFar.length;i++) {
                lettersFar[i].classList.remove("dark")
            }
            let cardsClass = document.getElementsByClassName("card");
            for(let i=0;i<cardsClass.length;i++) {
                cardsClass[i].classList.remove("dark")
            }
            let newBoardButton = document.getElementsByClassName("btn-outline-info");
            for(let i=0;i<newBoardButton.length;i++) {
                newBoardButton[i].classList.remove("dark")
            }
            let header = document.getElementsByTagName("h1");
            for(let i=0;i<header.length;i++) {
                header[i].classList.remove("dark")
            }
            let cardsForBoards = document.getElementsByClassName("row");
            for(let i=0;i<cardsForBoards.length;i++) {
                cardsForBoards[i].classList.add("bg-light");
                cardsForBoards[i].classList.remove("bg-dark")
            }
            let allDivs = document.getElementsByTagName("div");
            for(let i=0;i<allDivs.length;i++) {
                allDivs[i].classList.remove("dark");
            }
            document.body.style.backgroundImage = "url('/static/css/background.jpg')";
            let darkThemeButton = document.getElementById("dark-theme");
            darkThemeButton.classList.remove("bg-light");
            darkThemeButton.classList.add("bg-dark");
            darkThemeButton.innerText="Dark";
            darkThemeButton.addEventListener("click", function () {
                dataHandler.setTheme("dark");
                dom.handleEventListenerForDarkTheme();
            }, false)
    },
    themeHandler: function (theme) {
        if(theme === "dark") {
            dom.handleEventListenerForDarkTheme();
        } else {
            dom.handleEventListenerForLightTheme()
        }
    },

    handleClickOnEditCardTitle: function () {
        let cardID = Number(this.getAttribute("id").replace("cardEdit", ""));
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
            location.reload();
        });
    },

    handleCardDrop: function (drake) {
        drake.on('drop', function(el, target, source, sibling) {
            let cardId = Number(el.id.replace("card", ""));
            let card = dataHandler.getCard(cardId);
            let statusName = target.firstChild.id.replace("status","");
            let status = dataHandler.getStatusIDByName(statusName);
            card.status_id = status.id;

            dataHandler._saveData();

            if (sibling === null) {
                let boardId = card.board_id;
                let cardsForThisBoard = dataHandler.getCardsByBoardId(Number(boardId));
                let orderForThisBoard = [];
                for (let i = 0; i < cardsForThisBoard.length; i++) {
                    orderForThisBoard.push(cardsForThisBoard[i].order);
                }
                card.order = Math.max(...orderForThisBoard) + 1;
            } else {
                let droppedBeforeCardId = Number(sibling.id.replace("card", ""));
                let droppedBeforeCard = dataHandler.getCard(droppedBeforeCardId);
                card.order = droppedBeforeCard.id - 1;
            }

            dataHandler._saveData();
        });
    },
};
