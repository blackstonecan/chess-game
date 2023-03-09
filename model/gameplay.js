const { numberToString } = require("../helpers/toolbox");
const { Board } = require("./board");

class GamePlay {
    constructor(board = null, turn = 'W') {
        this.board = board || new Board();
        this.turn = turn;
    }

    interval() {
        this.board.calculateTargets();
        this.turn = this.turn == 'W' ? 'B' : 'W';
    }

    giveOutput() {
        console.log("--------------------");
        console.log(`Check: ${this.isCheck()}`);
        console.log(`Turn: ${this.turn}`)
        this.board.printBoard();
        this.printPlayablePieces();
    }

    move(piece, x, y) {
        this.board.makeMove(piece, x, y);
        this.interval();
    }

    getPieces() {
        return this.board.getPieces(this.turn);
    }

    isCheck() {
        return this.board.isCheck(this.turn);
    }

    playablePieces() {
        let pieces = this.getPieces();
        let playablePieces = [];
        for (let piece of pieces) {
            if (piece.getPotentialSquares(this.board).length) playablePieces.push(piece);
        }
        return playablePieces;
    }

    printPlayablePieces() {
        let playablePieces = this.playablePieces();
        let pieces = playablePieces.map(p => ({ name: p.letter, x: p.x, y: p.y }));
        console.log("Playable pieces:");
        for (let i = 0; i < pieces.length; i++) {
            console.log(`(${i}) | ${pieces[i].name} - ${numberToString(pieces[i].x)}${pieces[i].y}`);
        }
    }


}

module.exports = GamePlay;