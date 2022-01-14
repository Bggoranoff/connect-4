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

            if(player.symbol == 1) {
                enableClicks();
            } else {
                disableClicks();
            }
        };
        break;
        case messages.VALID_MOVE.type: {
            let symbol = msg.symbol;
            let column = msg.column;
            let row = msg.row;
            visualiseMove(symbol, row, column);
            disableClicks();
        };
        break;
        case messages.OPPONENT_MOVE.type: {
            console.log(msg);
            let symbol = msg.symbol;
            let column = msg.column;
            let row = msg.row;
            visualiseMove(symbol, row, column);
            enableClicks();
        };
        break;
    }
}