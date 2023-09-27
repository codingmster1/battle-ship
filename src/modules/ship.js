import shipTypes from './shipTypes';

function Ship(shipType) {
    const type = shipType;
    const length = shipTypes[shipType].length;
    let hits = 0;
    let squares;
    let alignment;
    function hit() {
        this.hits++;
    }
    function isSunk() {
        if (this.hits >= this.length) return true;
        else return false;
    }
    return {
        type,
        length,
        hits,
        squares,
        alignment,
        hit,
        isSunk
    }
}

export default Ship;