import { Ship } from './ship';
import { randomInteger } from './player';

// eslint-disable-next-line consistent-return
export function findIndex(arr, target) {
    for (let i = 0; i < arr.length; i += 1) {
        if (arr[i][0] === target[0] && arr[i][1] === target[1]) {
            return i;
        }
    }
}

// Return random x or y position
function randomPosition() {
    const randomInt = randomInteger(0, 1);
    if (randomInt === 0) return 'x';
    return 'y';
}

// Return random coordinates based on random position & specified ship length
function randomCoordRandomPos(position, shipLength) {
    let randomX;
    let randomY;
    if (position === 'x') {
        randomX = randomInteger(0, 9);
        randomY = randomInteger(0, (9 - (shipLength - 1)));
    } else {
        randomX = randomInteger((0 + (shipLength - 1)), 9);
        randomY = randomInteger(0, 9);
    }
    const randomCoord = [randomX, randomY];
    return randomCoord;
}

export const Gameboard = () => {
    // Build array of coordinates
    const buildBoard = () => {
        const board = [];
        for (let j = 0; j < 10; j += 1) {
            for (let i = 0; i < 10; i += 1) {
                board.push([j, i]);
            }
        }
        return board;
    };

    // Build array w/ info object for each gameboard square
    const buildObjList = (arr) => {
        const newArr = [];
        for (let i = 0; i < arr.length; i += 1) {
            newArr[i] = {
                ship: null,
                attacked: null,
            };
        }
        return newArr;
    };

    const board = buildBoard();
    const objList = buildObjList(board);

    // Return true if there is no ship overlap & ship is 1 space apart from other ships
    const avoidOverlap = (coord, shipLength, position) => {
        let allClear = true;
        const target = [coord[0], coord[1]];
        const index = findIndex(board, target);
        if (objList[index].ship != null) allClear = false;

        function checkLeft(ind) {
            if (objList[ind - 1] !== undefined && objList[ind - 1].ship !== null) allClear = false;
        }

        function checkRight(ind) {
            if (objList[ind + 1] !== undefined && objList[ind + 1].ship !== null) allClear = false;
        }

        function checkAbove(ind) {
            if (objList[ind - 10] !== undefined && objList[ind - 10].ship !== null) allClear = false;
        }

        function checkBelow(ind) {
            if (objList[ind + 10] !== undefined && objList[ind + 10].ship !== null) allClear = false;
        }

        checkLeft(index);
        checkRight(index);
        checkAbove(index);
        checkBelow(index);

        if (position === 'x') {
            for (let i = 1; i < shipLength; i += 1) {
                if (objList[index + i].ship != null) allClear = false;
                checkRight(index + i);
                checkAbove(index + i);
                checkBelow(index + i);
            }
        } else {
            let j = 10;
            for (let i = 1; i < shipLength; i += 1) {
                if (objList[index - j].ship != null) allClear = false;
                checkLeft(index - j);
                checkRight(index - j);
                checkAbove(index - j);
                j += 10;
            }
        }
        return allClear;
    };

    // Place ship at specific coordinates
    const placeShip = (coord, shipLength, position) => {
        const newShip = Ship(shipLength);
        const target = [coord[0], coord[1]];
        const index = findIndex(board, target);
        objList[index].ship = newShip;

        if (position === 'x') {
            for (let i = 1; i < shipLength; i += 1) {
                objList[index + i].ship = newShip;
            }
        } else {
            let j = 10;
            for (let i = 1; i < shipLength; i += 1) {
                objList[index - j].ship = newShip;
                j += 10;
            }
        }
    };

    // Place all ships randomly on gameboard
    const placeRandomShips = () => {
        function placePresets(shipLength) {
            const shipPos = randomPosition();
            const shipCoord = randomCoordRandomPos(shipPos, shipLength);
            // Place ship on board if there is no overlap, otherwise recursively call f(x)
            if (avoidOverlap(shipCoord, shipLength, shipPos) === true) {
                placeShip(shipCoord, shipLength, shipPos);
            } else {
                placePresets(shipLength);
            }
        }

        // Place each preset battleship on board
        placePresets(5);
        placePresets(4);
        placePresets(3);
        placePresets(3);
        placePresets(2);
    };

    // Check if a square contains a ship
    const hasShip = (coord) => {
        const target = [coord[0], coord[1]];
        const index = findIndex(board, target);
        if (objList[index].ship != null) {
            return true;
        }
        return false;
    };

    // Increase hit number of ship if contained in attacked square
    const receiveAttack = (index) => {
        if (objList[index].ship != null) {
            objList[index].ship.hit();
            objList[index].attacked = true;
        } else {
            objList[index].attacked = true;
        }
    };

    // Return true if all ships on board have been sunk
    const allShipsSunk = () => {
        let result = true;
        for (let i = 0; i < objList.length; i += 1) {
            if (objList[i].ship) {
                if (objList[i].ship.isSunk() !== true) {
                    result = false;
                }
            }
        }
        return result;
    };

    return {
        board, objList, placeShip, placeRandomShips, hasShip, receiveAttack, allShipsSunk,
    };
};
