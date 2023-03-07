const { Board } = require('./model/board');
const GamePlay = require('./model/gameplay');
const { Pawn, Rook, Bishop, Knight, Queen, King } = require('./model/piece');

let game = new GamePlay();
let pieces = game.getPieces();
game.move(pieces[0], 1, 3);