import * as gameActions from '../src/actions/gameActions'

describe('game actions', () => {
  
  beforeEach(function(){
    this.deck = [
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
  })
  
  describe('`resetGame()`', function(){
    it('returns an action with type "RESET_GAME"', function(){
      expect(gameActions.resetGame().type).toEqual("RESET_GAME")
    })
  })
  
  describe('`startGame()`', function(){
    it('is defined in actions', function(){
      expect(gameActions.startGame).toExist('startGame action is not defined')
    })

    it('it returns with `type` "START_GAME"', function(){
      expect(gameActions.startGame(this.deck).type).toEqual("START_GAME")
    })

    it('it returns a `payload` with the deck minus the starting hand for the user and AI', function(){
      expect(gameActions.startGame).toBeA('function', 'startGame is not a function')
      const startGamePayload = gameActions.startGame(this.deck).payload
      expect(startGamePayload.deck.length).toEqual(48);
    })

    it('it returns a `payload` with the user and ai cards', function(){
      expect(gameActions.startGame).toBeA('function', 'startGame is not a function')
      const startGamePayload = gameActions.startGame(this.deck).payload
      expect(startGamePayload.userCards.length).toEqual(2);
      expect(startGamePayload.aiCards.length).toEqual(2);
    })
  })
  
  describe('hitAI()', function(){
    it('returns with `type` "HIT_AI"', function(){
      expect(gameActions.hitAI(this.deck, []).type).toEqual("HIT_AI")
    })
    it('returns with a `payload` with one less in the `deck`', function(){
      console.log(`The deck length is ${this.deck.length}`)
      const hitAiPayload = gameActions.hitAI(this.deck, []).payload;
      expect(hitAiPayload.deck.length).toEqual(this.deck.length - 1);
    })
    it('returns with a `payload` with one more in the `aiCards`', function(){
      const aiCards = [];
      const hitAiPayload = gameActions.hitAI(this.deck, aiCards).payload;
      expect(hitAiPayload.aiCards.length).toEqual(aiCards.length + 1)
    })
  })
  
  describe('hitUser()', function(){
    it('returns with `type` "HIT_USER"', function(){
      expect(gameActions.hitUser(this.deck, []).type).toEqual("HIT_USER")
    })
    it('returns with a `payload` with one less in the `deck`', function(){
      const hitUserPayload = gameActions.hitUser(this.deck, []).payload;
      expect(hitUserPayload.deck.length).toEqual(this.deck.length - 1);
    })
    it('returns with a `payload` with one more in the `userCards`', function(){
      const userCards = [];
      const hitUserPayload = gameActions.hitUser(this.deck, userCards).payload;
      expect(hitUserPayload.aiCards.length).toEqual(userCards.length + 1)
    })
  })
})