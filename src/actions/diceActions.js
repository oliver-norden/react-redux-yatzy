import { ROLL_DICE, TOGGLE_DICE, DISABLE_ROLL_BTN, ENABLE_ROLL_BTN, UNSAVE_DICE, GEN_DICE } from './types';
import { calcPossibleScores } from './scoreActions';
import { consumeDiceRoll } from './gameActions';

export const rollDice = () => (dispatch, getState) => {
    const diceSides = getState().rules.diceSides;
    function diceRoll() {
        return Math.floor(Math.random() * diceSides ) + 1;
    } 

    const newDice = getState().dice.dice.map(dice => {
        if (!dice.saved) dice.val = diceRoll();
        return dice;
    });

    dispatch ({
        type: ROLL_DICE,
        payload: newDice
    });

    dispatch (consumeDiceRoll());

    dispatch (calcPossibleScores());
}

export const genDice = noOfDice => dispatch => {
    let dice = [];
    for (let i = 1; i <= noOfDice; i++){
        dice.push({
            id: `dice${i}`,
            val: 0,
            saved: false
        });
    }
    dispatch({
        type: GEN_DICE,
        payload: dice
    });
}

export const toggleDice = e => (dispatch, getState) => {
    const newDice = getState().dice.dice.map(dice => {
        if (e.target.id === dice.id) dice.saved = !dice.saved;
        return dice;
    });

    dispatch ({
        type: TOGGLE_DICE,
        payload: newDice
    });
}

export const unsaveAllDice = () => (dispatch, getState) => {
    const newDice = getState().dice.dice.map(dice => {
        dice.saved = false;
        return dice;
    });

    dispatch ({
        type: UNSAVE_DICE,
        payload: newDice
    });
}

export const disableRollButton = () => {
    return ({
        type: DISABLE_ROLL_BTN,
        payload: false
    })
}

export const enableRollButton = () => {
    return ({
        type: ENABLE_ROLL_BTN,
        payload: true
    })
}