import Ship from '../ship';

test('create carrier ship with length 3', () => {
    let ship = Ship('carrier')
    expect(ship.type).toBe('carrier');
    expect(ship.length).toBe(5);
})

test('register 1 hit', () => {
    let ship = Ship('carrier');
    expect(ship.hits).toBe(0);
    ship.hit()
    expect(ship.hits).toBe(1)
})

test('5 hits, is sunk', () => {
    let ship = Ship('carrier');
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
    ship.hit();
    expect(ship.isSunk()).toBe(true);
})