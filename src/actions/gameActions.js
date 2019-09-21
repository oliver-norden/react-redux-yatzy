import { CYCLE_PLAYERS, CONSUME_DICE_ROLL } from "./types";
import { rollsPerPlayer } from '../reducers/gameReducers';
import { disableRollButton, enableRollButton, unsaveAllDice } from "./diceActions";

export const cyclePlayers = () => (dispatch, getState) => {
    const players = getState().game.players.length;
    const currentPlayerIdx = getState().game.currentPlayer.idx;
    const newPlayerIdx = (currentPlayerIdx === players - 1) ? 0 : currentPlayerIdx + 1;

    dispatch({
        type: CYCLE_PLAYERS,
        payload: {
            idx: newPlayerIdx,
            rollsLeft: rollsPerPlayer
        }
    });

    dispatch(enableRollButton());

    dispatch(unsaveAllDice());
}

export const consumeDiceRoll = () => (dispatch, getState) => {
    const currentRollsLeft = getState().game.currentPlayer.rollsLeft;
    const newRollsLeft = currentRollsLeft - 1;

    // Disable roll button if there are no rolls left
    if (newRollsLeft === 0) dispatch(disableRollButton());

    dispatch ({
        type: CONSUME_DICE_ROLL,
        payload: newRollsLeft
    })
    
}