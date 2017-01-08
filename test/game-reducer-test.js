import expect, { createSpy, spyOn, isSpy } from 'expect'

import { initialState } from '../src/lib/initialState'
import gameReducer from '../src/reducers/gameReducer'

function hasSameProps( obj1, obj2 ) {
  return Object.keys( obj1 ).every( function( prop ) {
    return obj2.hasOwnProperty( prop );
  });
}

describe('gameReducer', () => {
  beforeEach(function(){
    this.initialState = initialState;
  })
  
  describe('default case', function() {
    it('should return the initial state', function() {
      const newState = gameReducer(undefined, {})
      expect(hasSameProps(newState, this.initialState)).toEqual(true)
    })
  })
  
  describe('"START_GAME" case', function() {
    beforeEach(function() {
      this.startGame = {
        type: "START_GAME",
        userCards: [
          {name:"Ace of Diamonds", value: 1},
          {name:"Ace of Spades", value: 1}
        ],
        aiCards: [
          {name:"Ace of Clubs", value: 1},
          {name:"Ace of Hearts", value: 1}
        ],
        deck: this.initialState.deck.slice(4)
      }
    })
    
    it('should deal two cards to the user, two to the ai', function() {
      const newState = gameReducer(this.initialState, this.startGame)
      expect(newState.userCards.length).toEqual(2);
      expect(newState.aiCards.length).toEqual(2);
    })
    it('should return a deck with 48 cards and a `winner` of null', function() {
      const newState = gameReducer(this.initialState, this.startGame)
      expect(newState.deck.length).toEqual(48)
      expect(newState.winner).toEqual(null)
    })
  })

  describe('"HIT_USER" case', function() {
    
    it('should remove one card from the deck and add it to the userCards', function() {
      const hitUserAction = {
        type: "HIT_USER",
        userCards: [ {name:"Ace of Diamonds", value: 1} ],
        deck: this.initialState.deck.slice(1),
        winner: null
      }
      const newState = gameReducer(this.initialState, hitUserAction)
      expect(newState.deck.length).toEqual(51)
      expect(newState.userCards.length).toEqual(1)
    })
    it('should not modify the aiCards', function() {
      const hitUserAction = {
        type: "HIT_USER",
        userCards: [ {name:"Ace of Diamonds", value: 1} ],
        deck: this.initialState.deck.slice(1),
        winner: null
      }
      const newState = gameReducer(this.initialState, hitUserAction)
      expect(newState.aiCards).toEqual([])
    })
    it('should not modify the `winner` if there isn\'t one yet', function() {
      const hitUserAction = {
        type: "HIT_USER",
        userCards: [ {name:"Ace of Diamonds", value: 1} ],
        deck: this.initialState.deck.slice(1),
        winner: null
      }
      const newState = gameReducer(this.initialState, hitUserAction)
      expect(newState.winner).toEqual(null)
    })
    it('should set `winner` if needed', function(){
      const hitUserAction = {
        type: "HIT_USER",
        userCards: [  {name:"King of Clubs", value: 10},{name:"King of Hearts", value: 10}, {name:"Ace of Diamonds", value: 1} ],
        deck: this.initialState.deck,
        winner: "User"
      }
      const newState = gameReducer(this.initialState, hitUserAction)
      expect(newState.winner).toEqual("User")
    })
  })
  
  describe('"HIT_AI" case', function() {
    
    beforeEach(function() {
      this.hitAi = {
        type: "HIT_AI",
        aiCards: [ 
          {name:"Ace of Diamonds", value: 1}, 
          {name:"Ace of Spades", value: 1}, 
          {name:"Ace of Clubs", value: 1},
          {name:"Ace of Hearts", value: 1}
        ],
        deck: this.initialState.deck.slice(4),
        winner: "AI"
      }
    })
    
    it('should remove cards from `deck` and add them to `aiCards`', function() {
      const newState = gameReducer(this.initialState, this.hitAi)
      expect(newState.deck.length).toEqual(48)
      expect(newState.aiCards.length).toEqual(4)
    })
    
    it('should not modify the  userCards', function() {
      const hitAiModUser = Object.assign({}, this.hitAi, {userCards: [{name:"Six of Diamonds", value: 6}]})
      const newState = gameReducer(this.initialState, hitAiModUser)
      expect(newState.userCards).toEqual([])
    })
    it('should set `winner` if needed', function(){
      const hitAiAction = {
        type: "HIT_AI",
        userCards: [  {name:"King of Clubs", value: 10},{name:"King of Hearts", value: 10}, {name:"Ace of Diamonds", value: 1} ],
        deck: this.initialState.deck,
        winner: "AI"
      }
      const newState = gameReducer(this.initialState, hitAiAction)
      expect(newState.winner).toEqual("AI")
    })
  })

  describe('"RESET_GAME" case', function() {
    it('should set the same to initial state', function() {
      const newState = gameReducer(undefined, {type: 'RESET_GAME'})
      expect(newState.userCards).toEqual([])
      expect(newState.aiCards).toEqual([])
      expect(newState.deck.length).toEqual(52)
      expect(newState.deck).toEqual(this.initialState.deck)
      expect(newState.winner).toEqual(null)
    })
  })
})