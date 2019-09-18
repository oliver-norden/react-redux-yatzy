import { CALC_POSSIBLE_SCORES } from '../actions/types';

const initialState = {
    possibleScores: {
        ones: 0,
        twos: 0,
        threes: 0,
        fours: 0,
        fives: 0,
        sixes: 0
    }
}

export default function (state = initialState, action) {
    switch (action.type) {
        case CALC_POSSIBLE_SCORES:
            console.log(action.payload);
            return state;
        default: 
            return state;
    }
}