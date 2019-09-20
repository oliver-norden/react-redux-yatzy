import { CALC_POSSIBLE_SCORES } from './types';

export const calcPossibleScores = () => (dispatch, getState) => {

    let possibleScores = {};

    // Store dice values in array
    const dice = getState().dice.dice.map(dice => dice.val);

    // Create object with dice counts
    const diceCounts = {};
    dice.forEach(dice => (diceCounts[dice]) ? diceCounts[dice]++ : diceCounts[dice] = 1);

    const combinations = [
        {
            name: 'one pair',
            valueCounts: [2]
        },
        {
            name: 'threeOfAKind',
            valueCounts: [3]
        },
        {
            name: 'fourOfAKind',
            valueCounts: [4]
        },
        {
            name: 'two pairs',
            valueCounts: [2, 2]
        },
        {
            name: 'full house',
            valueCounts: [3, 2]
        },
        {
            name: 'yatzy',
            valueCounts: [5],
            score: 50
        },
        {
            name: 'small straight',
            values: [1, 2, 3, 4, 5]
        },
        {
            name: 'large straight',
            values: [2, 3, 4, 5, 6]
        }

    ]

    // Check for combinations (Pairs, full house etc)
    for (const combination of combinations) {
        const { valueCounts, values, name, score } = combination;

        if (values) { // If exact values are required, for example, in a straight
            if (values.every(reqVal => dice.includes(reqVal))) possibleScores[name] = score || arraySum(values) // If all criterial dice are rolled
        }

        else { // If exact values are NOT required, for example, in a four of a kind
            valueCounts.sort(); // The most dice should priorotize the highest value, i.e pick value first
            let validDice = [];
            let diceSum = 0;
            
            // Loop through criteria and check for count in dice count and add to validDice if not already there
            for (const valueCount of valueCounts) {
                let highestValidDice;
                for (const diceVal in diceCounts) {
                    if (diceCounts[diceVal] >= valueCount && !validDice.includes(Number(diceVal))) highestValidDice = Number(diceVal); // Select highest valid dice
                }
                if (highestValidDice) {
                    diceSum += highestValidDice * valueCount;
                    validDice.push(highestValidDice);
                }
            }
    
            if (validDice.length === valueCounts.length) possibleScores[name] = score || diceSum; // If length of valid dice and criteria array are equal, all critera are met
        }
    };

    // Fill possible scores with chance
    possibleScores['chance'] = arraySum(dice);

    // Fill possible scores object of singles
    for (const dice in diceCounts) {
        // Singels (ones, twos, etc)
        possibleScores[dice] = dice * diceCounts[dice];
    }

    dispatch({
        type: CALC_POSSIBLE_SCORES,
        payload: possibleScores
    });
}

function arraySum(arr) {
    return arr.reduce((val, total) => val + total, 0);
}