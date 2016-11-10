import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as gameActions from './actions/gameActions';


class App extends Component {
  constructor(props) {
    super(props);
    this.hitMe = this.hitMe.bind(this)
    this.playAgain = this.playAgain.bind(this)
  }

  hitMe(){
    this.props.actions.executeRound()
  }

  userTotal() {
    return this.props.game.userCards.reduce((acc, card) => {return acc + card.value}, 0)
  }

  computerTotal() {
    return this.props.game.aiCards.reduce((acc, card) => {return acc + card.value}, 0)
  }

  playAgain() {
    this.props.actions.resetGame()
  }

  renderWinner() {
    return (
      <div>
        <p>{this.props.game.winner}</p>
        <p>your score: {this.userTotal()}</p>
        <p>computer score: {this.computerTotal()}</p>
        <p><button onClick={this.playAgain} className="btn btn-large">play again</button></p>
      </div>
    )
  }

  renderButton() {
    return (
      <div>
        <p>your total: {this.userTotal()}</p>
        <p><button className="btn btn-large" onClick={this.hitMe}>hit me</button></p>
      </div>
    )
  }
  

  render() {
    return (
      <div className="App col-lg-12" style={{textAlign: 'center'}}>
        <div>
          <h2>Welcome to The Flatiron Casino</h2>
        </div>
        <div className="col-lg-12">
          {this.props.game.winner ? this.renderWinner() : this.renderButton()}  
        </div>
        <div className="col-lg-12">
        </div>
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

