const socket = new WebSocket(config.WEB_SOCKET_URL);

var player = new Player(socket);

document.getElementById("gameScreen").style.visibility = "hidden";
document.getElementById("screenMessage").style.visibility = "visible";

socket.onmessage = function(event) {
    let msg = JSON.parse(event.data);
    switch(msg.type) {
        case messages.BEGIN_GAME.type: {
            document.getElementById("gameScreen").style.visibility = "visible";
            document.getElementById("screenMessage").remove();
            player.setSymbol(msg.symbol);
        };
        break;
        case messages.MAKE_MOVE.type: {
            player.mark(3 - player.symbol, msg.move[0], msg.move[1]);
            player.setLastMove(msg.move[0], msg.move[1]);
            visualiseMove(3 - player.symbol);
        };
        break;
    }
}