const { Movement, Rule } = require("./move");

class Piece {
    constructor(letter, value, color, touched = false) {
        this.letter = letter;
        this.value = value;
        this.color = color;
        this.touched = touched;
    }

    put(x, y, board) {
        this.x = x;
        this.y = y;
        this.board = board;
    }

    move(x, y){
        this.x = x;
        this.y = y;
        this.touched = true;
    }
}

class Pawn extends Piece {
    constructor(color, touched = false) {
        super('P', 1, color, touched);
        this.fmr = this.getFMR(color);
        this.amr = this.getAMR(color);
        this.gmr = this.getGMR(color);
    }

    getFMR(color) {
        if (color == 'W') {
            return new Rule([
                new Movement("N", 2)
            ]);
        } else if (color == 'B') {
            return new Rule([
                new Movement("S", 2)
            ]);
        } else throw new Error("Invalid color");
    }

    getAMR(color) {
        if (color == 'W') {
            return new Rule([
                new Movement("NE", 1),
                new Movement("NW", 1)
            ]);
        } else if (color == 'B') {
            return new Rule([
                new Movement("SE", 1),
                new Movement("SW", 1)
            ]);
        } else throw new Error("Invalid color");
    }

    getGMR(color) {
        if (color == 'W') {
            return new Rule([
                new Movement("N", 1)
            ]);
        } else if (color == 'B') {
            return new Rule([
                new Movement("S", 1)
            ]);
        } else throw new Error("Invalid color");
    }

    getPotentialSquares(board) {
        let potentialSquares = [];

        let attackSquares = board.showRuleSquares(this.amr, board.getSquare(this.x, this.y));
        for (let square of attackSquares) {
            if (square.piece && square.piece.color != this.color) potentialSquares.push(square);
        }

        if (!this.touched) potentialSquares.push(...board.showRuleSquares(this.fmr, board.getSquare(this.x, this.y)));
        else potentialSquares.push(...board.showRuleSquares(this.gmr, board.getSquare(this.x, this.y)));

        return potentialSquares;
    }

    getTargetSquares(board) {
        let targetSquares = board.showRuleSquares(this.amr, board.getSquare(this.x, this.y));
        return targetSquares;
    }

    clone() {
        return new Pawn(this.color, this.touched);
    }
}

class Rook extends Piece {
    constructor(color, touched = false) {
        super('R', 5, color, touched);
        this.gmr = this.getGMR();
    }

    getGMR() {
        return [
            new Rule([
                new Movement("N", 8)
            ]),
            new Rule([
                new Movement("E", 8)
            ]),
            new Rule([
                new Movement("A", 8)
            ]),
            new Rule([
                new Movement("W", 8)
            ]),
        ];
    }

    getPotentialSquares(board) {
        let potentialSquares = [];

        for (let rule of this.gmr) {
            potentialSquares.push(...board.showRuleSquares(rule, board.getSquare(this.x, this.y)));
        }

        return potentialSquares;
    }

    getTargetSquares(board) {
        return this.getPotentialSquares(board);
    }

    clone() {
        return new Rook(this.color, this.touched);
    }
}

class Bishop extends Piece {
    constructor(color, touched = false) {
        super('B', 3, color, touched);
        this.gmr = this.getGMR();
    }

    getGMR() {
        return [
            new Rule([
                new Movement("NE", 8)
            ]),
            new Rule([
                new Movement("NW", 8)
            ]),
            new Rule([
                new Movement("SE", 8)
            ]),
            new Rule([
                new Movement("SW", 8)
            ]),
        ];
    }

    getPotentialSquares(board) {
        let potentialSquares = [];

        for (let rule of this.gmr) {
            potentialSquares.push(...board.showRuleSquares(rule, board.getSquare(this.x, this.y)));
        }

        return potentialSquares;
    }
    
    getTargetSquares(board) {
        return this.getPotentialSquares(board);
    }

    clone() {
        return new Bishop(this.color, this.touched);
    }
}

class Knight extends Piece {
    constructor(color, touched = false) {
        super('N', 3, color, touched);
        this.gmr = this.getGMR();
    }

    getGMR() {
        return [
            new Rule([
                new Movement("N", 1, false),
                new Movement("NE", 1)
            ]),
            new Rule([
                new Movement("N", 1, false),
                new Movement("NW", 1)
            ]),
            new Rule([
                new Movement("S", 1, false),
                new Movement("SE", 1)
            ]),
            new Rule([
                new Movement("S", 1, false),
                new Movement("SW", 1)
            ]),
            new Rule([
                new Movement("E", 1, false),
                new Movement("NE", 1)
            ]),
            new Rule([
                new Movement("E", 1, false),
                new Movement("SE", 1)
            ]),
            new Rule([
                new Movement("W", 1, false),
                new Movement("NW", 1)
            ]),
            new Rule([
                new Movement("W", 1, false),
                new Movement("SW", 1)
            ])
        ];
    }

    getPotentialSquares(board) {
        let potentialSquares = [];

        for (let rule of this.gmr) {
            potentialSquares.push(...board.showRuleSquares(rule, board.getSquare(this.x, this.y)));
        }

        return potentialSquares;
    }

    getTargetSquares(board) {
        return this.getPotentialSquares(board);
    }

    clone() {
        return new Knight(this.color, this.touched);
    }
}

class Queen extends Piece {
    constructor(color, touched = false) {
        super('Q', 9, color, touched);
        this.gmr = this.getGMR();
    }

    getGMR() {
        return [
            new Rule([
                new Movement("N", 8)
            ]),
            new Rule([
                new Movement("E", 8)
            ]),
            new Rule([
                new Movement("W", 8)
            ]),
            new Rule([
                new Movement("S", 8)
            ]),
            new Rule([
                new Movement("NE", 8)
            ]),
            new Rule([
                new Movement("NW", 8)
            ]),
            new Rule([
                new Movement("SE", 8)
            ]),
            new Rule([
                new Movement("SW", 8)
            ])
        ];
    }

    getPotentialSquares(board) {
        let potentialSquares = [];

        for (let rule of this.gmr) {
            potentialSquares.push(...board.showRuleSquares(rule, board.getSquare(this.x, this.y)));
        }

        return potentialSquares;
    }
    
    getTargetSquares(board) {
        return this.getPotentialSquares(board);
    }

    clone() {
        return new Queen(this.color, this.touched);
    }
}

class King extends Piece {
    constructor(color, touched = false) {
        super('K', 1000, color, touched);
        this.gmr = this.getGMR();
    }

    getGMR() {
        return [
            new Rule([
                new Movement("N", 1)
            ]),
            new Rule([
                new Movement("E", 1)
            ]),
            new Rule([
                new Movement("W", 1)
            ]),
            new Rule([
                new Movement("S", 1)
            ]),
            new Rule([
                new Movement("NE", 1)
            ]),
            new Rule([
                new Movement("NW", 1)
            ]),
            new Rule([
                new Movement("SE", 1)
            ]),
            new Rule([
                new Movement("SW", 1)
            ])
        ];
    }

    getPotentialSquares(board) {
        let potentialSquares = [];

        for (let rule of this.gmr) {
            potentialSquares.push(...board.showRuleSquares(rule, board.getSquare(this.x, this.y)));
        }

        return potentialSquares;
    }

    getTargetSquares(board) {
        return this.getPotentialSquares(board);
    }

    clone() {
        return new King(this.color, this.touched);
    }
}

module.exports = {
    Piece,
    Pawn,
    Rook,
    Bishop,
    Knight,
    Queen,
    King
}