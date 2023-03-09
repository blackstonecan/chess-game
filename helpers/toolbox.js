const numberToString = (number) => {
    let result = "";
    if (number == 1) result = "A";
    else if (number == 2) result = "B";
    else if (number == 3) result = "C";
    else if (number == 4) result = "D";
    else if (number == 5) result = "E";
    else if (number == 6) result = "F";
    else if (number == 7) result = "G";
    else if (number == 8) result = "H";
    else throw new Error("Invalid number");
    return result;
}

const stringToNumber = (string) => {
    let result = 0;
    if (string == "A") result = 1;
    else if (string == "B") result = 2;
    else if (string == "C") result = 3;
    else if (string == "D") result = 4;
    else if (string == "E") result = 5;
    else if (string == "F") result = 6;
    else if (string == "G") result = 7;
    else if (string == "H") result = 8;
    else throw new Error("Invalid string");
    return result;
}

const inputControl = (input, max) => {
    if (isNaN(input)) return false;
    if (input < 0 || input > max) return false;
    return true;
}

const movementInputControl = (input) => {
    let pieceLetter = input[0];
    if (pieceLetter != "K" && pieceLetter != "Q" && pieceLetter != "R" && pieceLetter != "B" && pieceLetter != "N" && pieceLetter != "P") return false;

    stringToNumber(input[1]);
    if(!inputControl(input[2], 8)) return false;

    return true;
}

const printSquares = (squares) => {
    for (let i = 0; i < squares.length; i++) {
        console.log(`(${i}) : ${numberToString(squares[i].x)}${squares[i].y}`);
    }
}

module.exports = {
    numberToString,
    stringToNumber,
    inputControl,
    printSquares,
    movementInputControl
}