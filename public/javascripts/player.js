var player = (function () {

    var username;
    
    var symbol;

    var board = Array(6).fill(
        Array(7).fill(0)
    );

    var ended = false;

	var winner = 0;

    var isWinner = function () {
        return symbol === winner;
    };

    var makeMove = function (column, symbol) {
        let row = board.length - 1;
        while (row >= 0 && board[row][column] != 0) {
            row--;
        }

        if (row < 0) {
            return false;
        }

        mark(symbol, row, column);
        return true;
    };

    var mark = function (symbol, row, column) {
        board[row][column] = symbol;
    };

    return {
        username,
        symbol,
        board,
        ended,
        winner,
        isWinner,
        makeMove,
        mark
    }
})();

module.exports = player;