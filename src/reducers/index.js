import { combineReducers } from 'redux';
import diceReducers from './diceReducers';
import scoreReducers from './scoreReducers';

export default combineReducers({
    dice: diceReducers,
    score: scoreReducers
});