const socket = new WebSocket(config.WEB_SOCKET_URL);

let player = new Player(socket);
let username = sessionStorage.getItem("playerUsername") == null ? "guest" : sessionStorage.getItem("playerUsername");
player.setUsername(username);

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
            player.setSymbol(msg.symbol);

            document.getElementById("usernameFirst").innerText = player.username;
            document.getElementById("usernameSecond").innerText = msg.otherUsername;

            if(player.symbol == 1) {
                enableClicks();
            } else {
                disableClicks();
            }
        };
        break;
        case messages.MAKE_MOVE.type: {
            player.mark(3 - player.symbol, msg.move[0], msg.move[1]);
            player.setLastMove(msg.move[0], msg.move[1]);
            visualiseMove(3 - player.symbol);
            enableClicks();
        };
        break;
    }
}