var Player = function (socket) {

    var username;

    var symbol;

    var makeMove = function (column) {
        let msg = messages.MAKE_MOVE;
        msg.column = column;
        socket.send(JSON.stringify(msg));
    };

    var setUsername = function(u) {
        username = u;
    };

    var getUsername = function () {
        return username;
    };

    var setSymbol = function(s) {
        symbol = s;
    };

    var getSymbol = function () {
        return symbol;
    };

    var timeout = function() {
        let msg = messages.TIMEOUT;
        socket.send(JSON.stringify(msg));
    };

    var rematch = function() {
        let msg = messages.WANT_REMATCH;
        socket.send(JSON.stringify(msg));
    };

    return {
        rematch,
        timeout,
        setUsername,
        getUsername,
        makeMove,
        setSymbol,
        getSymbol
    }
};