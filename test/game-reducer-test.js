import gameReducer from '../src/reducers/gameReducer'

// const initialState = {
//   game: {
//     winner: null,
//     userCards: [],
//     aiCards: [],
//     deck: [
//      {name:"Ace of Diamonds", value: 1},
//      {name:"Ace of Spades", value: 1},
//      {name:"Ace of Clubs", value: 1},
//      {name:"Ace of Hearts", value: 1},
//      {name:"Two of Diamonds", value: 2},
//      {name:"Two of Spades", value: 2},
//      {name:"Two of Clubs", value: 2},
//      {name:"Two of Hearts", value: 2},
//      {name:"Three of Diamonds", value: 3},
//      {name:"Three of Spades", value: 3},
//      {name:"Three of Clubs", value: 3},
//      {name:"Three of Hearts", value: 3},
//      {name:"Four of Diamonds", value: 4},
//      {name:"Four of Spades", value: 4},
//      {name:"Four of Clubs", value: 4},
//      {name:"Four of Hearts", value: 4},
//      {name:"Five of Diamonds", value: 5},
//      {name:"Five of Spades", value: 5},
//      {name:"Five of Clubs", value: 5},
//      {name:"Five of Hearts", value: 5},
//      {name:"Six of Diamonds", value: 6},
//      {name:"Six of Spades", value: 6},
//      {name:"Six of Clubs", value: 6},
//      {name:"Six of Hearts", value: 6},
//      {name:"Seven of Diamonds", value: 7},
//      {name:"Seven of Spades", value: 7},
//      {name:"Seven of Clubs", value: 7},
//      {name:"Seven of Hearts", value: 7},
//      {name:"Eight of Diamonds", value: 8},
//      {name:"Eight of Spades", value: 8},
//      {name:"Eight of Clubs", value: 8},
//      {name:"Eight of Hearts", value: 8},
//      {name:"Nine of Diamonds", value: 9},
//      {name:"Nine of Spades", value: 9},
//      {name:"Nine of Clubs", value: 9},
//      {name:"Nine of Hearts", value: 9},
//      {name:"Ten of Diamonds", value: 10},
//      {name:"Ten of Spades", value: 10},
//      {name:"Ten of Clubs", value: 10},
//      {name:"Ten of Hearts", value: 10},
//      {name:"Jack of Diamonds", value: 10},
//      {name:"Jack of Spades", value: 10},
//      {name:"Jack of Clubs", value: 10},
//      {name:"Jack of Hearts", value: 10},
//      {name:"Queen of Diamonds", value: 10},
//      {name:"Queen of Spades", value: 10},
//      {name:"Queen of Clubs", value: 10},
//      {name:"Queen of Hearts", value: 10},
//      {name:"King of Diamonds", value: 10},
//      {name:"King of Spades", value: 10},
//      {name:"King of Clubs", value: 10},
//      {name:"King of Hearts", value: 10}
//    ]
//   }
// }

function hasSameProps( obj1, obj2 ) {
  return Object.keys( obj1 ).every( function( prop ) {
    return obj2.hasOwnProperty( prop );
  });
}

describe('gameReducer', () => {
  
  beforeEach(function(){
    this.initialState = {
      game: {
        winner: null,
        userCards: [],
        aiCards: [],
        deck: [
         {name:"Ace of Diamonds", value: 1},
         {name:"Ace of Spades", value: 1},
         {name:"Ace of Clubs", value: 1},
         {name:"Ace of Hearts", value: 1},
         {name:"Two of Diamonds", value: 2},
         {name:"Two of Spades", value: 2},
         {name:"Two of Clubs", value: 2},
         {name:"Two of Hearts", value: 2},
         {name:"Three of Diamonds", value: 3},
         {name:"Three of Spades", value: 3},
         {name:"Three of Clubs", value: 3},
         {name:"Three of Hearts", value: 3},
         {name:"Four of Diamonds", value: 4},
         {name:"Four of Spades", value: 4},
         {name:"Four of Clubs", value: 4},
         {name:"Four of Hearts", value: 4},
         {name:"Five of Diamonds", value: 5},
         {name:"Five of Spades", value: 5},
         {name:"Five of Clubs", value: 5},
         {name:"Five of Hearts", value: 5},
         {name:"Six of Diamonds", value: 6},
         {name:"Six of Spades", value: 6},
         {name:"Six of Clubs", value: 6},
         {name:"Six of Hearts", value: 6},
         {name:"Seven of Diamonds", value: 7},
         {name:"Seven of Spades", value: 7},
         {name:"Seven of Clubs", value: 7},
         {name:"Seven of Hearts", value: 7},
         {name:"Eight of Diamonds", value: 8},
         {name:"Eight of Spades", value: 8},
         {name:"Eight of Clubs", value: 8},
         {name:"Eight of Hearts", value: 8},
         {name:"Nine of Diamonds", value: 9},
         {name:"Nine of Spades", value: 9},
         {name:"Nine of Clubs", value: 9},
         {name:"Nine of Hearts", value: 9},
         {name:"Ten of Diamonds", value: 10},
         {name:"Ten of Spades", value: 10},
         {name:"Ten of Clubs", value: 10},
         {name:"Ten of Hearts", value: 10},
         {name:"Jack of Diamonds", value: 10},
         {name:"Jack of Spades", value: 10},
         {name:"Jack of Clubs", value: 10},
         {name:"Jack of Hearts", value: 10},
         {name:"Queen of Diamonds", value: 10},
         {name:"Queen of Spades", value: 10},
         {name:"Queen of Clubs", value: 10},
         {name:"Queen of Hearts", value: 10},
         {name:"King of Diamonds", value: 10},
         {name:"King of Spades", value: 10},
         {name:"King of Clubs", value: 10},
         {name:"King of Hearts", value: 10}
       ]
      }
    }
  })
  
  describe('default case', () => {
    it('should return the initial state', () => {
      const newState = gameReducer(undefined, {})
      expect(hasSameProps(newState, this.initialState.game)).toEqual(true)
    })
  })
  
  describe('"START_GAME" case', () => {
    beforeEach(()=>{
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
        deck: this.initialState.game.deck.slice(4)
      }
    })
    
    it('should deal two cards to the user, two to the ai', () => {
      const newState = gameReducer(this.initialState.game, this.startGame)
      expect(newState.userCards.length).toEqual(2)
    })
    it('should return a deck with 48 cards and no winner', () => {
      const newState = gameReducer(this.initialState.game, this.startGame)
      expect(newState.deck.length).toEqual(48)
      expect(newState.winner).toEqual(null)
    })
  })

  describe('"HIT_USER" case', () =>{
    
    beforeEach(()=>{
      this.hitUser = {
        type: "HIT_USER",
        userCards: [
          {name:"Ace of Diamonds", value: 1},
        ],
        deck: this.initialState.game.deck.slice(1)
      }
    })
    
    it('should remove one card from the deck and add it to the userCards', () => {
      const newState = gameReducer(this.initialState.game, this.hitUser)
      expect(newState.deck.length).toEqual(51)
      expect(newState.userCards.length).toEqual(1)
    })
    
    it('should not modify the aiCards or the winner', () => {
      const newState = gameReducer(this.initialState.game, this.hitUser)
      expect(newState.aiCards).toEqual([])
      expect(newState.winner).toEqual(null)
    })
  })
  
  describe('"HIT_AI" case', () =>{
    
    beforeEach(()=>{
      this.hitAi = {
        type: "HIT_AI",
        aiCards: [
          {name:"Ace of Diamonds", value: 1},
        ],
        deck: this.initialState.game.deck.slice(1)
      }
    })
    
    it('should remove one card from the deck and add it to the aiCards', () => {
      const newState = gameReducer(this.initialState.game, this.hitAi)
      expect(newState.deck.length).toEqual(51)
      expect(newState.aiCards.length).toEqual(1)
    })
    
    it('should not modify the  userCards or the winner', () => {
      const newState = gameReducer(this.initialState.game, this.hitAi)
      expect(newState.userCards).toEqual([])
      expect(newState.winner).toEqual(null)
    })
  })
  
  describe('"SET_WINNER" case', () =>{
    
    it('can set the winner as AI', () => {
      const newState = gameReducer(this.initialState.game, {
        {type: "SET_WINNER", payload: {winner: "AI"}}
      })
      expect(newState.winner).toEqual("AI")
    })
    
    it('can set the winner as USER', () => {
      const newState = gameReducer(this.initialState.game, {
        {type: "SET_WINNER", payload: {winner: "USER"}}
      })
      expect(newState.winner).toEqual("USER")
    })
    
    it('does not modify deck, userCards, or aiCards', () => {
      const newState = gameReducer(this.initialState.game, {
        {type: "SET_WINNER", payload: {winner: "AI"}}
      })
      expect(newState.deck.legnth).toEqual(52)
      expect(newState.userCards).toEqual([])
      expect(newState.aiCards).toEqual([])
    })
  })

  describe('"RESET_GAME" case', () =>{
    it('should set the same to initial state', () => {
      const newState = gameReducer(undefined, {type: 'RESET_GAME'})
      expect(newState.userCards).toEqual([])
      expect(newState.aiCards).toEqual([])
      expect(newState.deck.length).toEqual(52)
      expect(newState.deck).toEqual(initialState.game.deck)
      expect(newState.winner).toEqual(null)
    })
  })
})