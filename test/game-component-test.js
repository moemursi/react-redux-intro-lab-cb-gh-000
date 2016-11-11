import React from 'react'
import { shallow, mount} from 'enzyme'
import expect, { createSpy, spyOn, isSpy } from 'expect'
import ReactTestUtils from 'react-addons-test-utils'
import sinon from 'sinon'
import App from '../src/App'
import Game from '../src/Game'

import configureStore from 'redux-mock-store';
import { Provider, connect} from 'react-redux';

const initialState = {
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

const stateWithUserWinnerBecause21Points = {
  game: {
    winner: 'You win!',
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
    winner: 'Computer wins!',
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
    winner: 'You lose :(',
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
    winner: 'You win!',
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
  const store = mockStore(initialState);
  const wrapper = shallow(<App store={store}/>)
  return {
    wrapper
  }
}

function mountApp() {
  const mockStore = configureStore([]);
  const store = mockStore(initialState);
  const app = mount(<Provider store={store}><App/></Provider>)
  return {
    app
  }
}

describe('<Game/>', function () {

  it('should have a prop, `winner`, set by passing the winner down from the App component', function() {
    const {wrapper} = setup()
    const gameComponent = wrapper.shallow().find('Game')
    expect(gameComponent.node.props.winner).toEqual(null)
  })
  it('should have props, `userCards` and `aiCards`, passed down from the App component', function() {
    const {wrapper} = setup()
    const gameComponent = wrapper.shallow().find('Game')
    expect(gameComponent.node.props.userCards).toEqual([])
    expect(gameComponent.node.props.aiCards).toEqual([])
  })

  it('should have props, `triggerExecuteRound` and `triggerResetGame`, that are functions passed down from the App component', function() {
    const {wrapper} = setup()
    const gameComponent = wrapper.shallow().find('Game')
    expect(gameComponent.node.props.triggerExecuteRound).toBe.defined
    expect(gameComponent.node.props.triggerResetGame).toBe.defined

  })

  it('should display the user total and a button with a class of "play" and text of "hit me" if the game is not yet over', function() {
    const gameComponent = shallow(<Game {...initialState.game} />)
    expect(gameComponent.find('.play').text()).toBe('hit me')
    expect(gameComponent.find('.user-total').text()).toBe('your total: 0')
  })

  it('should display the user total and the computer total and the button with a class of "reset" and the text of "play again" if the game is over', function() {
    const gameComponent = shallow(<Game {...stateWithComputerWinnerBecause21Points.game} />)
    expect(gameComponent.find('.reset').text()).toBe('play again')
    expect(gameComponent.find('.user-total').text()).toBe('your score: 0')
    expect(gameComponent.find('.computer-total').text()).toBe('computer score: 21')
    expect(gameComponent.find('.winner').text()).toBe('Computer wins!')
  })

  it('should display the text "You win!" if the user won by hitting 21 points', function() {
    const gameComponent = shallow(<Game {...stateWithUserWinnerBecause21Points.game} />)
    expect(gameComponent.find('.reset').text()).toBe('play again')
    expect(gameComponent.find('.user-total').text()).toBe('your score: 21')
    expect(gameComponent.find('.computer-total').text()).toBe('computer score: 0')
    expect(gameComponent.find('.winner').text()).toBe('You win!')
  })

  it('should display the text "You win!" if the user won as a result of the computer exceeding 21 points', function() {
    const gameComponent = shallow(<Game {...stateWithUserWinnerBecauseComputerGreaterThan21Points.game} />)
    expect(gameComponent.find('.reset').text()).toBe('play again')
    expect(gameComponent.find('.user-total').text()).toBe('your score: 0')
    expect(gameComponent.find('.computer-total').text()).toBe('computer score: 22')
    expect(gameComponent.find('.winner').text()).toBe('You win!')
  })

  it('should display the text "You loose!" if the user exceeds 21 points', function() {
    const gameComponent = shallow(<Game {...stateWithUserLoserBecauseMoreThan21Points.game} />)
    expect(gameComponent.find('.reset').text()).toBe('play again')
    expect(gameComponent.find('.user-total').text()).toBe('your score: 22')
    expect(gameComponent.find('.computer-total').text()).toBe('computer score: 0')
    expect(gameComponent.find('.winner').text()).toBe('You lose :(')
  })

  it('should display the text "Computer wins!" if the computer won by hitting 21 points', function() {
    const gameComponent = shallow(<Game {...stateWithComputerWinnerBecause21Points.game} />)
    expect(gameComponent.find('.reset').text()).toBe('play again')
    expect(gameComponent.find('.user-total').text()).toBe('your score: 0')
    expect(gameComponent.find('.computer-total').text()).toBe('computer score: 21')
    expect(gameComponent.find('.winner').text()).toBe('Computer wins!')
  })

  it('invokes the `triggerExecuteRound` function from props when the button with a class of "play" is clicked', function() {
    const {wrapper} = setup()
    const triggerExecuteRoundSpy = sinon.spy()
    const gameComponent = shallow(<Game {...initialState.game} triggerExecuteRound={triggerExecuteRoundSpy}/>)
    gameComponent.find('.play').simulate('click')
    expect(triggerExecuteRoundSpy.calledOnce).toEqual(true)

  })

  it('invokes the `triggerResetGame` function from props when the button with a class of "reset" is clicked', function() {
    const triggerresetGameSpy = sinon.spy()
    const gameComponent = shallow(<Game {...stateWithUserWinnerBecause21Points.game} triggerResetGame={triggerresetGameSpy}/>)
    gameComponent.find('.reset').simulate('click')
    expect(triggerresetGameSpy.calledOnce).toEqual(true)
  })
});













