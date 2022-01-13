var Player = function (socket) {

    var username;
    
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
        let row = board.length - 1;
        while (row >= 0 && board[row][column] != 0) {
            row--;
        }

        if (row < 0) {
            return false;
        }

        mark(symbol, row, column);
        setLastMove(row, column);

        let msg = messages.MAKE_MOVE;
        msg.move = lastMove;
        socket.send(JSON.stringify(msg));
        disableClicks();
        return true;
    };

    var mark = function (symbol, row, column) {
        board[row][column] = symbol;
    };

    var setSymbol = function (newSymbol) {
        this.symbol = newSymbol;
    };

    return {
        username,
        symbol,
        board,
        ended,
        winner,
        isWinner,
        makeMove,
        mark,
        lastMove,
        setLastMove,
        setSymbol
    }
};