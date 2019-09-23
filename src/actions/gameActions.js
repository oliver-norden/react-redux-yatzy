import { CYCLE_PLAYERS, CONSUME_DICE_ROLL, CONSUME_TURN, SET_WINNER } from "./types";
import { rollsPerPlayer } from '../reducers/gameReducers';
import { disableRollButton, enableRollButton, unsaveAllDice, rollDice } from "./diceActions";

export const cyclePlayers = () => (dispatch, getState) => {
    const players = getState().game.players.length;
    const currentPlayerIdx = getState().game.currentPlayer.idx;
    const newPlayerIdx = (currentPlayerIdx === players - 1) ? 0 : currentPlayerIdx + 1;

    if (newPlayerIdx === 0) { // A full turn has been completed
        dispatch(consumeTurn());

        const currentTurn = getState().game.currentTurn;
        const totalTurns = getState().rules.turns;

        if (currentTurn > totalTurns) dispatch(regWinner());
    }

    dispatch({
        type: CYCLE_PLAYERS,
        payload: {
            idx: newPlayerIdx,
            rollsLeft: rollsPerPlayer
        }
    });

    dispatch(enableRollButton());

    dispatch(unsaveAllDice());

    dispatch(rollDice());
}

export const regWinner = () => (dispatch, getState) => {
    const players = getState().game.players;
    const winner = players.reduce((player, highetsScorePlayer) => (!highetsScorePlayer || player.scoreSum > highetsScorePlayer.scoreSum) ?  player : highetsScorePlayer ) // Compare player score with current highest score player

    dispatch({
        type: SET_WINNER,
        payload: winner
    });
}

export const consumeTurn = () => {
    return {
        type: CONSUME_TURN
    }
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