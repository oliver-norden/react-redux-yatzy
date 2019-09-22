import { combineReducers } from 'redux';
import diceReducers from './diceReducers';
import possibleScoreReducers from './possibleScoreReducers';
import gameReducers from './gameReducers';
import rulesReducers from './rulesReducers';

export default combineReducers({
    dice: diceReducers,
    possibleScore: possibleScoreReducers,
    game: gameReducers,
    rules: rulesReducers
});