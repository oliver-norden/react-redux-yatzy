import { CYCLE_PLAYERS, CONSUME_DICE_ROLL } from "./types";
import { rollsPerPlayer } from '../reducers/gameReducers';

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
}

export const consumeDiceRoll = () => (dispatch, getState) => {
    const currentRollsLeft = getState().game.currentPlayer.rollsLeft;
    if (currentRollsLeft > 1) {
        const newRollsLeft = currentRollsLeft - 1;
        dispatch({
            type: CONSUME_DICE_ROLL,
            payload: newRollsLeft
        })
    }
    else dispatch(cyclePlayers());
}