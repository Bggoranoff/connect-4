var Player = function (socket) {

    var username;

    var otherUsername;

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

    var timeout = function() {
        let msg = messages.TIMEOUT;
        socket.send(JSON.stringify(msg));
    }

    return {
        timeout,
        setOtherUsername, 
        otherUsername,
        setUsername,
        username,
        makeMove,
    }
};