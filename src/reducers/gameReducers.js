import { CYCLE_PLAYERS, CONSUME_DICE_ROLL, SAVE_SCORE } from "../actions/types";

export const rollsPerPlayer = 3;

const initialState = {
    players: [
        {
            name: 'Oliver',
            id: 0,
            score: {
                sum: 0,
                bonus: 0
            }
        },
        {
            name: 'Pat',
            id: 1,
            score: {
                sum: 0,
                bonus: 0
            }
        }
    ],
    currentPlayer: {
        idx: 0,
        rollsLeft: rollsPerPlayer
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CYCLE_PLAYERS:
            return {
                ...state,
                currentPlayer: {
                    ...state.currentPlayer,
                    ...action.payload
                }
            };
        case CONSUME_DICE_ROLL:
            return {
                ...state, 
                currentPlayer: {
                    ...state.currentPlayer,
                    rollsLeft: action.payload
                }
            }
        case SAVE_SCORE:
            return {
                ...state,
                players: action.payload
            }
        default: 
            return state;
    } 
}