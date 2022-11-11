$(function () {
  $('#add-thread-form').submit(addThread);

  $('#add-thread-board').on('input', e => {
    $('#add-thread-board-error').text('');
  });

  $('#add-thread-text').on('input', e => {
    $('#add-thread-text-error').text('');
  });

  $('#add-thread-delete-password').on('input', e => {
    $('#add-thread-delete-password-error').text('');
  });

  $('#newReply').submit(function () {
    var board = $('#board4').val();
    $(this).attr('action', '/api/replies/' + board);
  });

  $('#report-thread-form').submit(reportThread);

  $('#report-thread-board').on('input', e => {
    $('#report-thread-board-error').text('');
  });

  $('#report-thread-id').on('input', e => {
    $('#report-thread-id-error').text('');
  });

  $('#deleteThread').submit(function (e) {
    var url = '/api/threads/' + $('#board3').val();
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

  $('#reportReply').submit(function (e) {
    var url = '/api/replies/' + $('#board5').val();
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
  
  $('#deleteReply').submit(function (e) {
    var url = '/api/replies/' + $('#board6').val();
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

const addThread = e => {
  e.preventDefault();
  const data = formDataToJson($(e.target).serializeArray());
  const hasBoard = data?.board ? true : false;
  const hasText = data?.text ? true : false;
  const hasDeletePassword = data?.delete_password ? true : false;

  if (!hasBoard || !hasText || !hasDeletePassword) {
    if (!hasBoard) {
      $('#add-thread-board-error').text('Please enter a board');
    }

    if (!hasText) {
      $('#add-thread-text-error').text('Please enter thread text');
    }

    if (!hasDeletePassword) {
      $('#add-thread-delete-password-error').text(
        'Please enter a delete password'
      );
    }

    return;
  }

  $.ajax({
    type: 'POST',
    url: `/api/threads/${data.board}`,
    data: data,
    success: thread => {
      displayResponse($('#new-thread-response'), thread);
    },
    error: (res, err) => {
      displayResponse($('#new-thread-response'), res.responseJSON);
    },
  });
};

const reportThread = e => {
  e.preventDefault();
  const data = formDataToJson($(e.target).serializeArray());
  const hasBoard = data?.board ? true : false;
  const hasThreadId = data?.thread_id ? true : false;

  if (!hasBoard || !hasThreadId) {
    if (!hasBoard) {
      $('#report-thread-board-error').text('Please enter a board');
    }

    if (!hasThreadId) {
      $('#report-thread-id-error').text('Please enter thread id');
    }

    return;
  }

  $.ajax({
    type: 'PUT',
    url: `/api/threads/${data.board}`,
    data: data,
    success: res => {
      displayResponse($('#report-thread-response'), res);
    },
    error: (res, err) => {
      displayResponse($('#report-thread-response'), res.responseText);
    },
  });
};

const formDataToJson = formData => {
  return formData.reduce((prev, curr) => {
    prev[curr.name] = curr.value;
    return prev;
  }, {});
};

const displayResponse = (jObj, response) => {
  jObj.text(JSON.stringify(response, null, 4));
  hljs.highlightAll();
};
