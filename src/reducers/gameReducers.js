import { CYCLE_PLAYERS, CONSUME_DICE_ROLL, SAVE_SCORE, CONSUME_TURN } from "../actions/types";

export const rollsPerPlayer = 3;

const initialState = {
    players: [
        {
            name: 'Oliver',
            id: 0,
            score: {
                bonus: 0
            },
            singlesSum: 0,
            scoreSum: 0,
        },
        {
            name: 'Pat',
            id: 1,
            score: {
                bonus: 0
            },
            singlesSum: 0,
            scoreSum: 0,
        }
    ],
    currentPlayer: {
        idx: 0,
        rollsLeft: rollsPerPlayer
    },
    currentTurn: 1
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
        case CONSUME_TURN:
            return {
                ...state,
                currentTurn: state.currentTurn + 1
            }
        default: 
            return state;
    } 
}