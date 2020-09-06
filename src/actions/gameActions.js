import { CYCLE_PLAYERS, CONSUME_DICE_ROLL, CONSUME_TURN, SET_WINNER, SET_INSTRUCTION, RESET_GAME } from "./types";
import { rollsPerPlayer } from '../reducers/gameReducers';
import { disableRollButton, enableRollButton, unsaveAllDice, rollDice } from "./diceActions";

const instructions = {
    rollsLeft: 'Select the dice you wish to save and hit roll, or click on a score to register it',
    endOfTurn: 'Click on a score to register it',
    endOfGame: ''
}

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
        type: SET_INSTRUCTION,
        payload: instructions.rollsLeft
    });
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
        type: SET_INSTRUCTION,
        payload: instructions.endOfGame
    });
    dispatch({
        type: SET_WINNER,
        payload: winner
    });
}

export const resetGame = () => (dispatch) => {
    dispatch({
        type: RESET_GAME
    });
    dispatch(consumeDiceRoll());
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
    if (newRollsLeft === 0) {
        dispatch({
            type: SET_INSTRUCTION,
            payload: instructions.endOfTurn
        });
        dispatch(disableRollButton())
    };

    dispatch ({
        type: CONSUME_DICE_ROLL,
        payload: newRollsLeft
    })
    
}