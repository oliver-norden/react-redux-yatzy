import { CALC_POSSIBLE_SCORES } from './types';

export const calcPossibleScores = () => (dispatch, getState) => {

    let possibleScores = {};

    // Store dice values in array
    const dice = getState().dice.dice.map(dice => dice.val);

    // Create object with dice counts
    const diceCounts = {};
    dice.forEach(dice => (diceCounts[dice]) ? diceCounts[dice]++ : diceCounts[dice] = 1);

    // Fill possible scores objects with singels (ones, twos, etc)
    for (const dice in diceCounts) {
        possibleScores[dice] = dice * diceCounts[dice];
    }

    dispatch({
        type: CALC_POSSIBLE_SCORES,
        payload: possibleScores
    });
}