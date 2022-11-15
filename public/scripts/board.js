import { formatDate, formDataToJson } from './utils/utilities.js';
import createThread from './components/thread.js';
import createReply from './components/reply.js';
import createDeleteReplyModal from './components/deleteReplyModal.js';

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
      const threadElement = createThread(currentBoard, thread);
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

const displayThreads = async () => {
  const threads = await $.ajax({
    type: 'GET',
    url: `/api/threads/${currentBoard}`,
  });

  threads.forEach(thread => {
    const threadElement = createThread(currentBoard, thread);
    $('#threads-container').append(threadElement);

    thread.replies.forEach(reply => {
      const replyElement = createReply(currentBoard, reply);
      $(`#thread-${thread._id}-reply-container`).append(replyElement);
    });
  });
};
