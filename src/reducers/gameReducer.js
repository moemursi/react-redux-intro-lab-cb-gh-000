import { initialState } from '../lib/initialState';

export default function gameReducer(state=initialState, action) {
  switch(action.type){
    case 'START_GAME':
      return Object.assign({}, state, {
        deck: action.deck,
        userCards: action.userCards,
        aiCards: action.aiCards
      })
    case 'HIT_USER':
      return Object.assign({}, state, {
        deck: action.deck,
        userCards: action.userCards,
        winner: action.winner
      })
    case 'HIT_AI':
      return Object.assign({}, state, {
        deck: action.deck,
        aiCards: action.aiCards,
        winner: action.winner
      })
    case "RESET_GAME":
      return Object.assign({}, initialState)
    default:
      return state;
  }
}

