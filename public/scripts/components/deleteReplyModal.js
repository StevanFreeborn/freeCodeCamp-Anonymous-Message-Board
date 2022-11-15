export default function createDeleteReplyModal() {
    return `<div id="delete-reply-modal" class="modal text-white" tabindex="-1">
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
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button id="delete-reply-modal-button" type="button" class="btn btn-danger">Delete Reply</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>`;
}