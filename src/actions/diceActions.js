import { ROLL_DICE, TOGGLE_DICE } from './types';
import { calcPossibleScores } from './scoreActions';
import { consumeDiceRoll } from './gameActions';

export const rollDice = () => (dispatch, getState) => {
    function diceRoll() {
        return Math.floor(Math.random() * 6 ) + 1;
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

    dispatch(calcPossibleScores());
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