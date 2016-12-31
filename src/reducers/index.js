import { combindeReducers } from 'redux';
import gameReducer from './gameReducer';

const rootReducer = combindeReducers({
  game: gameReducer
})

export default rootReducer;