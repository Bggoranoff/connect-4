var express = require('express');
var router = express.Router();
var stats = require("../stats");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("splash.ejs", {});
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

router.get('/win', function(req, res) {
  res.render("winning.ejs", {});
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
