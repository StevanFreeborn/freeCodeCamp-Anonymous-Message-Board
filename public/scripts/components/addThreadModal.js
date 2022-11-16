import { formDataToJson } from '../utils/utilities.js';
import createThread from './thread.js';

export default function createAddThreadModal(board) {
  const addThreadModal = document.createElement('div');
  addThreadModal.id = 'add-thread-modal';
  addThreadModal.classList.add('modal', 'text-white');
  addThreadModal.tabIndex = '-1';
  addThreadModal.innerHTML = `
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add Thread</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col">
                  <div id="add-thread-error" class="text-start text-danger fw-bold"></div>
                  <form id="add-thread-form">
                    <div class="form-group mb-3">
                      <label for="add-thread-text" class="form-label">Thread Text</label>
                      <textarea class="form-control" type='text' id='add-thread-text' name='text'></textarea>
                      <div id="add-thread-text-error" class="text-start text-danger fw-bold"></div>
                    </div>
                    <div class="form-group mb-3">
                      <label for="add-thread-delete-password" class="form-label">Delete Password</label>
                      <input class="form-control" type='password' id="add-thread-delete-password"
                        name='delete_password'>
                      <div id="add-thread-delete-password-error" class="text-start text-danger fw-bold"></div>
                    </div>
                  </form>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button id="add-thread-modal-button" type="button" class="btn btn-primary">Add Thread</button>
              </div>
            </div>
          </div>
        </div>
    `;

  const addThreadTextInput = addThreadModal.querySelector('#add-thread-text');

  const addThreadTextError = addThreadModal.querySelector(
    '#add-thread-text-error'
  );

  const addThreadDeletePasswordInput = addThreadModal.querySelector(
    '#add-thread-delete-password-error'
  );

  const addThreadDeletePasswordError = addThreadModal.querySelector(
    '#add-thread-delete-password-error'
  );

  const addThreadForm = addThreadModal.querySelector('#add-thread-form');
  const addThreadError = addThreadModal.querySelector('#add-thread-error');

  const addThreadModalButton = addThreadModal.querySelector(
    '#add-thread-modal-button'
  );

  addThreadTextInput.addEventListener('input', e => {
    addThreadTextError.innerHTML = '';
  });

  addThreadDeletePasswordInput.addEventListener('input', e => {
    addThreadDeletePasswordError.innerHTML = '';
  });

  addThreadModal.addEventListener('hide.bs.modal', e => {
    addThreadForm.reset();
    addThreadError.innerHTML = '';
    addThreadTextError.innerHTML = '';
    addThreadDeletePasswordError.innerHTML = '';
    addThreadModal.remove();
  });

  addThreadModalButton.addEventListener('click', e => {
    const data = formDataToJson($('#add-thread-form').serializeArray());
    const hasText = data?.text ? true : false;
    const hasDeletePassword = data?.delete_password ? true : false;

    if (!hasText || !hasDeletePassword) {
      if (!hasText) {
        addThreadTextError.innerHTML = 'Please enter thread text';
      }

      if (!hasDeletePassword) {
        addThreadDeletePasswordError.innerHTML =
          'Please enter a delete password';
      }

      return;
    }

    $.ajax({
      type: 'POST',
      url: `/api/threads/${board}`,
      data: data,
      success: thread => {
        const modal = bootstrap.Modal.getInstance(addThreadModal);
        modal.hide();

        $('#threads-container').prepend(createThread(board, thread));
      },
      error: (res, err) => {
        const text = res?.responseJSON?.error
          ? res.responseJSON.error
          : res?.responseText ?? `Unable to add thread`;
        addThreadError.innerHTML = text;
      },
    });
  });

  const modal = new bootstrap.Modal(addThreadModal);

  return modal;
}
