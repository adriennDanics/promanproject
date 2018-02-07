// It uses data_handler.js to visualize elements
dom = {
    loadBoards: function() {
        dataHandler.init();
        dataHandler.getBoards(this.showBoards);
        this.addEventListenerToNewBoardIcon();
        this.addEventListenerToSaveNewBoardButton();
        this.addEventListenerToEditBoardTitle();
        this.addEventListenerToBoardDetailButton();
        this.addEventListenerToCloseBoardDetailButton();
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
            newDivForBoard.classList.add("row", "card", "bg-info", "container");
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
};
