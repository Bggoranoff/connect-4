var Player = function (socket) {

    var username;

    var otherUsername;
    
    var symbol = 0;

    var board = [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ];

    var ended = false;

	var winner = 0;

    var lastMove = [-1, -1];

    var setLastMove = function(row, column) {
        lastMove[0] = row;
        lastMove[1] = column;
    }

    var isWinner = function () {
        return symbol === winner;
    };

    var makeMove = function (column) {
        let msg = messages.MAKE_MOVE;
        msg.column = column;
        socket.send(JSON.stringify(msg));
    };

    var setUsername = function(u) {
        this.username = u;
    };

    var setOtherUsername = function(u) {
        this.otherUsername = u;
    };

    return {
        setOtherUsername, 
        otherUsername,
        setUsername,
        username,
        makeMove,
    }
};