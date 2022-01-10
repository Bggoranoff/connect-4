var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("splash.ejs", {});
});


/* Pressing the 'PLAY' takes you to this page */
router.get('/play', function(req, res) {
  res.render("game.ejs", {root: "./views"});
});


module.exports = router;
