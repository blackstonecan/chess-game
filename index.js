const prompt = require('prompt-sync')({ sigint: true });
const { inputControl, printSquares } = require('./helpers/toolbox');
const GamePlay = require('./model/gameplay');

let game = new GamePlay();

let input = "";
let piece;
let square;

while (true) {
    console.log("Enter F to finish the game\n");
    game.giveOutput();

    { // Piece selection
        input = prompt("Enter your piece index : ");
        if (input == "F") {
            console.log("\nGame over");
            break;
        }
        if (!inputControl(input, game.playablePieces().length - 1)) {
            console.log("Invalid input");
            continue;
        }
    }

    { // Move selection
        piece = game.playablePieces()[input];
        let potentialSquares = piece.getPotentialSquares(game.board);
        printSquares(potentialSquares);

        input = prompt("Enter your move index : ");
        if (input == "F") {
            console.log("\nGame over");
            break;
        }
        if (!inputControl(input, potentialSquares.length - 1)) {
            console.log("Invalid input");
            continue;
        }

        square = potentialSquares[input];
    }

    { // Move execution
        game.move(piece, square.x, square.y);
    }
}