import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { resetGame, startGame, hitAI, hitUser, setWinner } from './actions/gameActions'

import Game from './game';

class App extends Component {
  constructor(props){
    super(props);
    
    this.newGame = this.newGame.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.aiTurn = this.aiTurn.bind(this);
  }
  
  calculateScore(hand){
    return hand.reduce((sum, card) => sum + card.value, 0)
  }
  
  aiTurn(){
    this.props.actions.hitAI(
      this.props.game.deck,
      this.props.game.aiCards,
      this.calculateScore(this.props.game.userCards)
    );
  }
  
  newGame(){
    this.props.actions.resetGame();
    this.props.actions.startGame(this.props.game.deck);
  }

  render() {
    return (
      <div className="App col-lg-12" style={{textAlign: 'center'}}>
        <div>
          <h2>Welcome to The Flatiron Casino</h2>
        </div>
        <Game 
          deck = {this.props.game.deck}
          winner = {this.props.game.winner}
          userCards = {this.props.game.userCards}
          aiCards = {this.props.game.aiCards}
          newGame = {this.newGame}
          hitUser = {this.props.actions.hitUser}
          calculateScore = {this.calculateScore}
          aiTurn = {this.aiTurn}
        />
      </div>
    );
  }
}

function mapStateToProps(state){
  return {game: state.game}
}

function mapDispatchToProps(dispatch){
  return {actions: bindActionCreators({ resetGame, startGame, hitAI, hitUser, setWinner }, dispatch)};
}

const connector = connect(
  mapStateToProps,
  mapDispatchToProps
);
const connectedComponent = connector(App)

export default connectedComponent;