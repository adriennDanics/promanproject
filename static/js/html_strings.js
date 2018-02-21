htmlStrings = {
    initBoard: function (board) {
        return `<div class="row card bg-light container" id="board${board.id}">
                    <span class="boards" id="board${board.id}">${board.title}</span>
                    <button type="button" class="titleEditButton" id="edit${board.id}">
                        <i class="far fa-edit" id="edit${board.id}"></i>
                    </button> 
                    <input class="form-control" hidden="true" placeholder="${board.title}" type="text" id="edit-input-field${board.id}">
                    <button hidden="true" class="btn" id="edit-input-button${board.id}">Save</button>        
                </div>`
    },
    initDetails: function (board) {
        return `<div class="row bg-info" id="boarddetail${board.id}" hidden="true">
                
                </div>`
    },
    initStatusCard: function (status, board) {
        return`<div class="col bg-secondary">
                    <div class="dragula-container" id="board${board.id}-${status.name}" data-board="${board.id}" data-status="${status.name}">
                        <div class="status" id="status${status.name}${board.id}"> 
                            <span id="status${status.name}${board.id}span">${status.name}</span>
                        </div>
                    </div>
                </div>`
    },
    initCard: function (card) {
        return `<div class="card new" id="card${card.id}">
                    <span>${card.title}</span>
                    <i class="fas fa-edit forcards" id="cardEdit${card.id}"></i>
                </div>`
    },
    initNewCardButton: function (board) {
        return `
                <i class="fas fa-plus" id="newboardcard${board.id}" hidden="true"></i>
                `
    }
};