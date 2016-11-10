import {combineReducers} from 'redux';
import game from './gameReducer.js';

const rootReducer = combineReducers({
  game
})

export default rootReducer;