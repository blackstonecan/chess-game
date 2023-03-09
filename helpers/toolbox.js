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

const inputControl = (input, max) => {
    if (isNaN(input)) return false;
    if (input < 0 || input > max) return false;
    return true;
}

const printSquares = (squares) => {
    for (let i = 0; i < squares.length; i++) {
        console.log(`(${i}) : ${numberToString(squares[i].x)}${squares[i].y}`);
    }
}

module.exports = {
    numberToString,
    inputControl,
    printSquares
}