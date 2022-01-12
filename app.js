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

app.use(function(req, res) {
    res.render("error.ejs", {});
});

const server = http.createServer(app);
const wss = new websocket.Server({ server });

const websockets = {};

let connectionId = 0;
let currentGame = new GameState(0);

wss.on("connection", ws => {
    ws.id = connectionId++;

    let playerSymbol = currentGame.addPlayer(ws);
    if(playerSymbol == 0) {
        currentGame = new GameState(++stats.activeRooms);
        playerSymbol = currentGame.addPlayer(ws);
    }

    websockets[ws.id] = currentGame;

    // console.log(currentGame);

    ws.on("message", bin => {
        let msg = JSON.parse(bin.toString());
        
        if(msg.type === messages.MAKE_MOVE.type) {
            websockets[ws.id].mark(playerSymbol, msg.move[0], msg.move[1]);
            let player = currentGame.getPlayer(3 - playerSymbol);
            player.send(JSON.stringify(msg));
        }
        console.log(msg);
    });
});

server.listen(port);
