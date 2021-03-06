import { CYCLE_PLAYERS, CONSUME_DICE_ROLL, SAVE_SCORE, CONSUME_TURN, SET_WINNER, SET_INSTRUCTION, RESET_GAME } from "../actions/types";

export const rollsPerPlayer = 3;

const initialPlayers = [
    {
        name: 'Player 1',
        id: 0,
        score: {
            bonus: 0
        },
        singlesSum: 0,
        scoreSum: 0,
    },
    {
        name: 'Player 2',
        id: 1,
        score: {
            bonus: 0
        },
        singlesSum: 0,
        scoreSum: 0,
    }
];

const initialState = {
    players: initialPlayers.map(a => ({...a})),
    winner: null,
    currentPlayer: {
        idx: 0,
        rollsLeft: rollsPerPlayer,
        message: 'Select the dice you wish to save and hit roll, or click on a score to register it'
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
        case SET_INSTRUCTION:
            return {
                ...state,
                currentPlayer: {
                    ...state.currentPlayer,
                    message: action.payload
                }
            }
        case SET_WINNER:
            return {
                ...state,
                winner: action.payload
            }
        case RESET_GAME:
            return {
                ...initialState,
                players: initialPlayers.map(a => ({...a}))
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