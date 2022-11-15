import { formatDate } from "../utils/utilities.js";

export default function createDeleteReplyModal(board) {
  const deleteReplyModal = document.createElement('div');
  deleteReplyModal.id = 'delete-reply-modal';
  deleteReplyModal.classList.add('modal', 'text-white');
  deleteReplyModal.tabIndex = '-1';
  deleteReplyModal.innerHTML = `
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Confirm Reply Deletion</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                 <div class="row">
                    <div class="col">
                        <form id="delete-reply-form">
                            <div class="form-group mb-3">
                                <label for="delete-reply-delete-password" class="form-label">Delete Password</label>
                                <input class="form-control" type='password' id="delete-reply-delete-password" name='delete_password'>
                                <div id="delete-reply-delete-password-error" class="text-start text-danger fw-bold"></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button id="delete-reply-modal-button" type="button" class="btn btn-danger" data-thread-id='' data-reply-id=''>Delete Reply</button>
            </div>
        </div>
    </div>
  `;

  const deleteReplyButton = deleteReplyModal.querySelector(
    '#delete-reply-modal-button'
  );

  const deleteReplyForm = deleteReplyModal.querySelector('#delete-reply-form');

  const deleteReplyPasswordError = deleteReplyModal.querySelector(
    '#delete-reply-delete-password-error'
  );

  const deleteReplyPasswordInput = deleteReplyModal.querySelector(
    '#delete-reply-delete-password'
  );

  deleteReplyModal.addEventListener('show.bs.modal', e => {
    const threadId = e.relatedTarget.getAttribute('data-thread-id');
    const replyId = e.relatedTarget.getAttribute('data-reply-id');

    deleteReplyButton.setAttribute('data-thread-id', threadId)
    deleteReplyButton.setAttribute('data-reply-id', replyId);
  });

  deleteReplyModal.addEventListener('hide.bs.modal', e => {
    deleteReplyForm.reset();
    deleteReplyPasswordError.innerHTML = '';
    deleteReplyModal.remove();
  });

  deleteReplyPasswordInput.addEventListener('input', e => {
    deleteReplyPasswordError.innerHTML = '';
  });

  deleteReplyButton.addEventListener('click', e => {
    const thread_id = e.currentTarget.getAttribute('data-thread-id');
    const reply_id = e.currentTarget.getAttribute('data-reply-id');
    const delete_password = deleteReplyPasswordInput.value;

    if (!delete_password) {
      deleteReplyPasswordError.innerHTML = 'Please enter a delete password';
      return;
    }

    $.ajax({
      type: 'DELETE',
      url: `/api/replies/${board}`,
      data: { thread_id, delete_password, reply_id },
      success: res => {
        const modal = bootstrap.Modal.getInstance(deleteReplyModal);
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
  });

  const modal = new bootstrap.Modal(deleteReplyModal)

  return modal;
}
