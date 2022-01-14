var express = require('express');
var router = express.Router();
var stats = require("../stats");

/* GET home page. */
router.get('/', function(req, res, next) {
  let minutes = stats.averagePlaytime / 60;
  minutes = minutes.toString().length == 1 ? "0" + minutes.toString() : minutes.toString();
  let seconds = stats.averagePlaytime % 60;
  seconds = seconds.toString().length == 1 ? "0" + seconds.toString() : seconds.toString();
  res.render("splash.ejs", { totalGames: stats.totalGames, activeRooms: stats.activeRooms, minutes, seconds });
});


/* Pressing the 'PLAY' takes you to this page */
router.get('/play', function(req, res) {
  res.render("game.ejs", {root: "./views"});
});

/* Pressing the 'HOW TO' takes you to this page */
router.get('/rules', function(req, res) {
  res.render("rules.ejs", {});
});

router.get('/waiting', function(req, res) {
  res.render("waiting.ejs", {});
});

router.get('/loss', function(req, res) {
  res.render("losing.ejs", {});
});

router.get('/stats', function(req, res) {
  res.send(JSON.stringify(stats));
});

router.get('/*', function(req, res) {
  res.render("error.ejs", {});
});



module.exports = router;
