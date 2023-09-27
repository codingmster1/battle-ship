import shipTypes from '../shipTypes';

let player;
let board;

// This object holds the data for the drag methods to use
// These properties are updated as the user drags and drops ships
const dragData = {
    shipObject: null,
    shipElement: null,
    offsetX: null,
    offsetY: null,
    rowDif: 0,
    colDif: 0,
    shipHomeContainer: null,
    previousContainer: null,
    previousCell: null,
    currentCell: null,
}

function drawSetupBoard(setupPlayer, setupBoard) {
    player = setupPlayer;
    board = setupBoard;
    const setupCells = board.querySelectorAll('.cell')
    setupCells.forEach(cell => {
        cell.addEventListener('dragenter', dragEnter);
        cell.addEventListener('dragover', dragOver);
        cell.addEventListener('dragleave', dragLeave);
        cell.addEventListener('drop', drop);

        // cell.addEventListener('touchmove', dragEnter)
    })
    return setupBoard;
}

function drawSetupShips() {
    const setupShipsContainer = document.createElement('div');
    setupShipsContainer.classList.add('setup-ships-container');
    const setupShipsHeader = document.createElement('div');
    setupShipsHeader.classList.add('setup-ships-header');
    const setupShipsTitle = document.createElement('h3');
    setupShipsTitle.textContent = 'place your ships:';
    const setupShipsInfo = document.createElement('p');
    setupShipsInfo.textContent = 'double click to rotate (once placed)';
    const setupShipsOptions = document.createElement('div');
    setupShipsOptions.classList.add('setup-ships-options');
    const startGame = document.createElement('button');
    startGame.classList.add('setup-button-start');
    startGame.textContent = 'TO BATTLE!';
    const randomShips = document.createElement('button');
    randomShips.classList.add('setup-button-random');
    randomShips.textContent = 'randomize';
    randomShips.addEventListener('click', randomizeFleet);
    setupShipsOptions.append(startGame, randomShips);
    const shipList = document.createElement('div');
    for (let ship in shipTypes) {
        shipList.appendChild(drawShip(shipTypes[ship]));
    }
    setupShipsHeader.append(setupShipsTitle, setupShipsInfo)
    setupShipsContainer.append(setupShipsHeader, shipList, setupShipsOptions);
    return setupShipsContainer;
}

// Draw a ship to be placed, giving the element an ID of the ship's type
function drawShip(ship) {
    const shipContainer = document.createElement('div');
    shipContainer.classList.add('setup-ship');
    shipContainer.id = `${ship.name}-home`;
    const shipBox = document.createElement('div');
    shipBox.id = ship.name;
    shipBox.dataset.length = ship.length;
    shipBox.classList.add('setup-ship-box');
    for (let i = 0; i < ship.length; i++) {
        const shipCell = document.createElement('div');
        shipCell.classList.add('setup-ship-cell');
        shipBox.appendChild(shipCell);
    }
    shipBox.draggable = true;
    shipBox.dataset.alignment = 'horizontal';
    shipBox.addEventListener('dragstart', dragStart);
    shipBox.addEventListener('dragend', dragEnd);
    shipBox.addEventListener('dblclick', rotateShip);

    // shipBox.addEventListener('touchstart', function (event) {
    //     dragStart(event);
    // })
    shipBox.addEventListener('touchmove', function (event) {
        const x = event.touches[0].clientX
        const y = event.touches[0].clientY
        const elements = document.elementsFromPoint(x, y)
        const touchCell = elements.filter(element => element.classList.contains('cell'));
        if (touchCell.length > 0) {
            dragEnter(event, touchCell[0]);
        } else {
            dragLeave(event);
        };
        // Add in a ghost ship
        // Potential to implement this into computer version to clean up UI
        const app = document.querySelector('#app');
        const prevBox = document.querySelector('.ghost-ship');
        if (prevBox) prevBox.remove();
        const newBox = shipBox.cloneNode(true);
        const touchLocation = event.targetTouches[0];
        if (dragData.shipElement.dataset.alignment === 'vertical') {
            newBox.classList.add('setup-ship-vertical')
        }
        newBox.classList.add('ghost-ship')
        newBox.style.left = `${touchLocation.pageX - dragData.offsetX}px`;
        newBox.style.top = `${touchLocation.pageY - dragData.offsetY}px`;
        app.appendChild(newBox)
    })
    shipBox.addEventListener('touchend', function (event) {
        const prevBox = document.querySelector('.ghost-ship');
        if (prevBox) prevBox.remove();
        dragEnd(event);
        const x = event.changedTouches[0].clientX;
        const y = event.changedTouches[0].clientY
        const elements = document.elementsFromPoint(x, y)
        const touchCell = elements.filter(element => element.classList.contains('cell'));
        if (touchCell.length > 0) {
            drop(event, touchCell[0]);
        };
    })

    // As mobile browsers don't support double tap, we add a timer into the touchstart event listener
    shipBox.addEventListener('touchstart', function (event) {
        // Disable browser default zoom on double tap
        event.preventDefault();
        let date = new Date();
        let time = date.getTime();
        const timeBetweenTaps = 200;
        if ((time - shipBox.lastClick) < timeBetweenTaps) {
            rotateShip(event);
            dragStart(event);
        } else {
            dragStart(event);
        }
        shipBox.lastClick = time;
    });

    const shipName = document.createElement('p');
    if (ship.name === 'patrol') shipName.textContent = 'patrol boat';
    else shipName.textContent = ship.name;
    shipContainer.append(shipName, shipBox);
    return shipContainer;
}

// Place all ship's randomly on the player's gameboard
// Then append each ship element to the placed ship's origin with appropriate styling
function randomizeFleet() {
    player.gameboard.placeAllShipsRandomly();
    player.gameboard.placedShips.forEach(ship => {
        const type = ship.type;
        const origin = ship.squares[0];
        const alignment = ship.alignment;
        const shipElement = document.querySelector(`#${type}`);
        shipElement.dataset.alignment = alignment;
        shipElement.classList.add('setup-ship-dropped');
        if (alignment === 'vertical') shipElement.classList.add('setup-ship-vertical');
        else shipElement.classList.remove('setup-ship-vertical');
        const [row, col] = origin;
        const cell = board.querySelector(`[data-row='${row}'][data-col='${col}']`);
        cell.appendChild(shipElement);
    })
}

// When a user grabs a ship element, we track the user's cursor location for the dragEnter and drop events
// When the ship is grabbed from the center, the cursor does not match up with the ship's origin cell
// The cellDif difference between the origin cell to the cell where the user has grabbed the ship element
// i.e., if a ship of length 5 is grabbed from the 4th cell, the cellDif will be 3
function updateCellDif(event) {
    let x;
    let y;
    if (event.type === 'touchstart') {
        let bcr = event.target.parentElement.getBoundingClientRect();
        x = event.targetTouches[0].clientX - bcr.x;
        y = event.targetTouches[0].clientY - bcr.y;
        dragData.offsetX = x;
        dragData.offsetY = y;
    } else {
        x = event.offsetX;
        y = event.offsetY;
    };

    const cellSize = document.querySelector('.setup-ship-cell').offsetWidth;
    if (dragData.shipElement.dataset.alignment === 'horizontal') {
        dragData.rowDif = 0;
        dragData.colDif = Math.floor(x / (cellSize + 2));
    } else {
        dragData.rowDif = Math.floor(y / (cellSize + 2));
        dragData.colDif = 0;
    }
}

// Handle logic for rotating a placed ship - rotation is around the origin
function rotateShip(event) {
    const shipElement = dragData.shipElement;
    const shipLength = shipTypes[shipElement.id].length;
    const originCell = shipElement.parentElement;
    // If the ship is not placed in a cell, return
    if (!originCell.classList.contains('cell')) return;
    const originRow = parseInt(originCell.dataset.row);
    const originCol = parseInt(originCell.dataset.col);
    console.log(originRow, originCol)
    player.gameboard.removeShip([originRow, originCol]);
    let row = originRow;
    let col = originCol;
    let originAlignment = shipElement.dataset.alignment;
    let newAlignment;
    // If the rotation causes the ship to be off the grid, change the origin cell to allow its length
    // This allows a ship placed near the far edge of the grid to still be rotated
    if (originAlignment === 'horizontal') {
        newAlignment = 'vertical';
        if ((10 - row) < shipLength) row = 10 - shipLength;
    } else {
        newAlignment = 'horizontal';
        if ((10 - col) < shipLength) col = 10 - shipLength;
    }
    // Attempt to place the ship along each row (if horizontal) or column (if vertical)
    // Attempt this 10 times - for each row or column, iterating through the grid
    let attempts = 0;
    let shipSquares = player.gameboard.checkValidPlacement(shipLength, [row, col], newAlignment);
    while (shipSquares.isValid === false && attempts < 10) {
        if (newAlignment === 'horizontal') {
            row = row < 9 ? row + 1 : 0;
        }
        else col = col < 9 ? col + 1 : 0;
        shipSquares = player.gameboard.checkValidPlacement(shipLength, [row, col], newAlignment);
        attempts++;
    }
    // If a valid placement is found, place the ship on both the setup board and player's gameboard
    // Style appropriately with a vertical class if needed
    if (shipSquares.isValid) {
        player.gameboard.placeShip(shipElement.id, [row, col], newAlignment);
        const newOriginCell = board.querySelector(`[data-row='${row}'][data-col='${col}']`);
        newOriginCell.appendChild(shipElement);
        shipElement.dataset.alignment = newAlignment;
        if (newAlignment === 'vertical') shipElement.classList.add('setup-ship-vertical');
        else shipElement.classList.remove('setup-ship-vertical');
    }
    // Else, place the ship back into the player's gameboard
    else {
        player.gameboard.placeShip(shipElement.id, [originRow, originCol], originAlignment);
    }
}

// When the user starts dragging a ship, we store its information in dragData
function dragStart(event) {
    if (event.type === 'touchstart') {
        dragData.shipElement = event.target.parentElement;
        dragData.shipHomeContainer = document.querySelector(`#${event.target.parentElement.id}-home`);
        dragData.previousContainer = event.target.parentElement.parentElement;
    }
    else {
        dragData.shipElement = event.target;
        dragData.shipHomeContainer = document.querySelector(`#${event.target.id}-home`);
        dragData.previousContainer = event.target.parentElement;
    };
    updateCellDif(event)
    if (dragData.shipElement.dataset.alignment === 'vertical') dragData.shipElement.classList.add('setup-ship-vertical');
    // On dragStart, we store the ship back in its home container & style it to be a 'ghost'
    // Use a setTimeout to ensure this happens only after the ship has been picked up
    setTimeout(() => {
        dragData.shipElement.classList.add('setup-ship-hide');
        dragData.shipElement.classList.remove('setup-ship-dropped');
        dragData.shipElement.classList.remove('setup-ship-vertical');
        dragData.shipHomeContainer.appendChild(dragData.shipElement)
    }, 0);
    // If the ship is already placed (i.e., it's parent is a cell), we remove the ship from the player's gameboard
    if (dragData.previousContainer.classList.contains('cell')) {
        const cell = dragData.previousContainer;
        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);
        player.gameboard.removeShip([row, col]);
    }
}

function dragEnd(event) {
    dragData.shipElement.classList.remove('setup-ship-hide');
}

// For each cell we enter whilst dragging the ship, we use rowDiff and colDiff
// Check the placement squares and style them valid or invalid
function dragEnter(event, touchCell) {
    dragLeave(event);
    event.preventDefault();
    const type = dragData.shipElement.id;
    let row;
    let col;
    if (event.type === 'touchmove') {
        row = parseInt(touchCell.dataset.row) - parseInt(dragData.rowDif);
        col = parseInt(touchCell.dataset.col) - parseInt(dragData.colDif);
    } else {
        row = parseInt(event.target.dataset.row) - parseInt(dragData.rowDif);
        col = parseInt(event.target.dataset.col) - parseInt(dragData.colDif);
    };
    const shipSquares = player.gameboard.checkValidPlacement(shipTypes[type].length, [row, col], dragData.shipElement.dataset.alignment)
    shipSquares.squares = shipSquares.squares.filter(square => {
        return player.gameboard.checkSquare(square[0], square[1]) !== undefined;
    })
    shipSquares.squares.forEach(square => {
        const cell = board.querySelector(`[data-row='${square[0]}'][data-col='${square[1]}']`);
        // cell.classList.add('cell-drag-over');
        const cellOverlay = document.createElement('div');
        cellOverlay.classList.add('cell', 'cell-drag-over');
        cell.appendChild(cellOverlay);
        if (shipSquares.isValid) cellOverlay.classList.add('cell-drag-valid');
        else cellOverlay.classList.add('cell-drag-invalid');
    })
    // event.target.classList.add('cell-drag-over');
    //
    //
    // HERE WE SHOULD BE ABLE TO SEE THE BOARD UNDERNEATH A SHIP BOX
    // IGNORING IT IN SOME WAY?
    //
    //
}

function dragOver(event) {
    event.preventDefault();
}

// When we leave a cell, or drop the ship, remove all valid/invalid styling
function dragLeave(event) {
    const leftCells = document.querySelectorAll('.cell-drag-over');
    leftCells.forEach(cell => {
        cell.remove();
    })
}

// Handle drop events on cells using the rowDiff and colDiff dragData properties
function drop(event, touchCell) {
    dragLeave(event);
    let row;
    let col;
    const type = dragData.shipElement.id;
    if (event.type === 'touchend') {
        row = parseInt(touchCell.dataset.row) - parseInt(dragData.rowDif);
        col = parseInt(touchCell.dataset.col) - parseInt(dragData.colDif);
    } else {
        row = parseInt(event.target.dataset.row) - parseInt(dragData.rowDif);
        col = parseInt(event.target.dataset.col) - parseInt(dragData.colDif);
    };
    const shipSquares = player.gameboard.checkValidPlacement(shipTypes[type].length, [row, col], dragData.shipElement.dataset.alignment)
    // If the drop is a valid location, place the ship on the player's gameboard and append it to the setup board
    if (shipSquares.isValid) {
        const originCell = board.querySelector(`[data-row='${row}'][data-col='${col}']`);
        originCell.appendChild(dragData.shipElement);
        dragData.shipElement.classList.add('setup-ship-dropped');
        dragData.previousContainer = originCell;
        player.gameboard.placeShip(dragData.shipElement.id, [row, col], dragData.shipElement.dataset.alignment);
    }
    // Else, move the ship back to its previous location
    // If that location is a cell, place the ship back on the player's gameboard in the previous location
    else {
        if (dragData.previousContainer.classList.contains('cell')) {
            dragData.shipElement.classList.add('setup-ship-dropped');
            const prevRow = dragData.previousContainer.dataset.row;
            const prevCol = dragData.previousContainer.dataset.col;
            player.gameboard.placeShip(dragData.shipElement.id, [prevRow, prevCol], dragData.shipElement.dataset.alignment)
        }
        dragData.previousContainer.appendChild(dragData.shipElement)
    }
    dragData.shipElement.classList.remove('setup-ship-hide');
    if (dragData.shipElement.dataset.alignment === 'vertical') dragData.shipElement.classList.add('setup-ship-vertical');
    else dragData.shipElement.classList.remove('setup-ship-vertical');
}

const setup = {
    drawSetupBoard,
    drawSetupShips
}

export default setup;