// It uses data_handler.js to visualize elements
dom = {
    loadBoards: function() {
        dataHandler.init();
        dataHandler.getBoards(this.showBoards);
        dataHandler.getTheme(this.themeHandler);
        this.addEventListenerToNewBoardIcon();
        this.addEventListenerToSaveNewBoardButton();
        this.addEventListenerToBoardDetailButton();
        this.addEventListenerToCloseBoardDetailButton();
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
            newDivForBoardDetails.classList.add("row", "card", "bg-info");
            newDivForBoardDetails.setAttribute("id", "boarddetail" + boards[i].id);
            newDivForBoardDetails.setAttribute("hidden", true);
            newDivForBoard.appendChild(newDivForBoardDetails);
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
        let editableBoard = document.getElementsByClassName("fa-edit");
        for(let i=0; i<editableBoard.length; i++){
            editableBoard[i].addEventListener("click", this.handleClickOnEditBoardTitle)
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
        }, false);
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
        debugger;
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
            debugger;
            dom.handleEventListenerForDarkTheme();
        } else {
            debugger;
            dom.handleEventListenerForLightTheme()
        }
    },
};
