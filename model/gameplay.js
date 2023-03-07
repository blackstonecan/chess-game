const { Board } = require("./board");

class GamePlay {
    constructor(board = null, turn = 'W') {
        this.board = board || new Board();
        this.turn = turn;
        this.board.printBoard();
    }

    move(piece, x, y) {
        this.board.makeMove(piece, x, y);
        this.board.printBoard();
    }

    getPieces(){
        return this.board.getPieces(this.turn);
    }
}

module.exports = GamePlay;