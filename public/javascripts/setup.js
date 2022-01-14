const socket = new WebSocket(config.WEB_SOCKET_URL);

let player = new Player(socket);
let username = sessionStorage.getItem("playerUsername") == null ? "guest" : sessionStorage.getItem("playerUsername");
player.setUsername(username);

document.getElementById("winningBlock").style.display = "none";
document.getElementById("losingBlock").style.display = "none";
document.getElementById("screenMessage").remove();
document.getElementById("gameScreen").remove();
document.getElementById("gameScreen").style.visibility = "hidden";
document.getElementById("screenMessage").style.visibility = "visible";

socket.onmessage = function(event) {
    let msg = JSON.parse(event.data);
    switch(msg.type) {
        case messages.PLAYER_DATA.type: {
            let msg = messages.PLAYER_DATA;
            msg.username = username;

            socket.send(JSON.stringify(msg));
        };
        break;
        case messages.BEGIN_GAME.type: {
            document.getElementById("gameScreen").style.visibility = "visible";
            document.getElementById("screenMessage").remove();

            document.getElementById("usernameFirst").innerText = player.username;
            document.getElementById("usernameSecond").innerText = msg.otherUsername;

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
        case messages.TIMEOUT.type: {
            enableClicks();
        };
        break;
    }
}