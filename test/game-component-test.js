import React from 'react'
import { shallow, mount} from 'enzyme'
import expect, { createSpy, spyOn, isSpy } from 'expect'
import ReactTestUtils from 'react-addons-test-utils'
import sinon from 'sinon'
import { initialState } from '../src/lib/initialState'
import App from '../src/App'
import Game from '../src/Game'

import configureStore from 'redux-mock-store';
import { Provider, connect} from 'react-redux';

const stateWithUserWinnerBecause21Points = {
  game: {
    winner: 'User',
    userCards: [
      {name:"Jack of Spades", value: 10}, 
      {name:"King of Spades", value: 10}, 
      {name:"Ace of Diamonds", value: 1}
    ],
    aiCards: [],
    deck: [
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
     {name:"Jack of Clubs", value: 10},
     {name:"Jack of Hearts", value: 10},
     {name:"Queen of Diamonds", value: 10},
     {name:"Queen of Spades", value: 10},
     {name:"Queen of Clubs", value: 10},
     {name:"Queen of Hearts", value: 10},
     {name:"King of Diamonds", value: 10},
     {name:"King of Clubs", value: 10},
     {name:"King of Hearts", value: 10}
   ]
  }
}

const stateWithComputerWinnerBecause21Points = {
  game: {
    winner: 'AI',
    userCards: [],
    aiCards: [
      {name:"Jack of Spades", value: 10}, 
      {name:"King of Spades", value: 10}, 
      {name:"Ace of Diamonds", value: 1}
    ],
    deck: [
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
     {name:"Jack of Clubs", value: 10},
     {name:"Jack of Hearts", value: 10},
     {name:"Queen of Diamonds", value: 10},
     {name:"Queen of Spades", value: 10},
     {name:"Queen of Clubs", value: 10},
     {name:"Queen of Hearts", value: 10},
     {name:"King of Diamonds", value: 10},
     {name:"King of Clubs", value: 10},
     {name:"King of Hearts", value: 10}
   ]
  }
}

const stateWithUserLoserBecauseMoreThan21Points = {
  game: {
    winner: 'AI',
    userCards: [
      {name:"Jack of Spades", value: 10}, 
      {name:"King of Spades", value: 10}, 
      {name:"Ace of Diamonds", value: 1},
      {name:"Ace of Spades", value: 1}
    ],
    aiCards: [],
    deck: [
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
     {name:"Jack of Clubs", value: 10},
     {name:"Jack of Hearts", value: 10},
     {name:"Queen of Diamonds", value: 10},
     {name:"Queen of Spades", value: 10},
     {name:"Queen of Clubs", value: 10},
     {name:"Queen of Hearts", value: 10},
     {name:"King of Diamonds", value: 10},
     {name:"King of Clubs", value: 10},
     {name:"King of Hearts", value: 10}
   ]
  }
}

const stateWithUserWinnerBecauseComputerGreaterThan21Points = {
  game: {
    winner: 'User',
    userCards: [],
    aiCards: [
      {name:"Jack of Spades", value: 10}, 
      {name:"King of Spades", value: 10}, 
      {name:"Ace of Diamonds", value: 1},
      {name:"Ace of Spades", value: 1}
    ],
    deck: [
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
     {name:"Jack of Clubs", value: 10},
     {name:"Jack of Hearts", value: 10},
     {name:"Queen of Diamonds", value: 10},
     {name:"Queen of Spades", value: 10},
     {name:"Queen of Clubs", value: 10},
     {name:"Queen of Hearts", value: 10},
     {name:"King of Diamonds", value: 10},
     {name:"King of Clubs", value: 10},
     {name:"King of Hearts", value: 10}
   ]
  }
}

function setup() {
  const mockStore = configureStore([]);
  const store = mockStore({game: initialState});
  const wrapper = shallow(<App store={store}/>)
  return {
    wrapper
  }
}

function mountApp() {
  const mockStore = configureStore([]);
  const store = mockStore({game: initialState});
  const app = mount(<Provider store={store}><App/></Provider>)
  return {
    app
  }
}

describe('<Game/>', function () {

  describe('props', function(){
    beforeEach(function(){
      const {wrapper} = setup()
      this.newGameSpy = sinon.spy();
      this.hitUser = sinon.spy();
      this.aiTurn = sinon.spy();
      const calculateScore = hand => hand.reduce((sum, card) => sum + card.value, 0)
      this.gameComponent = shallow(<Game 
        deck= {initialState.deck}
        userCards = {initialState.userCards}
        winner = {initialState.winner}
        aiCards = {initialState.aiCards}
        newGame={this.newGameSpy}
        calculateScore = {calculateScore}
        hitUser = {this.hitUser}
        aiTurn = {this.aiTurn}
      />)
    })
    it('should have `deck` and `winner`, set by passing the winner down from the App component', function() {
      expect(this.gameComponent.node.props.winner).toEqual(null)
      expect(this.gameComponent.node.props.deck).toEqual([])
    })
    
    it('should have props, `userCards` and `aiCards`, passed down from the App component', function() {
      expect(this.gameComponent.node.props.userCards).toEqual([])
      expect(this.gameComponent.node.props.aiCards).toEqual([])
    })
    
    it('should have prop `newGame` that is a functions passed down from the App component', function() {
      expect(this.gameComponent.node.props.newGame).toBe.defined
    })
    
    it('should have props, `hitUser` and `aiTurn`, that are functions passed down from the App component', function() {
      expect(this.gameComponent.node.props.hitUser).toBe.defined
      expect(this.gameComponent.node.props.aiTurn).toBe.defined
    })
    
    it('should have prop `calculateScore` that is a helper function passed down from the App component', function() {
      expect(this.gameComponent.node.props.calculateScore).toBe.defined
    })
  })

  describe('buttons', function(){
    beforeEach(function(){
      this.initialState = {game: initialState};
      const {wrapper} = setup()
      this.newGameSpy = sinon.spy();
      this.hitUser = sinon.spy();
      this.aiTurn = sinon.spy();
      const calculateScore = hand => hand.reduce((sum, card) => sum + card.value, 0)
      this.gameComponent = shallow(<Game 
        {...this.initialState.game}
        newGame={this.newGameSpy}
        calculateScore = {calculateScore}
        hitUser = {this.hitUser}
        aiTurn = {this.aiTurn}
      />)
    })
    it('invokes the `newGame` function from props when the button with a class of "newGame" is clicked', function() {
      this.gameComponent.find('.newGame').simulate('click')
      expect(this.newGameSpy.calledOnce).toEqual(true)

    })
    it('invokes the `hitUser` function from props when the button with a class of "hitMe" is clicked', function() {
      this.gameComponent.find('.hitUser').simulate('click')
      expect(this.hitUser.calledOnce).toEqual(true)
    })
    it('invokes the `aiTurn` function from props when the button with a class of "stay" is clicked', function() {
      this.gameComponent.find('.stay').simulate('click')
      expect(this.aiTurn.calledOnce).toEqual(true)
    })
    
  })
  
  describe('displays', function(){
    beforeEach(function(){
      this.initialState = {game: initialState};
      const {wrapper} = setup()
      this.newGameSpy = sinon.spy();
      this.hitUser = sinon.spy();
      this.aiTurn = sinon.spy();
      const calculateScore = hand => hand.reduce((sum, card) => sum + card.value, 0)
      this.gameComponent = shallow(<Game 
        {...this.initialState.game}
        newGame={this.newGameSpy}
        calculateScore = {calculateScore}
        hitUser = {this.hitUser}
        aiTurn = {this.aiTurn}
      />)
    })
    it('should display the user total in a div with the class \'user-total\' and a button with a class of "hitUser" and text of "Hit Me" if the game is not yet over', function() {
      expect(this.gameComponent.find('.hitUser').text()).toBe('Hit Me')
      expect(this.gameComponent.find('.user-total').text()).toBe('Your hand: 0')
    })
  })

  describe('game over with AI winner with 21 points', function(){
    beforeEach(function(){
      const {wrapper} = setup()
      this.hitUser = sinon.spy();
      this.aiTurn = sinon.spy();
      const calculateScore = hand => hand.reduce((sum, card) => sum + card.value, 0)
      this.gameComponent = shallow(<Game 
        {...stateWithComputerWinnerBecause21Points.game}
        calculateScore = {calculateScore}
        hitUser = {this.hitUser}
        aiTurn = {this.aiTurn}
      />)
    })
    it('should display the user total and the computer total if the game is over with message for who won', function() {
      expect(this.gameComponent.find('.user-total').text()).toBe('Your hand: 0')
      expect(this.gameComponent.find('.ai-total').text()).toBe('AI Hand: 21')
      expect(this.gameComponent.find('.winner').text()).toBe('The winner is AI!')
    })
  })
  
  describe('game over with User winner with 21 points', function(){
    beforeEach(function(){
      const {wrapper} = setup()
      this.hitUser = sinon.spy();
      this.aiTurn = sinon.spy();
      const calculateScore = hand => hand.reduce((sum, card) => sum + card.value, 0)
      this.gameComponent = shallow(<Game 
        {...stateWithUserWinnerBecause21Points.game}
        calculateScore = {calculateScore}
        hitUser = {this.hitUser}
        aiTurn = {this.aiTurn}
      />)
    })
    it('should display the text "The winner is User!" if the user won by hitting 21 points', function() {
      expect(this.gameComponent.find('.user-total').text()).toBe('Your hand: 21')
      expect(this.gameComponent.find('.ai-total').text()).toBe('AI Hand: 0')
      expect(this.gameComponent.find('.winner').text()).toBe('The winner is User!')
    })
  })

  describe('game over with User winner because AI busts', function(){
    beforeEach(function(){
      const {wrapper} = setup()
      this.hitUser = sinon.spy();
      this.aiTurn = sinon.spy();
      const calculateScore = hand => hand.reduce((sum, card) => sum + card.value, 0)
      this.gameComponent = shallow(<Game 
        {...stateWithUserWinnerBecauseComputerGreaterThan21Points.game}
        calculateScore = {calculateScore}
        hitUser = {this.hitUser}
        aiTurn = {this.aiTurn}
      />)
    })
    it('should display the text "The winner is User!" if the user won by hitting 21 points', function() {
      expect(this.gameComponent.find('.user-total').text()).toBe('Your hand: 0')
      expect(this.gameComponent.find('.ai-total').text()).toBe('AI Hand: 22')
      expect(this.gameComponent.find('.winner').text()).toBe('The winner is User!')
    })
  })
  
  describe('game over with AI winner because User busts', function(){
    beforeEach(function(){
      const {wrapper} = setup()
      this.hitUser = sinon.spy();
      this.aiTurn = sinon.spy();
      const calculateScore = hand => hand.reduce((sum, card) => sum + card.value, 0)
      this.gameComponent = shallow(<Game 
        {...stateWithUserLoserBecauseMoreThan21Points.game}
        calculateScore = {calculateScore}
        hitUser = {this.hitUser}
        aiTurn = {this.aiTurn}
      />)
    })
    it('should display the text "The winner is User!" if the user won by hitting 21 points', function() {
      expect(this.gameComponent.find('.user-total').text()).toBe('Your hand: 22')
      expect(this.gameComponent.find('.ai-total').text()).toBe('AI Hand: 0')
      expect(this.gameComponent.find('.winner').text()).toBe('The winner is AI!')
    })
  })
  
  describe('game over with AI winner wtih 21 points', function(){
    beforeEach(function(){
      const {wrapper} = setup()
      this.hitUser = sinon.spy();
      this.aiTurn = sinon.spy();
      const calculateScore = hand => hand.reduce((sum, card) => sum + card.value, 0)
      this.gameComponent = shallow(<Game 
        {...stateWithComputerWinnerBecause21Points.game}
        calculateScore = {calculateScore}
        hitUser = {this.hitUser}
        aiTurn = {this.aiTurn}
      />)
    })
    it('should display the text "The winner is User!" if the user won by hitting 21 points', function() {
      expect(this.gameComponent.find('.user-total').text()).toBe('Your hand: 0')
      expect(this.gameComponent.find('.ai-total').text()).toBe('AI Hand: 21')
      expect(this.gameComponent.find('.winner').text()).toBe('The winner is AI!')
    })
  })

});