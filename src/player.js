export function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Return random coordinates contained within board
function randomIndex(game) {
    const index = randomInteger(0, 99);
    if (game.objList[index].attacked === null) {
        return index;
    }
    return randomIndex(game);
}

export const Player = (enemyGame) => {

    const sendAttack = (ind) => {
        if (!ind) {
            // Attack random square if no coordinates specified
            const random = randomIndex(enemyGame);
            enemyGame.receiveAttack(random);
        } else {
            enemyGame.receiveAttack(ind);
        }
    }

    const activePlayer = false;

    return { sendAttack, activePlayer }

}