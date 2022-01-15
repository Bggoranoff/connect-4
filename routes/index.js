var express = require('express');
var router = express.Router();
var stats = require("../stats");

/* GET home page. */
router.get('/', function(req, res, next) {
  let minutes = Math.round(stats.averagePlaytime / 60);
  minutes = minutes.toString().length == 1 ? "0" + minutes.toString() : minutes.toString();
  let seconds = stats.averagePlaytime % 60;
  seconds = seconds.toString().length == 1 ? "0" + seconds.toString() : seconds.toString();
  res.render("splash.ejs", { totalGames: Math.ceil(stats.totalGames), activeRooms: Math.floor(stats.activeRooms), minutes, seconds });
});


/* Pressing the 'PLAY' takes you to this page */
router.get('/play', function(req, res) {
  res.sendFile("game.html", {root: "./views"});
});

/* Pressing the 'HOW TO' takes you to this page */
router.get('/rules', function(req, res) {
  res.sendFile("rules.html", {root: "./views"});
});

router.get('/stats', function(req, res) {
  res.send(JSON.stringify(stats));
});

router.get('/*', function(req, res) {
  res.sendFile("error.html", {root: "./views"});
});



module.exports = router;
