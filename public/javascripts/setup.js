const socket = new WebSocket(config.WEB_SOCKET_URL);

var player = new Player(socket);

socket.onmessage = function(event) {
    let msg = JSON.parse(event.data);
    if(msg.type === messages.MAKE_MOVE.type) {
        player.mark(3 - player.symbol, msg.move[0], msg.move[1]);
        player.setLastMove(msg.move[0], msg.move[1]);
        visualiseMove(2);
    }
}