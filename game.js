var gameState = (function () {
    var firstPlayer = {
        name: "playerUsername",
        icon: "iconName.png",
        symbol: 1,
        connectionData: {
            port: 1234,
            ip: "191.394.13.3"
        }
    };

    var secondPlayer = {
        name: "playerUsername",
        icon: "iconName.png",
        symbol: 2,
        connectionData: {
            port: 1234,
            ip: "191.394.13.3"
        }
    };

    var board = Array(6).fill(
        Array(7).fill(0)
    );

    var ended = false;

    var lastMove = [0, 0];

	var winner = 0;

	var setWinner = function (winnerSymbol) {
			this.winner = winnerSymbol;
	};

    var endGame = function () {
        this.ended = true;
    };

    var makeMove = function (column, symbol) {
        let row = board.length - 1;
        while (row >= 0 && board[row][column] != 0) {
            row--;
        }

        if (row < 0) {
            return;
        }

        mark(symbol, row, column);
        setLastMove([row, column]);
        if (checkForWin()) {
						setWinner(symbol);
            endGame();
        }
    };

    var mark = function (symbol, row, column) {
        board[row][column] = symbol;
    };

    var setLastMove = function (move) {
        this.lastMove = move;
    };

    var checkForWin = function () {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                if (board[i][j] != 0 && isWinningCombination(i, j)) {
                    return true;
                }
            }
        }

        return false;
    };

    var isValid = function (i, j) {
        return i >= 0 && i < board.length && j >= 0 && j < board[0].length;
    };

    var isWinningCombination = function (i, j) {
        return isValid(i, j)
            && (
                (
                    isValid(i + 1, j) && board[i + 1][j] === board[i][j]
                    && isValid(i + 2, j) && board[i + 2][j] === board[i][j]
                    && isValid(i + 3, j) && board[i + 3][j] === board[i][j]
                )
                || (
                    isValid(i, j + 1) && board[i][j + 1] === board[i][j]
                    && isValid(i, j + 2) && board[i][j + 2] === board[i][j]
                    && isValid(i, j + 3) && board[i][j + 3] === board[i][j]
                )
                || (
                    isValid(i + 1, j + 1) && board[i + 1][j + 1] === board[i][j]
                    && isValid(i + 2, j + 2) && board[i + 2][j + 2] === board[i][j]
                    && isValid(i + 3, j + 3) && board[i + 3][j + 3] === board[i][j]
                )
                || (
                    isValid(i + 1, j - 1) && board[i + 1][j - 1] === board[i][j]
                    && isValid(i + 2, j - 2) && board[i + 2][j - 2] === board[i][j]
                    && isValid(i + 3, j - 3) && board[i + 3][j - 3] === board[i][j]
                )
            );
    };

    var setPlayer = function (symbol, { name, icon, connectionData: { ip, port } }) {
        if (symbol === 1) {
            firstPlayer.name = name;
            firstPlayer.icon = icon;
            firstPlayer.connectionData = connectionData;
        } else if (symbol === 2) {
            secondPlayer.name = name;
            secondPlayer.icon = icon;
            secondPlayer.connectionData = connectionData;
        }
    };

    var getPlayer = function (symbol) {
        if (symbol === 1) {
            return firstPlayer;
        } else if (symbol === 2) {
            return secondPlayer;
        }

        return null;
    };

    return {
        getPlayer,
        setPlayer,
        ended,
        lastMove,
        makeMove,
	    setWinner
    };
})();

module.exports = gameState;