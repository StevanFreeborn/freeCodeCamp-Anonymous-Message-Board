import createBoardCard from './components/boardCard.js';

$(async () => {
  await displayBoards();

  $('#add-board-form').submit(e => {
    e.preventDefault();

    const boardName = $('#board-name').val();

    if (!boardName)
      return $('#add-board-error').text('Please provide a name for the board');

    $.ajax({
      type: 'POST',
      url: '/api/boards',
      data: { name: boardName },
      success: board => {
        $('#add-board-form')[0].reset();
        addBoard(board);
      },
      error: (res, err) => {
        const error = res.responseJSON?.error ?? 'Failed to add board';
        $('#add-board-error').text(error);
      },
    });
  });

  $('#board-name').on('input', e => {
    $('#add-board-error').text('');
  });
});

const displayBoards = async () => {
  const boards = await getBoards();
  boards.forEach(board => {
    const boardCard = createBoardCard(board);
    $('#boards-container').append(boardCard);
  });
};

const addBoard = board => {
  const boardCard = createBoardCard(board);
  $('#boards-container').prepend(boardCard);
};

const getBoards = async () => {
  return await $.ajax({
    type: 'GET',
    url: '/api/boards',
  });
};
