import { formatDate, formDataToJson } from './utils/utilities.js';
import createThreadElement from './components/threadElement.js';
import createReplyElement from './components/replyElement.js';

const currentBoard = decodeURI(window.location.pathname)
  .split('/')
  .reverse()[0];

$(async () => {
  $('#board-name').text(currentBoard);

  await displayThreads();

  // add listeners for adding a thread
  $('#add-thread-button').click(displayAddThreadModal);

  $('#add-thread-modal').on('hide.bs.modal', addThreadModalHideHandler);

  $('#add-thread-text').on('input', addThreadTextInputHandler);

  $('#add-thread-delete-password').on(
    'input',
    addThreadDeletePasswordInputHandler
  );

  $('#add-thread-modal-button').click(addThread);

  // add listeners for reporting a thread
  $('.thread-report-button').click(reportThread);

  $('.thread-delete-button').click(displayDeleteThreadModal);

  // add listeners for deleting a thread
  $('#delete-thread-modal').on('show.bs.modal', deleteThreadModalShowHandler);

  $('#delete-thread-modal').on('hide.bs.modal', deleteThreadModalHideHandler);

  $('#delete-thread-delete-password').on(
    'input',
    deleteThreadPasswordInputHandler
  );

  $('#delete-thread-modal-button').click(deleteThread);

  // add listeners for reporting a reply
  $('.reply-report-button').click(reportReply);

  $('.reply-delete-button').click(displayDeleteReplyModal);

  // add listeners for deleting a reply
  $('#delete-reply-modal').on('show.bs.modal', deleteReplyModalShowHandler);

  $('#delete-reply-modal').on('hide.bs.modal', deleteReplyModalHideHandler);

  $('#delete-reply-delete-password').on(
    'input',
    deleteReplyPasswordInputHandler
  );

  $('#delete-reply-modal-button').click(deleteReply);
});

const addThread = e => {
  const data = formDataToJson($('#add-thread-form').serializeArray());
  const hasText = data?.text ? true : false;
  const hasDeletePassword = data?.delete_password ? true : false;

  if (!hasText || !hasDeletePassword) {
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
    url: `/api/threads/${currentBoard}`,
    data: data,
    success: thread => {
      const modal = bootstrap.Modal.getInstance($('#add-thread-modal')[0]);
      modal.hide();
      const threadElement = createThreadElement(currentBoard, thread);
      $('#threads-container').prepend(threadElement);
    },
    error: (res, err) => {
      const text = res?.responseJSON?.error
        ? res.responseJSON.error
        : res?.responseText ?? `Unable to add thread`;
      $('#add-thread-error').text(text);
    },
  });
};

const addThreadTextInputHandler = e => {
  $('#add-thread-text-error').text('');
};

const addThreadDeletePasswordInputHandler = e => {
  $('#add-thread-delete-password-error').text('');
};

const addThreadModalHideHandler = e => {
  $('#add-thread-form')[0].reset();
  $('#add-thread-error').text('');
  $('#add-thread-text-error').text('');
  $('#add-thread-delete-password-error').text('');
};

const displayAddThreadModal = e => {
  const modal = new bootstrap.Modal($('#add-thread-modal')[0]);
  modal.show();
};

const deleteReply = e => {
  const board = currentBoard;
  const thread_id = e.currentTarget.getAttribute('data-thread-id');
  const reply_id = e.currentTarget.getAttribute('data-reply-id');
  const delete_password = $('#delete-reply-delete-password').val();

  if (!delete_password) {
    $('#delete-reply-delete-password-error').text(
      'Please enter a delete password'
    );
    return;
  }

  $.ajax({
    type: 'DELETE',
    url: `/api/replies/${board}`,
    data: { thread_id, delete_password, reply_id },
    success: res => {
      const modal = bootstrap.Modal.getInstance($('#delete-reply-modal')[0]);
      modal.hide();
      $(`#${reply_id} .card`)
        .removeClass('bg-success')
        .removeClass('bg-warning')
        .addClass('bg-danger');

      $(`#${reply_id} .reply-text`).text('[deleted]');

      $(`#${reply_id} .reply-updated`).text(
        formatDate(new Date().toISOString())
      );

      $(`#${reply_id} .reply-delete-button`).remove();
      $(`#${reply_id} .reply-report-button`).remove();
    },
    error: (res, err) => {
      const text = res?.responseJSON?.error
        ? res.responseJSON.error
        : res?.responseText ?? `Unable to delete reply ${reply_id}`;
      $('#delete-reply-delete-password-error').text(text);
    },
  });
};

const deleteReplyPasswordInputHandler = e => {
  $('#delete-reply-delete-password-error').text('');
};

const deleteReplyModalHideHandler = e => {
  $('#delete-reply-form')[0].reset();
  $('#delete-reply-delete-password-error').text('');
};

const deleteReplyModalShowHandler = e => {
  const threadId = e.relatedTarget.getAttribute('data-thread-id');
  const replyId = e.relatedTarget.getAttribute('data-reply-id');

  $('#delete-reply-modal-button')
    .attr('data-thread-id', threadId)
    .attr('data-reply-id', replyId);
};

const displayDeleteReplyModal = e => {
  const modal = new bootstrap.Modal($('#delete-reply-modal')[0]);
  modal.toggle(e.currentTarget);
};

const reportReply = e => {
  const board = currentBoard;
  const reportReplyButton = $(e.currentTarget);
  const thread_id = reportReplyButton.attr('data-thread-id');
  const reply_id = reportReplyButton.attr('data-reply-id');

  $.ajax({
    type: 'PUT',
    url: `/api/replies/${board}`,
    data: { board, thread_id, reply_id },
    success: res => {
      $(`#${reply_id} .card`).removeClass('bg-success').addClass('bg-warning');

      $(`#${reply_id} .reply-updated`).text(
        formatDate(new Date().toISOString())
      );

      $(`#${reply_id} .reply-report-button`).remove();
    },
    error: (res, err) => {
      const text = res?.responseJSON?.error
        ? res.responseJSON.error
        : res?.responseText ?? `Unable to report reply ${reply_id}`;
      alert(text);
    },
  });
};

const deleteThread = e => {
  const board = currentBoard;
  const thread_id = e.currentTarget.getAttribute('data-thread-id');
  const delete_password = $('#delete-thread-delete-password').val();

  if (!delete_password) {
    $('#delete-thread-delete-password-error').text(
      'Please enter a delete password'
    );
    return;
  }

  $.ajax({
    type: 'DELETE',
    url: `/api/threads/${board}`,
    data: { thread_id, delete_password },
    success: res => {
      const modal = bootstrap.Modal.getInstance($('#delete-thread-modal')[0]);
      modal.hide();
      $(`#${thread_id}`).remove();
    },
    error: (res, err) => {
      const text = res?.responseJSON?.error
        ? res.responseJSON.error
        : res?.responseText ?? `Unable to delete thread ${thread_id}`;
      $('#delete-thread-delete-password-error').text(text);
    },
  });
};

const deleteThreadPasswordInputHandler = e => {
  $('#delete-thread-delete-password-error').text('');
};

const deleteThreadModalHideHandler = e => {
  $('#delete-thread-form')[0].reset();
  $('#delete-thread-delete-password-error').text('');
};

const deleteThreadModalShowHandler = e => {
  const threadId = e.relatedTarget.getAttribute('data-thread-id');
  $('#delete-thread-modal-button').attr('data-thread-id', threadId);
};

const displayDeleteThreadModal = e => {
  const modal = new bootstrap.Modal($('#delete-thread-modal')[0]);
  modal.toggle(e.currentTarget);
};

const reportThread = e => {
  const board = currentBoard;
  const thread_id = $(e.currentTarget).attr('data-thread-id');

  $.ajax({
    type: 'PUT',
    url: `/api/threads/${board}`,
    data: { board, thread_id },
    success: res => {
      $(`#${thread_id} .card`).removeClass('bg-success').addClass('bg-warning');

      $(`#${thread_id} .thread-updated`).text(
        formatDate(new Date().toISOString())
      );
      $(`#${thread_id} .thread-report-button`).remove();
    },
    error: (res, err) => {
      const text = res?.responseJSON?.error
        ? res.responseJSON.error
        : res?.responseText ?? `Unable to report thread ${thread_id}`;
      alert(text);
    },
  });
};

const displayThreads = async () => {
  const threads = await $.ajax({
    type: 'GET',
    url: `/api/threads/${currentBoard}`,
  });

  threads.forEach(thread => {
    const threadElement = createThreadElement(currentBoard, thread);
    $('#threads-container').append(threadElement);

    thread.replies.forEach(reply => {
      const replyElement = createReplyElement(reply);
      $(`#thread-${thread._id}-reply-container`).append(replyElement);
    });
  });
};
