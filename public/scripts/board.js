const currentBoard = window.location.pathname.slice(3);

$(async () => {
  $('#board-name').text(currentBoard);

  await displayThreads();

  $('.thread-report-button').click(reportThread);

  $('.thread-delete-button').click(displayDeleteThreadModal);

  $('#delete-thread-modal').on('show.bs.modal', deleteThreadModalShowHandler);

  $('#delete-thread-modal').on('hide.bs.modal', deleteThreadModalHideHandler);

  $('#delete-thread-delete-password').on('input', deleteThreadPasswordInputHandler);

  $('#delete-thread-modal-button').click(deleteThread);

  $('.reply-report-button').click(reportReply);

  $('.reply-delete-button').click(displayReplyThreadModal);

  $('#delete-reply-modal').on('show.bs.modal', deleteReplyModalShowHandler);
});

const deleteReplyModalShowHandler = e => {
  const threadId = e.relatedTarget.getAttribute('data-thread-id');
  const replyId = e.relatedTarget.getAttribute('data-reply-id');
  
  $('#delete-reply-modal-button')
  .attr('data-thread-id', threadId)
  .attr('data-reply-id', replyId);
}

const displayReplyThreadModal = e => {
  const modal = new bootstrap.Modal($('#delete-reply-modal'));
  modal.toggle(e.currentTarget);
}

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
      console.log($(`#${reply_id} .card`));
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
}

const deleteThreadModalHideHandler = e => {
  $('#delete-thread-form')[0].reset();
  $('#delete-thread-delete-password-error').text('');
}

const deleteThreadModalShowHandler = e => {
  const threadId = e.relatedTarget.getAttribute('data-thread-id');
  $('#delete-thread-modal-button').attr('data-thread-id', threadId);
};

const displayDeleteThreadModal = e => {
  const modal = new bootstrap.Modal($('#delete-thread-modal'));
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
    const threadElement = createThreadElement(thread);
    $('#threads-container').append(threadElement);

    thread.replies.forEach(reply => {
      const replyElement = createReplyElement(reply);
      $(`#thread-${thread._id}-reply-container`).append(replyElement);
    });
  });
};

const createThreadElement = thread => {
  const isReported = thread.reported;
  const reportButton = `<button class="btn btn-warning thread-report-button" data-thread-id="${thread._id}">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-flag-fill" viewBox="0 0 16 16">
                            <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                          </svg>
                        </button>`;

  return `<div id="${thread._id}" class="row my-3">
            <div class="col">
              <div class="card ${
                thread.reported ? 'bg-warning' : 'bg-success'
              } text-white">
                <div class="card-header d-flex justify-content-between align-items-center flex-wrap">
                  <h5 class="d-flex flex-wrap my-2">
                    <span class="fw-bold">Thread:&nbsp;</span>
                    <a class="text-white fw-bold" href="/b/${currentBoard}/${thread._id}">
                      ${thread._id}
                    </a>
                  </h5>
                </div>
                <div class="card-body">
                  <div class="thread-text">
                    ${thread.text}
                  </div>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                  <div class="thread-details d-flex flex-column">
                    <div>
                      <span class="fw-bold">Created:</span> ${formatDate(
                        thread.created_on
                      )}
                    </div>
                    <div>
                      <span class="fw-bold">Updated:</span> 
                      <span class="thread-updated">${formatDate(
                        thread.bumped_on
                      )}</span>
                    </div>
                  </div>
                  <div id="thread-action-buttons">
                    ${isReported ? '' : reportButton}
                    <button class="btn btn-danger thread-delete-button" data-thread-id="${
                      thread._id
                    }">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill delete-button" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div id="thread-${thread._id}-reply-container">
              </div>
            </div>
          </div>`;
};

const createReplyElement = reply => {
  const isDeleted = reply.text == '[deleted]';
  const isReported = reply.reported;
  const cardBackground = isDeleted
    ? 'bg-danger'
    : reply.reported
    ? 'bg-warning'
    : 'bg-success';

  const reportButton = `<button class="btn btn-warning reply-report-button" data-thread-id="${reply.thread}" data-reply-id="${reply._id}">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-flag-fill" viewBox="0 0 16 16">
                            <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001" />
                          </svg>
                        </button>`;

  const deleteButton = `<button class="btn btn-danger reply-delete-button" data-thread-id="${reply.thread}" data-reply-id="${reply._id}">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill delete-button" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                          </svg>
                        </button>`;

  return `<div id="${reply._id}" class="row my-3 ps-5">
            <div class="col">
              <div class="card ${cardBackground} text-white">
                <div class="card-header d-flex align-items-center">
                  <h5 class="d-flex flex-wrap my-2">
                    <span class="fw-bold">Reply:&nbsp;</span>
                    <span>${reply._id}</span>
                  </h5>
                </div>
                <div class="card-body">
                  <div class="reply-text">
                    ${reply.text}
                  </div>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                  <div class="reply-details d-flex flex-column">
                    <div>
                      <span class="fw-bold">Created:</span> ${formatDate(
                        reply.created_on
                      )}
                    </div>
                    <div>
                      <span class="fw-bold">Updated:</span> 
                      <span class="reply-updated">${formatDate(
                        reply.bumped_on
                      )}</span>
                    </div>
                  </div>
                  <div id="reply-action-buttons">
                    ${isReported ? '' : reportButton}
                    ${isDeleted ? '' : deleteButton}
                  </div>
                </div>
              </div>
            </div>
          </div>`;
};

const formatDate = date => {
  const dateToFormat = new Date(date);
  const dateString = dateToFormat.toLocaleDateString();
  const timeString = dateToFormat.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
  return `${dateString} ${timeString}`;
};
