const { Rule } = require("./move");
const { Pawn, Rook, Bishop, Knight, Queen, King } = require("./piece");

class Square {
    constructor(x, y, color, piece = null) {
        this.x = x;
        this.y = y;
        this.piece = piece;
        this.color = color;
    }
}

class Board {
    constructor(clean = false) {
        this.squares = [];
        this.white = {
            pieces: [],
            targets: []
        };
        this.black = {
            pieces: [],
            targets: []
        };
        this.initBoard();
        if (!clean) {
            this.initWhitePieces();
            this.initBlackPieces();
            this.calculateTargets();
        }
    }

    initBoard() {
        for (let i = 1; i < 9; i++) {
            for (let j = 1; j < 9; j++) {
                let color = (i + j) % 2 == 0 ? 'B' : 'W';
                this.squares.push(new Square(i, j, color));
            }
        }
    }

    initWhitePieces() {
        let mainIndex = 1;
        let color = 'W';
        // Pawns
        for (let i = 1; i < 9; i++) {
            let pawn = new Pawn(color);
            this.putPiece(pawn, i, mainIndex + 1);
        }

        // Rooks
        for (let i = 1; i < 9; i += 7) {
            let rook = new Rook(color);
            this.putPiece(rook, i, mainIndex);
        }

        // Bishops
        for (let i = 3; i < 9; i += 3) {
            let bishop = new Bishop(color);
            this.putPiece(bishop, i, mainIndex);
        }

        // Knights
        for (let i = 2; i < 9; i += 5) {
            let knight = new Knight(color);
            this.putPiece(knight, i, mainIndex);
        }

        // Queen
        let queen = new Queen(color);
        this.putPiece(queen, 4, mainIndex);

        // King
        let king = new King(color);
        this.putPiece(king, 5, mainIndex);
    }

    initBlackPieces() {
        let mainIndex = 8;
        let color = 'B';
        // Pawns
        for (let i = 1; i < 9; i++) {
            let pawn = new Pawn(color);
            this.putPiece(pawn, i, mainIndex - 1);
        }

        // Rooks
        for (let i = 1; i < 9; i += 7) {
            let rook = new Rook(color);
            this.putPiece(rook, i, mainIndex);
        }

        // Bishops
        for (let i = 3; i < 9; i += 3) {
            let bishop = new Bishop(color);
            this.putPiece(bishop, i, mainIndex);
        }

        // Knights
        for (let i = 2; i < 9; i += 5) {
            let knight = new Knight(color);
            this.putPiece(knight, i, mainIndex);
        }

        // Queen
        let queen = new Queen(color);
        this.putPiece(queen, 4, mainIndex);

        // King
        let king = new King(color);
        this.putPiece(king, 5, mainIndex);
    }

    getSquare(x, y) {
        if (!this.squares.find(s => s.x == x && s.y == y)) throw new Error(`Square (${x}, ${y}) does not exist`);
        return this.squares.find(s => s.x == x && s.y == y);
    }

    showRuleSquares(rule, square) {
        if (square.piece == null) {
            console.log("***************************");
            this.printBoard();
            console.log(square);
            console.log(rule);

            throw new Error('Square does not have a piece');
        }

        let squares = [];
        let [x, y] = [square.x, square.y];

        for (let movement of rule.movements) {
            for (let i = 1; i <= movement.distance; i++) {
                switch (movement.direction) {
                    case 'N':
                        y++;
                        break;
                    case 'NE':
                        x++;
                        y++;
                        break;
                    case 'E':
                        x++;
                        break;
                    case 'SE':
                        x++;
                        y--;
                        break;
                    case 'S':
                        y--;
                        break;
                    case 'SW':
                        x--;
                        y--;
                        break;
                    case 'W':
                        x--;
                        break;
                    case 'NW':
                        x--;
                        y++;
                        break;
                }
                if (x < 1 || x > 8 || y < 1 || y > 8) break;

                if (movement.include) {
                    let target = this.getSquare(x, y);
                    if (target.piece) {
                        if (target.piece.color != square.piece.color && rule.isAttack) squares.push(target);
                        break;
                    } else {
                        squares.push(target);
                    }
                }
            }
        }
        return squares;
    }

    putPiece(piece, x, y) {
        this.getSquare(x, y).piece = piece;
        piece.put(x, y, this);
        if (piece.color == 'W') this.white.pieces.push(piece);
        else if (piece.color == 'B') this.black.pieces.push(piece);
        else throw new Error(`Invalid piece color: ${piece.color}`);
    }

    printBoard() {
        let board = "";
        for (let i = 8; i > 0; i--) {
            board += i + " ";
            for (let j = 1; j < 9; j++) {
                let square = this.getSquare(j, i);
                if (square.piece) board += square.piece.letter;
                else board += "O";
                board += " ";
            }
            board += "\n";
        }
        board += "  A B C D E F G H\n";

        console.log(board);
    }

    clone() {
        let board = new Board(true);
        for (let square of this.squares) {
            if (square.piece) {
                board.putPiece(square.piece.clone(), square.x, square.y);
            }
        }
        return board;
    }

    calculateTargets() {
        for (let color of ["W", "B"]) {
            let pieces;
            if (color == 'W') pieces = this.white.pieces;
            else if (color == 'B') pieces = this.black.pieces;
            else throw new Error(`Invalid color: ${color}`);

            let targets = [];

            for (let piece of pieces) {
                let squares = piece.getTargetSquares();
                for (let square of squares) {
                    if (!targets.find(t => t.x == square.x && t.y == square.y)) targets.push(square);
                }
            }

            if (color == 'W') this.white.targets = targets;
            else if (color == 'B') this.black.targets = targets;
            else throw new Error(`Invalid color: ${color}`);
        }
    }

    getPieces(color) {
        if (color == 'W') return this.white.pieces;
        else if (color == 'B') return this.black.pieces;
        else throw new Error(`Invalid color: ${color}`);
    }

    makeMove(piece, x, y) {
        if (this.getSquare(x, y).piece) this.deletePiece(this.getSquare(x, y).piece);
        this.getSquare(piece.x, piece.y).piece = null;
        this.getSquare(x, y).piece = piece;
        this.updatePiece(piece);
        piece.move(x, y);
    }

    isCheck(color) {
        let king = this.getPieces(color).find(p => p.letter == 'K');

        let targets;
        if (color == 'W') targets = this.black.targets;
        else if (color == 'B') targets = this.white.targets;
        else throw new Error(`Invalid color: ${color}`);

        if (targets.find(t => t.x == king.x && t.y == king.y)) return true;
        else return false;
    }

    isCheckWithMove(piece, x, y) {
        let board = this.clone();
        piece = board.getPieces(piece.color).find(p => p.x == piece.x && p.y == piece.y);
        board.makeMove(piece, x, y);
        board.calculateTargets();
        return board.isCheck(piece.color);
    }

    updatePiece(piece) {
        if (piece.color == 'W') {
            for (let i = 0; i < this.white.pieces.length; i++) {
                if (this.white.pieces[i].x == piece.x && this.white.pieces[i].y == piece.y && this.white.pieces[i].letter == piece.letter) {
                    this.white.pieces[i] = piece;
                    break;
                }
            }
        } else if (piece.color == 'B') {
            for (let i = 0; i < this.black.pieces.length; i++) {
                if (this.black.pieces[i].x == piece.x && this.black.pieces[i].y == piece.y && this.black.pieces[i].letter == piece.letter) {
                    this.black.pieces[i] = piece;
                    break;
                }
            }
        } else throw new Error(`Invalid piece color: ${piece.color}`);
    }

    deletePiece(piece) {
        if (piece.color == 'W') {
            for (let i = 0; i < this.white.pieces.length; i++) {
                if (this.white.pieces[i].x == piece.x && this.white.pieces[i].y == piece.y && this.white.pieces[i].letter == piece.letter) {
                    this.white.pieces.splice(i, 1);
                    break;
                }
            }
        } else if (piece.color == 'B') {
            for (let i = 0; i < this.black.pieces.length; i++) {
                if (this.black.pieces[i].x == piece.x && this.black.pieces[i].y == piece.y && this.black.pieces[i].letter == piece.letter) {
                    this.black.pieces.splice(i, 1);
                    break;
                }
            }
        } else throw new Error(`Invalid piece color: ${piece.color}`);
    }
}

module.exports = {
    Board
}