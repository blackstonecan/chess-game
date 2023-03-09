class Movement {
    constructor(direction, distance, include = true) {
        this.direction = direction;
        this.distance = distance;
        this.include = include;
    }
}

class Rule{
    constructor(movements, isAttack = true) {
        this.movements = movements;
        this.isAttack = isAttack;
    }    
}

module.exports = {
    Movement,
    Rule
}