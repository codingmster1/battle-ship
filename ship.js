// eslint-disable-next-line no-use-before-define
module.exports = { Ship };


function Ship(length) {
    const hits = new Array(length).fill(false);
    const isVertical = true;

    function hit() {   // this will working if I will not allow the player to attack a position already attacked
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < hits.length; i++) {
            if (!hits[i]) {
                hits[i] = true
                break
            }
        }
    }


    function isSunk() {
        // eslint-disable-next-line no-shadow
        return hits.every(hit => hit === true);
    }

    return {
        length,
        hits,
        hit,
        isSunk,
        isVertical
    };
}