(function(exports) {
        exports.MAKE_MOVE = {
            type: "MAKE-MOVE",
            move: null
        };
        exports.BEGIN_GAME = "BEGIN-GAME";
        exports.ABORT_GAME = "ABORT-GAME";
        exports.GAME_OVER = "GAME-OVER";
        exports.GAME_WON_BY = "GAME-WON-BY";
        exports.WANT_REMATCH = "WANT-REMATCH";
})(typeof exports === "undefined" ? (this.messages = {}) : exports);