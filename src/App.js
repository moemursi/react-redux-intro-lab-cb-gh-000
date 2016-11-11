import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from './actions/gameActions';
import Game from './Game'

class App extends Component {
  constructor(props) {
    super(props);
    this.playRound = this.playRound.bind(this)
    this.reset = this.reset.bind(this)
  }

  playRound(){
    this.props.actions.executeRound()
  }

  reset() {
    this.props.actions.resetGame()
  }

  render() {
    return (
      <div className="App col-lg-12" style={{textAlign: 'center'}}>
        <div>
          <h2>Welcome to The Flatiron Casino</h2>
        </div>
        <Game 
          winner={this.props.game.winner} 
          userCards={this.props.game.userCards} 
          aiCards={this.props.game.aiCards} 
          triggerExecuteRound={this.playRound} 
          triggerResetGame={this.reset} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {game: state.game}
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(gameActions, dispatch)}
}

const connector = connect(mapStateToProps, mapDispatchToProps)
const connectedComponent = connector(App)

export default connectedComponent;

