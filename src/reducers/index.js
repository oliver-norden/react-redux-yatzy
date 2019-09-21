import { combineReducers } from 'redux';
import diceReducers from './diceReducers';
import possibleScoreReducers from './possibleScoreReducers';
import gameReducers from './gameReducers';

export default combineReducers({
    dice: diceReducers,
    possibleScore: possibleScoreReducers,
    game: gameReducers
});