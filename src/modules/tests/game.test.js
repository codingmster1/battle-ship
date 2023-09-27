import Game from '../game';

let game;
let player1;
let ai2;

beforeEach(() => {
    game = Game();
    player1 = game.createPlayer('Bob', 1);
    ai2 = game.createPlayer(false, 2);
    game.newGame(player1, ai2);
})

test('create game with human and ai', () => {
    expect(game.player1.isAI).toBe(false);
    expect(game.player2.isAI).toBe(true);
})

test('players can both make attacks', () => {
    expect(typeof player1.attack(ai2, 0, 0)[0]).toBe('string');
    expect(typeof ai2.attack(player1)[0]).toBe('string');
})