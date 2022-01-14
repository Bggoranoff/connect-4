var Player = function (socket) {

    var username;

    var otherUsername;

    var symbol;

    var makeMove = function (column) {
        console.log(column);
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

    var setSymbol = function(s) {
        this.symbol = s;
    };

    var timeout = function() {
        let msg = messages.TIMEOUT;
        socket.send(JSON.stringify(msg));
    };

    var rematch = function() {
        let msg = messages.WANT_REMATCH;
        socket.send(JSON.stringify(msg));
    }

    return {
        rematch,
        timeout,
        setOtherUsername, 
        otherUsername,
        setUsername,
        username,
        makeMove,
        symbol,
        setSymbol
    }
};