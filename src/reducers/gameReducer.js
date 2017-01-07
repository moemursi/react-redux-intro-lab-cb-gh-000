import { initialState } from '../lib/initialState';

console.log(initialState)

export default function gameReducer(state=initialState, action) {
  switch(action.type){
    case 'START_GAME':
      return Object.assign({}, state, action.payload)
    case 'HIT_USER':
      return Object.assign({}, state, action.payload)
    case 'HIT_AI':
      return Object.assign({}, state, action.payload)
    case 'SET_WINNER':
      return Object.assign({}, state, action.payload)
    case "RESET_GAME":
      return Object.assign({}, initialState)
    default:
      return state;
  }
}

