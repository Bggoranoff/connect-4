const express = require("express");
const http = require("http");
const router = require("./routes");

const port = process.argv[2];
const app = express();

app.use('/', router);
http.createServer(app).listen(port);
