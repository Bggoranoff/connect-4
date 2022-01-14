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

    let playerSymbol = currentGame.addPlayer(ws);

    websockets[ws.id] = currentGame;
    if(playerSymbol == 2) {
        console.log("Second connected");
        let firstMessage = messages.BEGIN_GAME;
        firstMessage.symbol = playerSymbol;
        ws.send(JSON.stringify(firstMessage));
        let secondMessage = messages.BEGIN_GAME;
        secondMessage.symbol = 3 - playerSymbol;
        currentGame.getPlayer(3 - playerSymbol).send(JSON.stringify(secondMessage));
        currentGame = new GameState(++stats.activeRooms);
    }

    ws.on("message", bin => {
        let msg = JSON.parse(bin.toString());

        switch(msg.type) {
            case messages.MAKE_MOVE.type: {
                if(websockets[ws.id].getPlayerOnTurn() === playerSymbol) {
                    if(websockets[ws.id].makeMove(msg.column, playerSymbol)) {
                        let msg = messages.VALID_MOVE;
                        msg.symbol = playerSymbol;
                        msg.row = websockets[ws.id].lastMove[0];
                        msg.column = websockets[ws.id].lastMove[1];
                        ws.send(JSON.stringify(msg));

                        let opponentMsg = messages.OPPONENT_MOVE;
                        opponentMsg.symbol = playerSymbol;
                        opponentMsg.row = websockets[ws.id].lastMove[0];
                        opponentMsg.column = websockets[ws.id].lastMove[1];
                        let player = websockets[ws.id].getPlayer(3 - playerSymbol);
                        player.send(JSON.stringify(opponentMsg));

                        websockets[ws.id].setPlayerOnTurn(3 - playerSymbol);
                    } else {
                        let msg = messages.INVALID_MOVE;
                        ws.send(JSON.stringify(msg));
                    }
                }
                
                
            };
            break;
        }
    });
});

server.listen(port);
