import { CALC_POSSIBLE_SCORES } from '../actions/types';

const initialState = {
    possibleScores: {}
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CALC_POSSIBLE_SCORES:
            return {
                ...state, 
                possibleScores: action.payload
            };
        default: 
            return state;
    }
}