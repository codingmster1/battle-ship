import { Gameboard } from "../src/gameboard";
import { Ship } from '../src/ship';

test('Place a single-space ship at a specified square on gameboard', () => {
    const game = Gameboard();
    game.placeShip([0, 0], 1, "x");
    expect(game.hasShip([0, 0])).toBe(true);
});

test('Place a 2-square horizontal ship at a specified location on gameboard', () => {
    const game = Gameboard();
    game.placeShip([0, 0], 2, "x");
    expect(game.hasShip([0, 1])).toBe(true);
});

test('Place a 2-square vertical ship at a specified location on gameboard', () => {
    const game = Gameboard();
    game.placeShip([2, 0], 2, "y");
    expect(game.hasShip([1, 0])).toBe(true);
});

test('Increases hit number of correct ship if ship coordinate is attacked', () => {
    const game = Gameboard();
    game.placeShip([0, 0], 2, "x");
    game.receiveAttack([0, 1]);
    expect(game.objList[1].ship.getHitNum()).toBe(1);
});

test('Reports true if all ships have been sunk', () => {
    const game = Gameboard();
    game.placeShip([0, 0], 2, "x");
    game.receiveAttack([0, 0]);
    game.receiveAttack([0, 1]);
    game.placeShip([1, 0], 2, "x");
    game.receiveAttack([1, 0]);
    game.receiveAttack([1, 1]);
    game.placeShip([2, 0], 2, "x");
    game.receiveAttack([2, 0]);
    game.receiveAttack([2, 1]);
    expect(game.allShipsSunk()).toBe(true);
});

test('Reports false if not all ships have been sunk', () => {
    const game = Gameboard();
    game.placeShip([0, 0], 2, "x");
    game.receiveAttack([0, 0]);
    game.receiveAttack([0, 1]);
    game.placeShip([1, 0], 2, "x");
    expect(game.allShipsSunk()).toBe(false);
});