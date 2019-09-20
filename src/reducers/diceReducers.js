import { ROLL_DICE, TOGGLE_DICE } from '../actions/types';

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
    ]
};

export default function (state = initialState, action){
    switch(action.type){
        case ROLL_DICE:
        case TOGGLE_DICE:
            return {...state, dice: action.payload};
        default:
            return state;
    }
}