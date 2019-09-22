import { ROLL_DICE, TOGGLE_DICE, DISABLE_ROLL_BTN, ENABLE_ROLL_BTN, UNSAVE_DICE } from './types';
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