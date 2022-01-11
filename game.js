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

    return {
        firstPlayer,
        secondPlayer,
        board,
        ended,
        lastMove,
        winner
    };
})();