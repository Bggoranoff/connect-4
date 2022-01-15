const socket = new WebSocket(config.WEB_SOCKET_URL);

const shadowStyle = "#3498db 1px 1px 7px,".repeat(6).slice(0, -1);

let player = new Player(socket);
let username = (sessionStorage.getItem("playerUsername") == null || sessionStorage.getItem("playerUsername") == "")
    ? "guest"
    : sessionStorage.getItem("playerUsername");
player.setUsername(username);

document.getElementById("winningBlock").style.display = "none";
document.getElementById("losingBlock").style.display = "none";
document.getElementById("gameBlock").style.display = "none";
document.getElementById("screenMessage").style.visibility = "visible";

socket.onmessage = function (event) {
    let msg = JSON.parse(event.data);
    switch (msg.type) {
        case messages.PLAYER_DATA.type: {
            let msg = messages.PLAYER_DATA;
            msg.username = username;

            socket.send(JSON.stringify(msg));
        };
            break;
        case messages.BEGIN_GAME.type: {
            document.getElementById("gameBlock").style.display = "block";
            document.getElementById("screenMessage").remove();

            document.getElementById("usernameFirst").innerText = player.getUsername();
            document.getElementById("usernameSecond").innerText = msg.otherUsername;
            player.setSymbol(msg.symbol);

            if (msg.symbol == 1) {
                startTimer();
                enableClicks();
            } else {
                resetTimer();
                disableClicks();
            }
        };
            break;
        case messages.VALID_MOVE.type: {
            let symbol = msg.symbol;
            let column = msg.column;
            let row = msg.row;
            visualiseMove(symbol, row, column);
            switch (msg.turn) {
                case "yours": {
                    resetTimer();
                    disableClicks();
                }
                    break;
                case "opponents": {
                    startTimer();
                    enableClicks();
                }
                    break;
            }

        };
            break;
        case messages.INVALID_MOVE.type: {
            alert("Invalid move!");
        }
            break;
        case messages.TIMEOUT.type: {
            startTimer();
            enableClicks();
        };
            break;
        case messages.GAME_OVER.type: {
            disableClicks();
            if (msg.winner === player.getSymbol()) {
                setTimeout(visualiseWinningScreen, 4000);
            } else {
                setTimeout(visualiseLosingScreen, 4000);
            }
        }
            break;
        case messages.ABORT_GAME.type: {
            document.getElementsByClassName("rematch")[0].disabled = "true";
            document.getElementsByClassName("rematch")[0].style.animation = "none";
            document.getElementsByClassName("rematch")[0].style.backgroundImage = 'url("/images/splash/buttonSelected.png")';
            showNotification("Your opponent left!");
            resetTimer();
            [...document.getElementsByClassName("noselect alertSection")].forEach(popUp => {
                popUp.addEventListener("click", () => {
                    location.replace("/");
                });
            });
        };
            break;
        case messages.WANT_REMATCH.type: {
            clearBoard();
            if (player.getSymbol() === msg.symbol) {
                startTimer();
                enableClicks();
            } else {
                resetTimer();
                disableClicks();
            }
        };
            break;
    }
}