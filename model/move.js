class Movement {
    constructor(direction, distance, include = true) {
        this.direction = direction;
        this.distance = distance;
        this.include = include;
    }
}

class Rule{
    constructor(movements) {
        this.movements = movements;
    }    
}

module.exports = {
    Movement,
    Rule
}