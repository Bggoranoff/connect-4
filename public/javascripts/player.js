var Player = function (socket) {

    var username;

    var makeMove = function (column) {
        let msg = messages.MAKE_MOVE;
        msg.column = column;
        socket.send(JSON.stringify(msg));
    };

    return {
        username,
        makeMove,
    }
};