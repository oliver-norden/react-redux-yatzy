import { CALC_POSSIBLE_SCORES, SAVE_SCORE } from './types';
import { cyclePlayers } from './gameActions'

export const calcPossibleScores = () => (dispatch, getState) => {

    let possibleScores = {};

    // Store dice values in array
    const dice = getState().dice.dice.map(dice => dice.val);

    // Create object with dice counts
    const diceCounts = {};
    dice.forEach(dice => (diceCounts[dice]) ? diceCounts[dice]++ : diceCounts[dice] = 1);

    // Get criteria for combinations (straights, yatzy, pairs etc)
    const combinations = getState().rules.combinations;

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

export const saveScore = (newScore, player) => (dispatch, getState) => {
    
    const { diceSides, bonus, bonusRequirment } = getState().rules;

    const players = getState().game.players;
    let playerScore = players[player].score;

    // Add new score to score object
    playerScore = {
        ...playerScore,
        ...newScore
    };

    const scoreType = Object.keys(newScore)[0];

    // If new score is a single, add to singlesSum
    if (scoreType > 0 && scoreType <= diceSides){
        players[player].singlesSum += newScore[scoreType];

        // If singles sum are higher than 63, add bonus
        if (players[player].singlesSum >= bonusRequirment) playerScore.bonus = bonus;
    }

    // Add new score to player sum
    players[player].scoreSum += newScore[scoreType];

    // Add score object to player
    players[player].score = playerScore;

    dispatch ({
        type: SAVE_SCORE,
        payload: players
    });

    dispatch (cyclePlayers());
}

function arraySum(arr) {
    return arr.reduce((val, total) => val + total, 0);
}