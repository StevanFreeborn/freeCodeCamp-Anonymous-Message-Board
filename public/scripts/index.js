$(async () => {
    await displayBoards();

    $('#add-board-form').submit(e => {
        e.preventDefault();

        const boardName = $('#board-name').val();

        if (!boardName) return $('#add-board-error').text('Please provide a name for the board');

        $.ajax({
            type: 'POST',
            url: '/api/boards',
            data: { name: boardName, },
            success: (board) => {
                $('#add-board-form')[0].reset();
                addBoardElement(board);
            },
            error: (res, err) => {
                const error = res.responseJSON?.error ?? 'Failed to add board';
                $('#add-board-error').text(error)
            },
        });
    });

    $('#board-name').on('input', e => {
        $('#add-board-error').text('');
    })
});

const displayBoards = async () => {
    const boards = await getBoards();
    boards.forEach(board => {
        const element = createBoardCard(board);
        $('#boards-container').append(element);
    });
}

const addBoardElement = (board) => {
    const element = createBoardCard(board);
    $('#boards-container').prepend(element);
}

const getBoards = async () => {
    return await $.ajax({ 
        type: 'GET',
        url: '/api/boards',
    });
}

const createBoardCard = (board) => {
    return `<div class="col-md-6">
                <div class="card text-white bg-success">
                    <div class="card-header">
                        <a href="/b/${board.name}" class="link-primary fw-bold fs-5">${board.name}</a>
                    </div>
                    <div class="card-body">
                        <p class="card-text">
                            <span class="fw-bold">Id:</span> ${board._id}
                        </p>
                        <p class="card-text">
                            <span class="fw-bold">Created:</span> ${formatDate(board.created_on)}
                        </p>
                        <p class="card-text">
                            <span class="fw-bold">Updated:</span> ${formatDate(board.bumped_on)}
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