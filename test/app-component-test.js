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

function setup() {
  const mockStore = configureStore([]);
  const store = mockStore({game: initialState});
  const wrapper = shallow(<App store={store}/>)
  return {
    wrapper
  }
}

function setUpMount() {
  const mockStore = configureStore([]);
  const store = mockStore({game: initialState});
  const component = mount(<App store={store}/>)
  return {
    component
  }
}

describe('<App/>', function () {

  beforeEach(function(){
    this.initialState = {game: initialState};
  })

  it('should have a prop, `game`, set via mapStateToProps', function() {
    const {wrapper} = setup()

    expect(wrapper.props().game).toEqual(this.initialState.game)
  })

  it('should render the Game component as a child', function () {
    const { wrapper } = setup()
    expect(wrapper.shallow().find('Game').length).toEqual(1)
  });


  it('should be connected to the store via the `connect` function', function() {
    const { wrapper } = setup()
    expect(wrapper.unrendered.type.displayName).toEqual('Connect(App)')
  })

  it('should use mapDispatchToProps to pass the action creator functions to the component under this.props.actions', function() {
    const { wrapper } = setup()
    console.log(`my keys are ${Object.keys(wrapper.node.props)}`)
    expect(Object.keys(wrapper.node.props.actions)).toEqual(["resetGame", "startGame", "hitAI", "hitUser"])
  })
  
  describe('newGame', function(){
    it('should have a function called "newGame"', function(){
      const {wrapper} = setup()
      expect(wrapper.newGame).toExist;
      expect(wrapper.newGame).toBeAFunction
    })
    it('should dispatch the `resetGame` and `startGame` action creators', function(){
      const {wrapper} = setup()
      const resetGame = sinon.spy(wrapper.shallow().instance().props.actions, 'resetGame')
      const startGame = sinon.spy(wrapper.shallow().instance().props.actions, 'startGame')
      wrapper.shallow().instance().newGame()    
      expect(resetGame.calledOnce).toEqual(true)
      expect(startGame.calledOnce).toEqual(true)
    })
  })
  
  describe('calculateScore', function(){
    it('should calculate the score of an array of cards', function(){
      const {wrapper} = setup()
      const hand = [
        {name:"Ace of Spades", value: 1},
        {name:"Six of Diamonds", value: 6},
        {name:"Jack of Diamonds", value: 10}
      ]
      const calculateScore = wrapper.shallow().instance().calculateScore
      expect(calculateScore(hand)).toEqual(17)
    })
  })
  
  describe('aiTurn()', function(){
    it('should call `hitAi` from your actions', function(){
      const {wrapper} = setup()
      const hitAI = sinon.spy(wrapper.shallow().instance().props.actions, 'hitAI')
      const userScore = wrapper.shallow().instance().props.game.userCards.reduce((sum,c)=>{
        return sum + c.value
      }, 0)
      wrapper.shallow().instance().aiTurn()    
      expect(hitAI.calledWith(
        wrapper.shallow().instance().props.game.deck,
        wrapper.shallow().instance().props.game.aiCards,
        userScore
      )).toEqual(true)
    })
  }) 
});