$(function () {
  // make containers collapse and expand
  $('.collapse-expand-button').click(handleExpandCollapse);

  // setup listeners for add thread form and inputs
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

  // setup listeners for report thread form and inputs
  $('#report-thread-form').submit(reportThread);

  $('#report-thread-board').on('input', e => {
    $('#report-thread-board-error').text('');
  });

  $('#report-thread-id').on('input', e => {
    $('#report-thread-id-error').text('');
  });

  // setup listeners for delete thread form and inputs
  $('#delete-thread-form').submit(deleteThread);

  $('#delete-thread-board').on('input', e => {
    $('#delete-thread-board-error').text('');
  });

  $('#delete-thread-id').on('input', e => {
    $('#delete-thread-id-error').text('');
  });

  $('#delete-thread-delete-password').on('input', e => {
    $('#delete-thread-delete-password-error').text('');
  });

  // setup listeners for add reply form and inputs
  $('#add-reply-form').submit(addReply);

  $('#add-reply-board').on('input', e => {
    $('#add-reply-board-error').text('');
  });

  $('#add-reply-thread-id').on('input', e => {
    $('#add-reply-thread-id-error').text('');
  });

  $('#add-reply-text').on('input', e => {
    $('#add-reply-text-error').text('');
  });

  $('#add-reply-delete-password').on('input', e => {
    $('#add-reply-delete-password-error').text('');
  });

  // setup listeners for report reply form and inputs
  $('#report-reply-form').submit(reportReply);

  $('#report-reply-board').on('input', e => {
    $('#report-reply-board-error').text('');
  });

  $('#report-reply-thread-id').on('input', e => {
    $('#report-reply-thread-id-error').text('');
  });

  $('#report-reply-id').on('input', e => {
    $('#report-reply-id-error').text('');
  });

  // setup listeners for delete reply form and inputs
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

const handleExpandCollapse = e => {
  const button = $(e.currentTarget);
  const target = button.attr('data-target');
  const container = $(`#${target}`);
  const icons = button.children();

  container.toggleClass('visually-hidden');
  icons.toggleClass('visually-hidden');
};

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
      displayResponse($('#report-thread-response'), res.responseJSON);
    },
  });
};

const deleteThread = e => {
  e.preventDefault();
  const data = formDataToJson($(e.target).serializeArray());
  const hasBoard = data?.board ? true : false;
  const hasThreadId = data?.thread_id ? true : false;
  const hasDeletePassword = data?.delete_password ? true : false;

  if (!hasBoard || !hasThreadId || !hasDeletePassword) {
    if (!hasBoard) {
      $('#delete-thread-board-error').text('Please enter a board');
    }

    if (!hasThreadId) {
      $('#delete-thread-id-error').text('Please enter thread id');
    }

    if (!hasDeletePassword) {
      $('#delete-thread-delete-password-error').text(
        'Please enter a delete password'
      );
    }

    return;
  }

  $.ajax({
    type: 'DELETE',
    url: `/api/threads/${data.board}`,
    data: data,
    success: res => {
      displayResponse($('#delete-thread-response'), res);
    },
    error: (res, err) => {
      const text = res.responseJSON ?? res.responseText;
      displayResponse($('#delete-thread-response'), text);
    },
  });
};

const addReply = e => {
  e.preventDefault();
  const data = formDataToJson($(e.target).serializeArray());
  const hasBoard = data?.board ? true : false;
  const hasThreadId = data?.thread_id ? true : false;
  const hasText = data?.text ? true : false;
  const hasDeletePassword = data?.delete_password ? true : false;

  if (!hasBoard || !hasThreadId || !hasText || !hasDeletePassword) {
    if (!hasBoard) {
      $('#add-reply-board-error').text('Please enter a board');
    }

    if (!hasThreadId) {
      $('#add-reply-thread-id-error').text('Please enter a thread id');
    }

    if (!hasText) {
      $('#add-reply-text-error').text('Please enter reply text');
    }

    if (!hasDeletePassword) {
      $('#add-reply-delete-password-error').text(
        'Please enter a delete password'
      );
    }

    return;
  }

  $.ajax({
    type: 'POST',
    url: `/api/replies/${data.board}`,
    data: data,
    success: reply => {
      displayResponse($('#new-reply-response'), reply);
    },
    error: (res, err) => {
      displayResponse($('#new-reply-response'), res.responseJSON);
    },
  });
};

const reportReply = e => {
  e.preventDefault();
  const data = formDataToJson($(e.target).serializeArray());
  const hasBoard = data?.board ? true : false;
  const hasThreadId = data?.thread_id ? true : false;
  const hasReplyId = data?.reply_id ? true : false;

  if (!hasBoard || !hasThreadId || !hasReplyId) {
    if (!hasBoard) {
      $('#report-reply-board-error').text('Please enter a board');
    }

    if (!hasThreadId) {
      $('#report-reply-thread-id-error').text('Please enter thread id');
    }

    if (!hasReplyId) {
      $('#report-reply-id-error').text('Please enter reply id');
    }

    return;
  }

  $.ajax({
    type: 'PUT',
    url: `/api/replies/${data.board}`,
    data: data,
    success: res => {
      displayResponse($('#report-reply-response'), res);
    },
    error: (res, err) => {
      displayResponse($('#report-reply-response'), res.responseJSON);
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
  const json = JSON.stringify(response, null, 4);
  const html = hljs.highlight(json, { language: 'json' }).value;
  jObj.html(html);
};
