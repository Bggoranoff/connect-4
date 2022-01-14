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

            if(msg.symbol == 1) {
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
            switch(msg.turn) {
                case "yours": disableClicks();
                break;
                case "opponents": enableClicks();
                break;
            }
            
        };
        break;
        case messages.INVALID_MOVE.type: {
            alert("Invalid move! Please choose another column!")
        }
        break;
    }
}