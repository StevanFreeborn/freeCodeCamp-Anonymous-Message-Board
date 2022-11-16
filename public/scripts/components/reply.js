import { formatDate } from '../utils/utilities.js';
import createDeleteReplyModal from './deleteReplyModal.js';

export default function createReply(board, reply) {
  const isDeleted = reply.text == '[deleted]';
  const isReported = reply.reported;
  const cardBackground = isDeleted
    ? 'bg-danger'
    : reply.reported
    ? 'bg-warning'
    : 'bg-success';

  const replyComponent = document.createElement('div');
  replyComponent.id = reply._id;
  replyComponent.classList.add('row', 'my-3', 'ps-5');
  replyComponent.innerHTML = `
    <div class="col">
      <div id="${reply._id}-card" class="card ${cardBackground} text-white">
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
              <span class="reply-updated">${formatDate(reply.bumped_on)}</span>
            </div>
          </div>
          <div id="reply-action-buttons">
            <button class="btn btn-sm btn-warning reply-report-button mx-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-flag-fill" viewBox="0 0 16 16">
                <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001"></path>
              </svg>
            </button>
            <button class="btn btn-sm btn-danger reply-delete-button mx-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash-fill delete-button" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  const reportButton = replyComponent.querySelector('.reply-report-button');
  const deleteButton = replyComponent.querySelector('.reply-delete-button');

  reportButton.addEventListener('click', e => {
    $.ajax({
      type: 'PUT',
      url: `/api/replies/${board}`,
      data: {
        board: board,
        thread_id: reply.thread,
        reply_id: reply._id,
      },
      success: res => {
        $(`#${reply._id}-card`)
          .removeClass('bg-success')
          .addClass('bg-warning');

        $(`#${reply._id} .reply-updated`).text(
          formatDate(new Date().toISOString())
        );

        $(`#${reply._id} .reply-report-button`).remove();
      },
      error: (res, err) => {
        const text = res?.responseJSON?.error
          ? res.responseJSON.error
          : res?.responseText ?? `Unable to report reply ${reply._id}`;
        alert(text);
      },
    });
  });

  deleteButton.addEventListener('click', e => {
    createDeleteReplyModal(board, reply).show();
  });

  if (isReported || isDeleted) {
    reportButton.remove();
  }

  if (isDeleted) {
    deleteButton.remove();
  }

  return replyComponent;
}
