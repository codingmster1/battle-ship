function aiLogic() {
    // Create a 2D array of available attack coordinates
    const availableAttacks = createAttackArray();
    let lastShip;
    // Store an array containing all the recent attacks, in order
    // When a ship is sunk, remove all of it's cells from the array
    // So we have an array of recent hits of ships that are not yet sunk
    const lastHitArray = [];
    const possibleDirections = ['up', 'down', 'left', 'right'];
    let concurrentMisses = 0;
    function attack(enemy) {
        if (this.lastHitArray.length > 0) {
            this.checkIfShipIsSunk(enemy, this.lastHitArray[lastHitArray.length - 1]);
        };
        if (this.availableAttacks.length === 0) return 'No squares to attack';
        // If the last hit ship is sunk, or nothing has been hit yet, get a random cell
        // If the bot has missed more than 3 times in a row, give a 50% chance to cheat
        if (this.lastHitArray.length === 0) {
            if (this.concurrentMisses > 5 && Math.random() > 0.8) {
                const enemyBoard = enemy.gameboard.board;
                for (let row = 0; row < 10; row++) {
                    for (let col = 0; col < 10; col++) {
                        const cell = enemy.gameboard.checkSquare(row, col);
                        if (typeof cell === 'object' && cell !== null) {
                            console.log('cheating!')
                            return [row, col];
                        }
                    }
                }
            }
            let attackCoords = this.getRandomCell(enemy);
            return attackCoords;
        }
        // Else, we find the next cell adjacent to the lastHit
        const lastHit = this.lastHitArray[lastHitArray.length - 1];
        const adjacentCells = this.getAllAdjacentCells(enemy, lastHit);
        const adjacentHits = adjacentCells.filter(cell => {
            return (cell.cellResult === 'hit' && this.checkIfShipIsSunk(enemy, cell.adjacentCell) === false);
        });
        // If there is a hit (or multiple) adjacent, attack in the opposite direction
        if (adjacentHits.length > 0) {
            const randomAdjacentHit = adjacentHits[Math.floor(Math.random() * adjacentHits.length)];
            let nextCell = this.getNextAttackableCell(enemy, lastHit, this.flipDirection(randomAdjacentHit.direction));
            if (nextCell === false) {
                nextCell = this.getNextAttackableCell(enemy, lastHit, randomAdjacentHit.direction);
            };
            while (nextCell === false) {
                nextCell = this.getNextAttackableCell(enemy, lastHit, this.possibleDirections[Math.floor(Math.random() * this.possibleDirections.length)]);
            };
            return nextCell;
        }
        // Iterate backwards through all other hit cells for adjaceny to the lastHit cell
        // If adjacency is found, see if we can attack a cell in that direction
        for (let i = this.lastHitArray.length - 2; i >= 0; i--) {
            const cell = this.lastHitArray[i];
            const result = this.getAdjacency(lastHit, cell);
            if (result) {
                let nextCell = this.getNextAttackableCell(enemy, lastHit, result.direction);
                if (nextCell) return nextCell;
            }
        }
        // At this point we have confirmed that the lastHit is the only hit on that ship
        // So we pick a random adjacent cell that we can attack, and attack it!
        const adjacentCellsToAttack = adjacentCells.filter(cell => {
            return typeof cell.cellResult !== 'string' && cell.cellResult !== undefined;
        });
        const cell = adjacentCellsToAttack[Math.floor(Math.random() * adjacentCellsToAttack.length)];
        console.log(cell.adjacentCell)
        return cell.adjacentCell;
    }
    function getRandomCell(enemy) {
        if (this.availableAttacks.length === 0) return 'No squares to attack';
        // Get row and col for a random AI attack from the availableAttacks array
        let arrayRow = Math.floor(Math.random() * this.availableAttacks.length);
        let arrayCol = Math.floor(Math.random() * this.availableAttacks[arrayRow].length);
        let cell = this.availableAttacks[arrayRow][arrayCol];
        // If the selected cell has no adjacent cells to attack, get a different random cell
        const adjacentCells = this.getAllAdjacentCells(enemy, cell);
        if (adjacentCells.every(cell => typeof cell.cellResult !== 'object')) {
            return this.getRandomCell(enemy);
        }
        return cell;
    }
    // Remove a cell from the availableAttacks array
    // Called by player.js after making an attack
    function removeCellFromAvailableAttacks(cell) {
        for (let row = 0; row < this.availableAttacks.length; row++) {
            for (let col = 0; col < this.availableAttacks[row].length; col++) {
                const square = this.availableAttacks[row][col];
                if (cell[0] === square[0] && cell[1] === square[1]) {
                    this.availableAttacks[row].splice(col, 1);
                    if (this.availableAttacks[row].length === 0) this.availableAttacks.splice(row, 1);
                    return;
                }
            }
        }
    }
    function getAdjacentCell(cell, direction) {
        let [row, col] = cell;
        switch (direction) {
            case 'up':
                row--;
                break;
            case 'down':
                row++;
                break;
            case 'left':
                col--;
                break;
            case 'right':
                col++;
                break;
            default:
                break;
        };
        return [row, col];
    }
    // Given a cell, find the 4 possible adjacent cells and their direction
    function getAllAdjacentCells(enemy, cell) {
        return possibleDirections.map(direction => {
            const adjacentCell = this.getAdjacentCell(cell, direction);
            let cellResult = enemy.gameboard.checkSquare(adjacentCell[0], adjacentCell[1]);
            if (cellResult === 'hit') {
                if (this.checkIfShipIsSunk(enemy, adjacentCell)) cellResult = 'sunk';
            }
            return {
                cellResult,
                adjacentCell,
                direction
            }
        })
    }
    // Check if a cell is adjacent to, or in the same row/col as another
    // Return the direction to the cell, the opposite direction, and the distance
    function getAdjacency(cell, neighbourCell) {
        let direction;
        let oppositeDirection;
        let distance;
        if (cell[0] === neighbourCell[0]) {
            const diff = cell[1] - neighbourCell[1];
            direction = diff > 1 ? 'left' : 'right';
            oppositeDirection = diff > 1 ? 'right' : 'left';
            distance = Math.abs(diff);
        } else if (cell[1] === neighbourCell[1]) {
            const diff = cell[0] - neighbourCell[0];
            direction = diff > 1 ? 'down' : 'up';
            oppositeDirection = diff > 1 ? 'up' : 'down';
            distance = Math.abs(diff);
        } else {
            return false;
        }
        return {
            direction,
            oppositeDirection,
            distance
        }
    }
    // Look for a possible cell to attack in a given direction (search 4 cells only)
    function getNextAttackableCell(enemy, cell, direction) {
        let nextCell = getAdjacentCell(cell, direction);
        for (let i = 0; i < 4; i++) {
            let nextCellStatus = enemy.gameboard.checkSquare(nextCell[0], nextCell[1]);
            if (typeof nextCellStatus === 'object' || nextCellStatus === null) return nextCell;
            if (nextCellStatus === undefined) return false;
            if (nextCellStatus === 'miss') return false;
            // We skip over a hit (could be part of the same ship we're attacking),
            // unless that ship is sunk - then we shouldn't keep attacking in that direction
            if (nextCellStatus === 'hit') {
                if (this.checkIfShipIsSunk(enemy, nextCell)) return false;
            }
            nextCell = getAdjacentCell(nextCell, direction);
        }
        return false;
    }
    function flipDirection(direction) {
        switch (direction) {
            case 'up':
                return 'down';
            case 'down':
                return 'up';
            case 'left':
                return 'right';
            case 'right':
                return 'left';
            default:
                return false;
        }
    }
    // Find the ship at a certain cell and check if it is sunk
    // If it is, remove its squares from the lastHitArray and return true
    function checkIfShipIsSunk(enemy, cell) {
        const enemyShips = enemy.gameboard.placedShips;
        let hitShip;
        enemyShips.forEach(ship => {
            if (ship.squares.some(square => {
                return (square[0] === cell[0] && square[1] === cell[1])
            })) hitShip = ship;
        })
        if (hitShip.isSunk()) {
            hitShip.squares.forEach(square => {
                const index = this.lastHitArray.findIndex(location => {
                    return (location[0] === square[0] && location[1] === square[1])
                });
                if (index > -1) this.lastHitArray.splice(index, 1);
            });
            return true;
        } else return false;
    }
    return {
        availableAttacks,
        lastShip,
        lastHitArray,
        possibleDirections,
        concurrentMisses,
        attack,
        getRandomCell,
        removeCellFromAvailableAttacks,
        getAdjacentCell,
        getAllAdjacentCells,
        getNextAttackableCell,
        getAdjacency,
        flipDirection,
        checkIfShipIsSunk
    }
}

function createAttackArray() {
    const attackArray = [];
    for (let row = 0; row < 10; row++) {
        let rowArray = [];
        for (let col = 0; col < 10; col++) {
            rowArray.push([row, col]);
        }
        attackArray.push(rowArray);
    }
    return attackArray;
}

export default aiLogic;