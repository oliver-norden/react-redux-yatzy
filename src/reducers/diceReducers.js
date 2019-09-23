import { ROLL_DICE, TOGGLE_DICE, UNSAVE_DICE, ENABLE_ROLL_BTN, DISABLE_ROLL_BTN, GEN_DICE } from '../actions/types';

const initialState = {
    dice: [],
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
        case GEN_DICE:
            return {
                ...state,
                dice: [...action.payload]
            }
        default:
            return state;
    }
}