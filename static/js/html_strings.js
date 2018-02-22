htmlStrings = {
    initBoard: function (board) {
        return `<div class="row card bg-light container" id="board${board.id}">
                    <span class="boards" id="boardspan${board.id}">${board.title}</span>
                    <span>
                        <button type="button" class="titleEditButton" id="edit${board.id}">
                            <i class="far fa-edit"></i>
                        </button> 
                        <button type="button" class="titleDeleteButton" id="delete_board${board.id}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </span> 
                    <input class="form-control" hidden="true" value="${board.title}" type="text" id="edit-input-field${board.id}">
                    <button hidden="true" class="btn" id="edit-input-button${board.id}">Save</button>        
                </div>`
    },
    initDetails: function (board) {
        return `<div class="row bg-info" id="boarddetail${board.id}" hidden="true">
                
                </div>`
    },
    initStatusCard: function (status, board) {
        return`<div class="col-sm bg-secondary">
                    <div class="dragula-container" id="board${board.id}-${status.name}" data-board="${board.id}" data-status="${status.name}">
                        <div class="status" id="status${status.name}${board.id}"> 
                            <span id="status${status.name}${board.id}span">${status.name}</span>
                        </div>
                    </div>
                </div>`
    },
    initCard: function (card) {
        return `<div class="card new" id="card${card.id}">
                    <span id="cardTitle${card.id}">${card.title}</span>
                    <span id="cardButton${card.id}">
                        <i class="fas fa-edit forcards" id="cardEdit${card.id}"></i>
                        <i class="fas fa-trash-alt" id="cardDelete${card.id}"></i>
                        
                    </span>
                    
                    <input class="form-control" id="edit-card-input${card.id}" value="${card.title}" type="text"  hidden required>
                    <button class="btn" id="edit-card-button${card.id}" hidden>Save</button>
                </div>`
    },
    initNewCardButton: function (board) {
        return `
                <i class="fas fa-plus" id="newboardcard${board.id}" hidden="true"></i>
                <input class="form-control" id="add-card-input${board.id}" placeholder="New Card" type="text" hidden>
                <button class="btn" id="add-card-button${board.id}" hidden>Save</button>
                <button class="btn" id="add-card-cancel${board.id}" hidden>Cancel</button>
                `
    },
    initLoginScreen: function () {
        return `<form class="card">
                <label for="user_name">Username</label>
                <input type="text" id="user_name" name="user_name" required><br>
                <label for="password">Password</label><br>
                <input type="password" id="password" name="password" required><br>
                <button type="button" class="btn" id="login_button">Login</button>
                <a class="btn" href="/register">Registration</a>`
    },
    initLogOutLink: function (user_id) {
        return `<h5>Hello, ${user_id}</h5>
                <a class="btn" href="/logout">Logout</a>`

    }
};