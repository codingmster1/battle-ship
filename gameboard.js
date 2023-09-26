const { Ship } = require("./ship");

const gameboardFactory = () => {
    const boardSize = 10;
    const board = Array(boardSize)
        .fill(null)
        .map(() => Array(boardSize).fill(null));

    const ships = [];

    // eslint-disable-next-line no-shadow
    const isValidPosition = (board, row, col, size, isVertical) => {

        if (isVertical) {
            if (row + size > board.length) {
                return false;
            }
            // eslint-disable-next-line no-plusplus
            for (let i = row; i < row + size; i++) {
                if (board[i][col] !== null) {
                    return false;
                }
            }
        } else {
            if (col + size > board.length) {
                return false;
            }
            // eslint-disable-next-line no-plusplus
            for (let j = col; j < col + size; j++) {
                if (board[row][j] !== null) {
                    return false;
                }
            }
        }

        return true;
    };

    const placeShip = (row, col, size, isVertical) => {

        const newShip = Ship(size);
        ships.push(newShip);
        if (isVertical === true) {


            // If isVertical is true it place the ship in a vertical consecutive way
            // eslint-disable-next-line no-plusplus
            for (let i = row; i < row + size; i++) {
                board[i][col] = newShip;
            }
        } else {
            // eslint-disable-next-line no-plusplus
            for (let j = col; j < col + size; j++) {
                // If isVertical is false it place the ship in a horizontal consecutive way
                board[row][j] = newShip;
            }
        }
    };

    const missedShots = [];

    function receiveAttack(row, col) {
        // this will working if I will not allow the player to attack a position already attacked
        if (board[row][col] === null) {
            missedShots.push({ row, col });
        } else {

            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < ships.length; i++) {
                const ship = ships[i];
                if (board[row][col] === ship) {
                    ship.hit();
                    if (ship.isSunk()) { /* empty */ }
                    break;
                }
            }
        }
    }

    function allShipSunk() {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < ships.length; i++) {
            if (!ships[i].isSunk()) {
                return false;
            }
        }
        return true;
    }

    return {
        board,
        placeShip,
        receiveAttack,
        ships,
        missedShots,
        allShipSunk,
        isValidPosition,
    };
};

module.exports = { gameboardFactory };