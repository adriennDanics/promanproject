htmlStrings = {
    valami: function (board) {
        return `<div class="row card bg-light container" id="board${board.id}">
                    <button class="fas fa-plus card" id="newboardcard${board.id}" hidden="true">Add New Card At New Status</button>
                    <span>${board.title}</span>
                    <i class="far fa-edit" id="edit${board.id}"></i>             
                </div>`
    }
}