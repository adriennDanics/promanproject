// It uses data_handler.js to visualize elements
dom = {
    loadBoards: function() {
        dataHandler.init();
        dataHandler.getBoards(this.showBoards);
        this.newBoardAddEventListener();
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
            newDivForBoard.classList.add("row", "card", "bg-info");
            boardDiv.appendChild(newDivForBoard);
            let newButton = document.createElement("i");
            newButton.classList.add("fas", "fa-angle-down");
            newDivForBoard.appendChild(newButton);
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
    newBoardAddEventListener: function () {
        document.getElementById("new_board_button").addEventListener("click", function () {
            let elementToDelete = document.getElementById("new_board_text");
            elementToDelete.parentElement.removeChild(elementToDelete);
            let newBoardInput = document.createElement("input");
            newBoardInput.classList.add("form-control");
            newBoardInput.setAttribute("id", "new_board_input_field");
            document.getElementById("new_board_box").appendChild(newBoardInput);
            let saveNewBoardButton = document.createElement("button");
            saveNewBoardButton.classList.add("btn", "btn-outline-info");
            saveNewBoardButton.setAttribute("id", "save_new_board_button");
            saveNewBoardButton.innerHTML = "Save Board";
            document.getElementById("new_board_box").appendChild(saveNewBoardButton);
            document.getElementById("save_new_board_button").addEventListener("click", function () {
            let newBoardTitle = document.getElementById("new_board_input_field").value;
            dataHandler.createNewBoard(newBoardTitle, this.showBoards)
        });
        });
    },
    
    //saveBoardAddEventListener: function () {
        //document.getElementById("save_new_board_button").addEventListener("click", function () {
            //let newBoardTitle = document.getElementById("new_board_input_field").value;
            //dataHandler.createNewBoard(newBoardTitle, this.loadBoards())
        //})
    //},
};
