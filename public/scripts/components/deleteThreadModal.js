export default function createDeleteThreadModal(board, thread) {
  const deleteThreadModal = document.createElement('div');
  deleteThreadModal.id = 'delete-thread-modal';
  deleteThreadModal.classList.add('modal', 'text-white');
  deleteThreadModal.tabIndex = '-1';
  deleteThreadModal.innerHTML = `
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirm Thread Deletion</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col">
                            <form id="delete-thread-form">
                                <div class="form-group mb-3">
                                    <label for="delete-thread-delete-password" class="form-label">Delete Password</label>
                                    <input class="form-control" type='password' id="delete-thread-delete-password" name="delete_password">
                                    <div id="delete-thread-delete-password-error" class="text-start text-danger fw-bold"></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button id="delete-thread-modal-button" type="button" class="btn btn-danger">Delete Thread</button>
                </div>
            </div>
        </div>
    `;

  const deleteThreadButton = deleteThreadModal.querySelector(
    '#delete-thread-modal-button'
  );

  const deleteThreadForm = deleteThreadModal.querySelector(
    '#delete-thread-form'
  );

  const deleteThreadPasswordError = deleteThreadModal.querySelector(
    '#delete-thread-delete-password-error'
  );

  const deleteThreadPasswordInput = deleteThreadModal.querySelector(
    '#delete-thread-delete-password'
  );

  deleteThreadModal.addEventListener('hide.bs.modal', e => {
    deleteThreadForm.reset();
    deleteThreadPasswordError.innerHTML = '';
    deleteThreadModal.remove();
  });

  deleteThreadPasswordInput.addEventListener('input', e => {
    deleteThreadPasswordError.innerHTML = '';
  });

  deleteThreadButton.addEventListener('click', e => {
    const delete_password = deleteThreadPasswordInput.value;
    
    if (!delete_password) {
      deleteThreadPasswordError.innerHTML = 'Please enter a delete password';
      return;
    }

    $.ajax({
      type: 'DELETE',
      url: `/api/threads/${board}`,
      data: {
        thread_id: thread._id,
        delete_password: delete_password,
      },
      success: res => {
        const modal = bootstrap.Modal.getInstance(deleteThreadModal);
        modal.hide();
        $(`#${thread._id}`).hide(500, function () { $(this).remove()});
      },
      error: (res, err) => {
        const text = res?.responseJSON?.error
          ? res.responseJSON.error
          : res?.responseText ?? `Unable to delete thread ${thread._id}`;
          deleteThreadPasswordError.innerHTML = text;
      },
    });
  });

  const modal = new bootstrap.Modal(deleteThreadModal);

  return modal;
}
