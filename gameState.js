function createGame() {
    var gameState = (function () {

        var firstPlayer = null;
    
        var secondPlayer = null;
    
        var playerOnTurn = 1;
    
        var date = 0;
    
        var board = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
        ];
    
        var ended = false;
    
        var lastMove = [-1, -1];
    
        var winner = 0;
    
        var getLastMove = function () {
            return lastMove;
        };
    
        var setWinner = function (winnerSymbol) {
            winner = winnerSymbol;
        };
    
        var setEnded = function (e) {
            ended = e;
        };
    
        var getDate = function () {
            return date;
        };
    
        var setDate = function (d) {
            date = d;
        };
    
        var getWinner = function () {
            return winner;
        };
    
        var getEnded = function () {
            return ended;
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
            setLastMove(row, column);
            return true;
        };
    
        var mark = function (symbol, row, column) {
            board[row][column] = symbol;
            if (checkForWin()) {
                setWinner(symbol);
                setEnded(true);
            }
        };
    
        var setLastMove = function (row, column) {
            lastMove[0] = row;
            lastMove[1] = column;
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
            return (
                isValid(i, j) &&
                ((isValid(i + 1, j) &&
                    board[i + 1][j] === board[i][j] &&
                    isValid(i + 2, j) &&
                    board[i + 2][j] === board[i][j] &&
                    isValid(i + 3, j) &&
                    board[i + 3][j] === board[i][j]) ||
                    (isValid(i, j + 1) &&
                        board[i][j + 1] === board[i][j] &&
                        isValid(i, j + 2) &&
                        board[i][j + 2] === board[i][j] &&
                        isValid(i, j + 3) &&
                        board[i][j + 3] === board[i][j]) ||
                    (isValid(i + 1, j + 1) &&
                        board[i + 1][j + 1] === board[i][j] &&
                        isValid(i + 2, j + 2) &&
                        board[i + 2][j + 2] === board[i][j] &&
                        isValid(i + 3, j + 3) &&
                        board[i + 3][j + 3] === board[i][j]) ||
                    (isValid(i + 1, j - 1) &&
                        board[i + 1][j - 1] === board[i][j] &&
                        isValid(i + 2, j - 2) &&
                        board[i + 2][j - 2] === board[i][j] &&
                        isValid(i + 3, j - 3) &&
                        board[i + 3][j - 3] === board[i][j]))
            );
        };
    
        var addPlayer = function (player) {
            if (firstPlayer == null) {
                firstPlayer = player;
                firstPlayer.symbol = 1;
                return firstPlayer.symbol;
            } else if (secondPlayer == null) {
                secondPlayer = player;
                secondPlayer.symbol = 2;
                return secondPlayer.symbol;
            } else {
                return 0;
            }
        }
    
        var removePlayers = function () {
            firstPlayer = null;
            secondPlayer = null;
        }
    
        var getPlayer = function (symbol) {
            if (symbol === 1) {
                return firstPlayer;
            } else if (symbol === 2) {
                return secondPlayer;
            }
    
            return null;
        };
    
        var getPlayerOnTurn = function () {
            return playerOnTurn;
        };
    
        var setPlayerOnTurn = function (symbol) {
            playerOnTurn = symbol;
        };
    
        var clear = function () {
            for (let i = 0; i < board.length; i++) {
                for (let j = 0; j < board[0].length; j++) {
                    board[i][j] = 0;
                }
            }
        };
    
        return {
            removePlayers,
            setDate,
            getDate,
            clear,
            getPlayer,
            addPlayer,
            makeMove,
            setWinner,
            getWinner,
            setEnded,
            getEnded,
            setPlayerOnTurn,
            getPlayerOnTurn,
            getLastMove
        };
    })();
    
    return gameState;
}

module.exports = createGame;
