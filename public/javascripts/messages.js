(function(exports) {
        exports.MAKE_MOVE = {
            type: "MAKE-MOVE",
            column: null
        };
        exports.PLAYER_DATA = {
            type: "PLAYER_DATA",
            username: null
        };
        exports.TIMEOUT = {
            type: "TIMEOUT"
        };
        exports.VALID_MOVE = {
            type: "VALID-MOVE",
            symbol: null,
            row: null,
            column: null,
            turn: null
        };
        exports.INVALID_MOVE = {
            type: "INVALID-MOVE"
        };
        exports.BEGIN_GAME = {
            type: "BEGIN-GAME",
            symbol: 0,
            otherUsername: null
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