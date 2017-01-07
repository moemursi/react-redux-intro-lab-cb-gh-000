import expect, { createSpy, spyOn, isSpy } from 'expect'

import * as gameActions from '../src/actions/gameActions'
import { initialDeck } from '../src/lib/initialState'

describe('game actions', () => {
  
  beforeEach(function(){
    this.deck = initialDeck
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

    it('it returns an object with the `deck` minus the starting hand for the user and AI', function(){
      expect(gameActions.startGame).toBeA('function', 'startGame is not a function')
      const startGameAction = gameActions.startGame(this.deck)
      expect(startGameAction.deck.length).toEqual(48);
    })

    it('it returns an object with the `userCards` and `aiCards`', function(){
      expect(gameActions.startGame).toBeA('function', 'startGame is not a function')
      const startGameAction = gameActions.startGame(this.deck)
      expect(startGameAction.userCards.length).toEqual(2);
      expect(startGameAction.aiCards.length).toEqual(2);
    })
  })
  
  describe('hitAI()', function(){
    it('returns with `type` "HIT_AI"', function(){
      const aiCards = [];
      const userScore = 1;
      expect(gameActions.hitAI(this.deck, aiCards, userScore).type).toEqual("HIT_AI")
    })
    it('returns with an object with a smaller `deck`', function(){
      const aiCards = [];
      const userScore = 1;
      const hitAiAction = gameActions.hitAI(this.deck, aiCards, userScore);
      expect(hitAiAction.deck.length).toBeLessThan(this.deck.length);
    })
    it('returns with an object with a larger `aiCards`', function(){
      const aiCards = [];
      const userScore = 1;
      const hitAiAction = gameActions.hitAI(this.deck, aiCards, userScore);
      expect(hitAiAction.aiCards.length).toEqual(aiCards.length + 1)
    })
    it('keeps drawing cards until the AI score is greater than the Users', function(){
      const aiCards = [];
      const userScore = 21;
      const hitAiAction = gameActions.hitAI(this.deck, aiCards, userScore);
      expect(hitAiAction.aiCards.length).toBeGreaterThan(2)
    })
    it('stops drawing cards as soon as the AI has a higher score than the user', function(){
      const aiCards = [];
      const userScore = 0;
      const hitAiAction = gameActions.hitAI(this.deck, aiCards, userScore);
      expect(hitAiAction.aiCards.length).toEqual(1)
    })
    it('returns with an object with a larger an `aiCards` value greater than the userScore', function(){
      const aiCards = [];
      const userScore = 20;
      const hitAiAction = gameActions.hitAI(this.deck, aiCards, userScore);
      const aiScore = hitAiAction.aiCards.reduce((sum, c)=> sum + c.value, 0)
      expect(aiScore).toBeGreaterThan(userScore)
    })
    it('returns an object with a `winner` of of "AI" if the AI has a higher score than the user and less than 21 points', function(){
      const aiCards = [];
      const userScore = 1;
      const hitAiAction = gameActions.hitAI(this.deck, aiCards, userScore);
      expect(hitAiAction.winner).toEqual("AI")
    })
    it('returns an object with a `winner` of of "User" if the AI has a score greater than 21', function(){
      const aiCards = [];
      const userScore = 21;
      const hitAiAction = gameActions.hitAI(this.deck, aiCards, userScore);
      expect(hitAiAction.winner).toEqual("User")
    })
  })
  
  describe('hitUser()', function(){
    it('returns with `type` "HIT_USER"', function(){
      expect(gameActions.hitUser(this.deck, []).type).toEqual("HIT_USER")
    })
    it('returns with an object with one less card in the `deck`', function(){
      const hitUserAction = gameActions.hitUser(this.deck, []);
      expect(hitUserAction.deck.length).toEqual(this.deck.length - 1);
    })
    it('returns with an object with one more card in the `userCards`', function(){
      const userCards = [];
      const hitUserAction = gameActions.hitUser(this.deck, userCards);
      expect(hitUserAction.userCards.length).toEqual(userCards.length + 1)
    })
    it('returns with an object with a non-null `winner` if the user score is 21 or over 21', function(){
      const userCards = [ {name:"King of Clubs", value: 10}, {name:"King of Hearts", value: 10} ];
      const hitUserAction = gameActions.hitUser(this.deck, userCards);
      expect(hitUserAction.winner).toNotEqual(null)
    })
    it('returns with an object with a `winner` of null if the user does not yet have 21 or more points', function(){
      const userCards = [];
      const hitUserAction = gameActions.hitUser(this.deck, userCards);
      expect(hitUserAction.winner).toEqual(null)
    })
  })
})