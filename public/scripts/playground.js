$(function () {
    $('#add-thread-form').submit(e => {
        e.preventDefault();
        const data = formDataToJson($(e.target).serializeArray());
        console.log(data);

        // $.ajax({
        //     type: 'POST',
        //     url: `/api/threads/${boardName}`,
        //     data: { name: boardName, },
        //     success: (board) => {
        //         $('#add-board-form')[0].reset();
        //         addBoardElement(board);
        //     },
        //     error: (res, err) => {
        //         const error = res.responseJSON?.error ?? 'Failed to add board';
        //         $('#add-board-error').text(error)
        //     },
        // });
    });

    $('#newReply').submit(function () {
        var board = $('#board4').val();
        $(this).attr('action', "/api/replies/" + board);
    });

    $('#reportThread').submit(function (e) {
        var url = "/api/threads/" + $('#board2').val();
        $.ajax({
            type: "PUT",
            url: url,
            data: $(this).serialize(),
            success: function (data) {
                alert(data);
            }
        });
        e.preventDefault();
    });
    $('#deleteThread').submit(function (e) {
        var url = "/api/threads/" + $('#board3').val();
        $.ajax({
            type: "DELETE",
            url: url,
            data: $(this).serialize(),
            success: function (data) {
                alert(data);
            }
        });
        e.preventDefault();
    });
    $('#reportReply').submit(function (e) {
        var url = "/api/replies/" + $('#board5').val();
        $.ajax({
            type: "PUT",
            url: url,
            data: $(this).serialize(),
            success: function (data) {
                alert(data);
            }
        });
        e.preventDefault();
    });
    $('#deleteReply').submit(function (e) {
        var url = "/api/replies/" + $('#board6').val();
        $.ajax({
            type: "DELETE",
            url: url,
            data: $(this).serialize(),
            success: function (data) {
                alert(data);
            }
        });
        e.preventDefault();
    });
});

const formDataToJson = (formData) => {
    return formData.reduce((prev, curr) => {
        prev[curr.name] = curr.value;
        return prev;
    }, {});
}