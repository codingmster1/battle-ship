import Player from '../player';

let player1;
let ai2;

beforeEach(() => {
    player1 = Player('bob');
    ai2 = Player(false);
    player1.gameboard.placeShip('battleship', [0, 0], 'horizontal');
    ai2.gameboard.placeShip('destroyer', [2, 4], 'vertical');
})

test('player has own gameboard', () => {
    expect(Array.isArray(player1.gameboard.board)).toBe(true)
})

test('player1 attacks and misses', () => {
    expect(ai2.gameboard.checkSquare(9, 8)).toBe(null);
    const attackedSquare = player1.attack(ai2, 9, 8);
    expect(attackedSquare[0]).toBe('miss');
})

test('player1 attacks and hits', () => {
    expect(typeof ai2.gameboard.checkSquare(3, 4)).toBe('object');
    const attackedSquare = player1.attack(ai2, 3, 4);
    expect(attackedSquare[0]).toBe('hit');
})

test('ai2 makes a random attack', () => {
    const attackedSquare = ai2.attack(player1);
    expect(typeof attackedSquare[0]).toBe('string');
})

test('ai2 attacks 100 times and never the same square twice', () => {
    for (let i = 0; i < 100; i++) {
        ai2.attack(player1);
    }
    for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 10; col++) {
            expect(typeof player1.gameboard.checkSquare(row, col)).toBe('string');
        }
    }
})

test('ai cannot attack more than 100 times', () => {
    for (let i = 0; i < 100; i++) {
        ai2.attack(player1);
    }
    expect(ai2.attack(player1)).toBe('No squares to attack');
})