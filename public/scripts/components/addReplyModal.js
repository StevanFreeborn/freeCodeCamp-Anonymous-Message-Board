import { formDataToJson } from '../utils/utilities.js';
import createReply from './reply.js';

export default function createAddReplyModal(board, thread) {
  const addReplyModal = document.createElement('div');
  addReplyModal.id = 'add-reply-modal';
  addReplyModal.classList.add('modal', 'text-white');
  addReplyModal.tabIndex = '-1';
  addReplyModal.innerHTML = `
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Reply</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col">
                  <div id="add-reply-error" class="text-start text-danger fw-bold"></div>
                  <form id="add-reply-form">
                    <div class="form-group mb-3">
                      <label for="add-reply-text" class="form-label">Reply Text</label>
                      <textarea class="form-control" type='text' id='add-reply-text' name='text'></textarea>
                      <div id="add-reply-text-error" class="text-start text-danger fw-bold"></div>
                    </div>
                    <div class="form-group mb-3">
                      <label for="add-reply-delete-password" class="form-label">Delete Password</label>
                      <input class="form-control" type='password' id="add-reply-delete-password"
                        name='delete_password'>
                      <div id="add-reply-delete-password-error" class="text-start text-danger fw-bold"></div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button id="add-reply-modal-button" type="button" class="btn btn-primary">Add Reply</button>
              </div>
            </div>
          </div>
        </div>
    `;

  const addReplyTextInput = addReplyModal.querySelector('#add-reply-text');

  const addReplyTextError = addReplyModal.querySelector(
    '#add-reply-text-error'
  );

  const addReplyDeletePasswordInput = addReplyModal.querySelector(
    '#add-reply-delete-password-error'
  );

  const addReplyDeletePasswordError = addReplyModal.querySelector(
    '#add-reply-delete-password-error'
  );

  const addReplyForm = addReplyModal.querySelector('#add-reply-form');
  const addReplyError = addReplyModal.querySelector('#add-reply-error');

  const addReplyModalButton = addReplyModal.querySelector(
    '#add-reply-modal-button'
  );

  addReplyTextInput.addEventListener('input', e => {
    addReplyTextError.innerHTML = '';
  });

  addReplyDeletePasswordInput.addEventListener('input', e => {
    addReplyDeletePasswordError.innerHTML = '';
  });

  addReplyModal.addEventListener('hide.bs.modal', e => {
    addReplyForm.reset();
    addReplyError.innerHTML = '';
    addReplyTextError.innerHTML = '';
    addReplyDeletePasswordError.innerHTML = '';
    addReplyModal.remove();
  });

  addReplyModalButton.addEventListener('click', e => {
    const data = formDataToJson($('#add-reply-form').serializeArray());
    const hasText = data?.text ? true : false;
    const hasDeletePassword = data?.delete_password ? true : false;

    if (!hasText || !hasDeletePassword) {
      if (!hasText) {
        addReplyTextError.innerHTML = 'Please enter thread text';
      }

      if (!hasDeletePassword) {
        addReplyDeletePasswordError.innerHTML =
          'Please enter a delete password';
      }

      return;
    }

    $.ajax({
      type: 'POST',
      url: `/api/replies/${board}`,
      data: {
        thread_id: thread._id,
        ...data,
      },
      success: reply => {
        const modal = bootstrap.Modal.getInstance(addReplyModal);
        modal.hide();

        $(`#thread-${thread._id}-reply-container`).prepend(
          createReply(board, reply)
        );
      },
      error: (res, err) => {
        const text = res?.responseJSON?.error
          ? res.responseJSON.error
          : res?.responseText ?? `Unable to add thread`;
        addReplyError.innerHTML = text;
      },
    });
  });

  const modal = new bootstrap.Modal(addReplyModal);

  return modal;
}
