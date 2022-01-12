const express = require("express");
const http = require("http");
const router = require("./routes");
const websocket = require("ws");

const messages = require("./public/javascripts/messages");
const stats = require("./stats");

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

server.listen(port);
