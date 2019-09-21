import { ROLL_DICE, TOGGLE_DICE, UNSAVE_DICE, ENABLE_ROLL_BTN, DISABLE_ROLL_BTN } from '../actions/types';

const initialState = {
    dice: [
        {
            id: 'dice1',
            saved: false,
            val: 0
        },
        {
            id: 'dice2',
            saved: false,
            val: 0
        },
        {
            id: 'dice3',
            saved: false,
            val: 0
        },
        {
            id: 'dice4',
            saved: false,
            val: 0
        },
        {
            id: 'dice5',
            saved: false,
            val: 0
        },
        {
            id: 'dice6',
            saved: false,
            val: 0
        }
    ],
    enabled: true
};

export default function (state = initialState, action){
    switch(action.type){
        case ROLL_DICE:
        case TOGGLE_DICE:
        case UNSAVE_DICE:
            return {...state, dice: action.payload};
        case ENABLE_ROLL_BTN:
        case DISABLE_ROLL_BTN:
            return {
                ...state,
                enabled: action.payload
            }
        default:
            return state;
    }
}