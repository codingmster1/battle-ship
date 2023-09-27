import Player from './player';

function Game() {
    let player1;
    let player2;
    let currentPlayer;
    let defendingPlayer;
    function createPlayer(name, number) {
        return Player(name, number);
    }
    function newGame(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.currentPlayer = this.player1;
        this.defendingPlayer = this.player2;
    }
    function changeTurn() {
        this.currentPlayer = this.currentPlayer === this.player1 ? this.player2 : this.player1;
        this.defendingPlayer = this.defendingPlayer === this.player2 ? this.player1 : this.player2;
    }
    function checkGameOver() {
        if (this.player1.gameboard.checkAllShipsSunk()) return this.player2;
        if (this.player2.gameboard.checkAllShipsSunk()) return this.player1;
        else return false;
    }
    function testGame() {
        this.player1.gameboard.placeShip(3, [1, 3], 'vertical')
        this.player1.gameboard.placeShip(4, [7, 2], 'horizontal')
        this.player1.gameboard.placeShip(5, [2, 7], 'vertical')
        this.player2.gameboard.placeShip(3, [1, 3], 'vertical')
        this.player2.gameboard.placeShip(4, [7, 2], 'horizontal')
        this.player2.gameboard.placeShip(5, [2, 7], 'vertical')
    }
    return {
        player1,
        player2,
        currentPlayer,
        defendingPlayer,
        createPlayer,
        newGame,
        changeTurn,
        checkGameOver,
        testGame
    }
}



export default Game;