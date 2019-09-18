import { ROLL_DICE } from '../actions/types';

const initialState = {
    dice: []
};

export default function (state = initialState, action){
    switch(action.type){
        case ROLL_DICE:
            console.roll("Dice rolled");
            return state;
        default:
                return state;
    }
}