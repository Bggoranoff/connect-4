(function(exports) {
        exports.MAKE_MOVE = {
            type: "MAKE-MOVE",
            move: null
        };
        exports.BEGIN_GAME = {
            type: "BEGIN-GAME",
            symbol: 0
        };
        exports.ABORT_GAME = {
            type: "ABORT-GAME"
        };
        exports.GAME_OVER = {
            type: "GAME-OVER"
        };
        exports.GAME_WON_BY = {
            type: "GAME-WON-BY"
        };
        exports.WANT_REMATCH = {
            type: "WANT-REMATCH"
        };
})(typeof exports === "undefined" ? (this.messages = {}) : exports);