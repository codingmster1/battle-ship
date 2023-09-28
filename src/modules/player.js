import Gameboard from './gameboard';
import aiLogic from './aiLogic';

function Player(playerName, playerNumber) {
    let name = typeof playerName === 'string' ? playerName : 'Enemy';
    const number = playerNumber;
    const isAI = typeof playerName !== 'string' ? true : false;
    const gameboard = Gameboard();
    const battleBot = aiLogic();
    function attack(enemy, row, col) {

        if (this.isAI) {
            if (this.battleBot.availableAttacks.length === 0) return 'No squares to attack';
            [row, col] = this.battleBot.attack(enemy);
        }

        const result = enemy.gameboard.receiveAttack(row, col);
        if (this.isAI) {
            if (result[0] === 'hit') {
                this.battleBot.lastHitArray.push(result[1]);
                this.battleBot.concurrentMisses = 0;
            }
            if (result[0] === 'miss') this.battleBot.concurrentMisses++;
            if (result[2] !== null) this.battleBot.lastShip = result[2];
            this.battleBot.removeCellFromAvailableAttacks(result[1]);
        }
        return result;
    }
    return {
        name,
        number,
        isAI,
        gameboard,
        battleBot,
        attack
    }
}

export default Player;