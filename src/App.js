import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from './actions/gameActions';
import Game from './Game'

class App extends Component {
  constructor(props) {
    super(props);
    this.executeRound = this.executeRound.bind(this)
    this.resetGame = this.resetGame.bind(this)
  }

  executeRound(){
    this.props.actions.executeRound()
  }

  resetGame() {
    this.props.actions.resetGame()
  }

    // renderWinner() {
    //   return (
    //     <div>
    //       <p>{this.props.game.winner}</p>
    //       <p>your score: {this.userTotal()}</p>
    //       <p>computer score: {this.computerTotal()}</p>
    //       <p><button onClick={this.playAgain} className="btn btn-large">play again</button></p>
    //     </div>
    //   )
    // }

    // renderButton() {
    //   return (
    //     <div>
    //       <p>your total: {this.userTotal()}</p>
    //       <p><button className="btn btn-large" onClick={this.hitMe}>hit me</button></p>
    //     </div>
    //   )
    // }
  

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
          triggerExecuteRound={this.executeRound} 
          triggerResetGame={this.resetGame} />
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

