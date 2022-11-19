import { formatDate } from '../utils/utilities.js';

export default function createBoardCard(board) {
  return `<div class="col-md-6">
                  <div class="card text-white bg-success">
                      <div class="card-header">
                          <a href="/b/${
                            encodeURIComponent(board.name)
                          }" class="link-primary fw-bold fs-5">${board.name}</a>
                      </div>
                      <div class="card-body">
                          <p class="card-text">
                              <span class="fw-bold">Id:</span> ${board._id}
                          </p>
                          <p class="card-text">
                              <span class="fw-bold">Created:</span> ${formatDate(
                                board.created_on
                              )}
                          </p>
                          <p class="card-text">
                              <span class="fw-bold">Updated:</span> ${formatDate(
                                board.bumped_on
                              )}
                          </p>
                      </div>
                  </div>
              </div>`;
}
