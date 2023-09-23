import { Ship } from "./src/ship";

test('Increases hit number by 1 when called', () => {
    const testShip = Ship(3);
    testShip.hit();
    expect(testShip.getHitNum()).toBe(1);
});

test('Increases hit number by 2 when called twice', () => {
    const testShip = Ship(3);
    testShip.hit();
    testShip.hit();
    expect(testShip.getHitNum()).toBe(2);
});

test('Return true if ship is sunk', () => {
    const testShip = Ship(2);
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(true);
});

test('Return false if ship is not sunk', () => {
    const testShip = Ship(4);
    testShip.hit();
    testShip.hit();
    expect(testShip.isSunk()).toBe(false);
});
