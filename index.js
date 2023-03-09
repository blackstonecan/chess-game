const prompt = require('prompt-sync')({ sigint: true });
const { inputControl, printSquares, movementInputControl, stringToNumber, numberToString } = require('./helpers/toolbox');
const GamePlay = require('./model/gameplay');

let game = new GamePlay();

let input = "";
let piece;
let square;

while (true) {
    console.log("Enter F to finish the game\n");
    game.giveOutput();
    
    { // Move Input
        input = prompt("Enter your move : ");
        if (input == "F") {
            console.log("\nGame over");
            break;
        }
        if (!movementInputControl(input)) {
            console.log("Invalid input");
            continue;
        }

        let pieceLetter = input[0];
        let targetX = stringToNumber(input[1]);
        let targetY = input[2];
        square = game.board.getSquare(targetX, targetY);

        let pieces = game.playablePieces().filter(p => p.letter == pieceLetter && p.getPotentialSquares().find(s => s.x == targetX && s.y == targetY));
        if (pieces.length == 0) {
            console.log("Invalid input");
            continue;
        }
        if (pieces.length > 1) {
            console.log("Pieces which can move to this square:");
            for (let i = 0; i < pieces.length; i++) {
                console.log(`(${i}) | ${pieces[i].letter} - ${numberToString(pieces[i].x)}${pieces[i].y}`);
            }
            input = prompt("Enter your piece index : ");
            if (input == "F") {
                console.log("\nGame over");
                break;
            }
            if (!inputControl(input, pieces.length - 1)) {
                console.log("Invalid input");
                continue;
            }

            piece = pieces[input];
        } else {
            piece = pieces[0];
        }
    }

    { // Move execution
        game.move(piece, square.x, square.y);
    }
}