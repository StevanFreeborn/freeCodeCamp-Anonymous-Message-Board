$(function () {
  const currentBoard = window.location.pathname.slice(3);
  const url = '/api/threads/' + currentBoard;

  $('#board-name').text(currentBoard);

  $.ajax({
    type: 'GET',
    url: url,
    success: data => {},
    error: (res, err) => {},
  });

  $('#newThread').submit(function () {
    $(this).attr('action', '/api/threads/' + currentBoard);
  });

  $('#boardDisplay').on('submit', '#reportThread', function (e) {
    var url = '/api/threads/' + currentBoard;
    $.ajax({
      type: 'PUT',
      url: url,
      data: $(this).serialize(),
      success: function (data) {
        alert(data);
      },
    });
    e.preventDefault();
  });
  $('#boardDisplay').on('submit', '#reportReply', function (e) {
    var url = '/api/replies/' + currentBoard;
    $.ajax({
      type: 'PUT',
      url: url,
      data: $(this).serialize(),
      success: function (data) {
        alert(data);
      },
    });
    e.preventDefault();
  });
  $('#boardDisplay').on('submit', '#deleteThread', function (e) {
    var url = '/api/threads/' + currentBoard;
    $.ajax({
      type: 'DELETE',
      url: url,
      data: $(this).serialize(),
      success: function (data) {
        alert(data);
      },
    });
    e.preventDefault();
  });
  $('#boardDisplay').on('submit', '#deleteReply', function (e) {
    var url = '/api/replies/' + currentBoard;
    $.ajax({
      type: 'DELETE',
      url: url,
      data: $(this).serialize(),
      success: function (data) {
        alert(data);
      },
    });
    e.preventDefault();
  });
});
