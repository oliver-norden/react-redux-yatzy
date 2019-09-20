import { CALC_POSSIBLE_SCORES } from './types';

export const calcPossibleScores = () => (dispatch, getState) => {

    let possibleScores = {};

    // Store dice values in array
    const dice = getState().dice.dice.map(dice => dice.val);

    // Create object with dice counts
    const diceCounts = {};
    dice.forEach(dice => (diceCounts[dice]) ? diceCounts[dice]++ : diceCounts[dice] = 1);

    const specials = [
        {
            name: 'small straight',
            criteria: [1, 2, 3, 4, 5],
            score: 15
        },
        {
            name: 'large straight',
            criteria: [2, 3, 4, 5, 6],
            score: 20
        }
    ];

    const combinations = [
        {
            name: 'one pair',
            criteria: [2]
        },
        {
            name: 'threeOfAKind',
            criteria: [3]
        },
        {
            name: 'fourOfAKind',
            criteria: [4]
        },
        {
            name: 'two pairs',
            criteria: [2, 2]
        },
        {
            name: 'full house',
            criteria: [3, 2]
        },
        {
            name: 'yatzy',
            criteria: [5],
            score: 50
        }

    ]

    // Check for specials (Straights etc)
    for (const special of specials) {
        const { name, criteria, score } = special;

        if (criteria.every(reqVal => dice.includes(reqVal))) possibleScores[name] = score // If all criterial dice are rolled
    }

    // Check for combinations (Pairs, full house etc)
    for (const combination of combinations) {
        const { criteria, name, score } = combination;
        criteria.sort(); // The most dice should priorotize the highest value
        let validDice = [];
        let diceSum = 0;
        
        // Loop through criteria and check for count in dice count and add to validDice if not already there
        for (const criteriaCount of criteria) {
            let highestValidDice;
            for (const diceVal in diceCounts) {
                if (diceCounts[diceVal] >= criteriaCount && !validDice.includes(Number(diceVal))) highestValidDice = Number(diceVal); // Select highest valid dice
            }
            if (highestValidDice) {
                diceSum += highestValidDice * criteriaCount;
                validDice.push(highestValidDice);
            }
        }

        if (validDice.length === criteria.length) possibleScores[name] = score || diceSum; // If length of valid dice and criteria array are equal, all critera are met
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