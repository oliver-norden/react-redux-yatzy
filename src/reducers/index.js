import { combineReducers } from 'redux';
import diceReducers from './diceReducers';
import scoreReducers from './scoreReducers';
import gameReducers from './gameReducers';

export default combineReducers({
    dice: diceReducers,
    score: scoreReducers,
    game: gameReducers
});