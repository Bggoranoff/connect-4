const express = require("express");
const http = require("http");
const router = require("./routes");
const websocket = require("ws");

const messages = require("./public/javascripts/messages");
const stats = require("./stats");
const GameState = require("./gameState");

if(process.argv.length < 3) {
    console.log("Error: expected a port as argument");
    process.exit(1);
}

const port = process.argv[2];
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use("/", router);

const server = http.createServer(app);
const wss = new websocket.Server({ server });

const websockets = {};

let connectionId = 0;
let currentGame = new GameState(stats.activeRooms);

wss.on("connection", ws => {
    ws.id = connectionId++;
    console.log("Connect");

    let playerSymbol = 0;
    let msg = messages.PLAYER_DATA;
    msg.username = null;
    ws.send(JSON.stringify(msg));

    ws.on("message", bin => {
        let msg = JSON.parse(bin.toString());

        switch(msg.type) {
            case messages.PLAYER_DATA.type: {
                let username = msg.username;
                ws.username = username;
                playerSymbol = currentGame.addPlayer(ws);

                websockets[ws.id] = currentGame;
                if(playerSymbol == 2) {
                    console.log("Second connected");
                    let firstMessage = messages.BEGIN_GAME;
                    firstMessage.otherUsername = currentGame.getPlayer(3 - playerSymbol).username;
                    firstMessage.symbol = playerSymbol;
                    ws.send(JSON.stringify(firstMessage));

                    let secondMessage = messages.BEGIN_GAME;
                    secondMessage.otherUsername = currentGame.getPlayer(playerSymbol).username;
                    secondMessage.symbol = 3 - playerSymbol;
                    currentGame.getPlayer(3 - playerSymbol).send(JSON.stringify(secondMessage));
                    currentGame = new GameState(stats.activeRooms++);
                }
            };
            break;
            case messages.MAKE_MOVE.type: {
                if(websockets[ws.id].getPlayerOnTurn() === playerSymbol) {
                    if(websockets[ws.id].makeMove(msg.column, playerSymbol)) {
                        let msg = messages.VALID_MOVE;
                        msg.symbol = playerSymbol;
                        msg.row = websockets[ws.id].lastMove[0];
                        msg.column = websockets[ws.id].lastMove[1];
                        msg.turn = "yours";
                        ws.send(JSON.stringify(msg));

                        msg.turn = "opponents";
                        let player = websockets[ws.id].getPlayer(3 - playerSymbol);
                        player.send(JSON.stringify(msg));

                        console.log(websockets[ws.id].getEnded());

                        if(websockets[ws.id].getEnded()) {
                            let winnerSymbol = websockets[ws.id].getWinner();
                            let winnerUsername = websockets[ws.id].getPlayer(winnerSymbol).username;
                            let gameOver = messages.GAME_OVER;
                            gameOver.winner = winnerUsername;

                            websockets[ws.id].getPlayer(winnerSymbol).send(JSON.stringify(gameOver));
                            websockets[ws.id].getPlayer(3 - winnerSymbol).send(JSON.stringify(gameOver));
                        }
                        websockets[ws.id].setPlayerOnTurn(3 - playerSymbol);
                    } else {
                        let msg = messages.INVALID_MOVE;
                        ws.send(JSON.stringify(msg));
                    }
                }
            };
            break;
            case messages.TIMEOUT.type: {
                let player = websockets[ws.id].getPlayer(3 - playerSymbol);
                websockets[ws.id].setPlayerOnTurn(3 - playerSymbol);
                player.send(JSON.stringify(msg));
            }
            break;
        }
    });
});

server.listen(port);
