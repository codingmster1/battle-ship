// eslint-disable-next-line import/prefer-default-export
export const Ship = (lengthNum) => {
    const shipLength = lengthNum;
    let hitNum = 0;
    const hit = () => {
        hitNum += 1;
    }
    const getHitNum = () => hitNum;
    const isSunk = () => {
        if (hitNum >= shipLength) {
            return true;
        }
        return false;
    }
    return { shipLength, hitNum, hit, getHitNum, isSunk }
}
