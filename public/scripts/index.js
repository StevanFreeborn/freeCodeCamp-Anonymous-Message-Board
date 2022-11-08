$(async () => {
    const boardsContainer = $('#boards-container');
    const boards = await getBoards();
    boards.forEach(board => {
        const element = createBoardCard(board);
        boardsContainer.append(element);
    })
});

const getBoards = async () => {
    return await $.ajax({ 
        type: 'GET',
        url: '/api/boards',
    });
}

const createBoardCard = (board) => {
    return `<div class="col-md-6">
                <div class="card text-white bg-success">
                    <div class="card-header">${board.name}</div>
                    <div class="card-body">
                        <p class="card-text">
                            Id: ${board._id}
                        </p>
                        <p class="card-text">
                            Created: ${formatDate(board.created_on)}
                        </p>
                        <p class="card-text">
                            Updated: ${formatDate(board.bumped_on)}
                        </p>
                    </div>
                </div>
            </div>`
}

const formatDate = (date) => {
    const dateToFormat = new Date(date);
    const dateString = dateToFormat.toLocaleDateString();
    const timeString = dateToFormat.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit'});
    return `${dateString} ${timeString}`;
}