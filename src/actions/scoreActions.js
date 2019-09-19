import { CALC_POSSIBLE_SCORES } from './types';

export const calcPossibleScores = () => (dispatch, getState) => {

    let possibleScores = {};

    // Store dice values in array
    const dice = getState().dice.dice.map(dice => dice.val);

    // Create object with dice counts
    const diceCounts = {};
    dice.forEach(dice => (diceCounts[dice]) ? diceCounts[dice]++ : diceCounts[dice] = 1);

    // Special scores
    const multiples = [
        {
            name: 'pairs',
            criteria: 2,
            multiplier: 2
        },
        {
            name: 'threeOfAKind',
            criteria: 3,
            multiplier: 3
        },
        {
            name: 'fourOfAKind',
            criteria: 4,
            multiplier: 4
        },
        {
            name: 'yatzy',
            criteria: 5,
            score: 50
        }
    ];

    // Fill possible scores object
    for (let dice in diceCounts) {

        // Singels (ones, twos, etc)
        possibleScores[dice] = dice * diceCounts[dice];

        // Multiples
        for (const multiple of multiples) {
            const { name, criteria, score, multiplier } = multiple;

            if (diceCounts[dice] >= criteria) {
                if (!possibleScores[name]) possibleScores[name] = {}; // Initiate object
                possibleScores[name][dice] = score || dice * multiplier; // Assign the possible score with a fixed score of a multiplier
            }
        }

    }

    dispatch({
        type: CALC_POSSIBLE_SCORES,
        payload: possibleScores
    });
}