import React from 'react';

const Game = (props) => {
  
  function hitMe(){
    props.triggerExecuteRound()
  }

  function userTotal() {
    return props.userCards.reduce((acc, card) => {return acc + card.value}, 0)
  }

  function computerTotal() {
    return props.aiCards.reduce((acc, card) => {return acc + card.value}, 0)
  }

  function playAgain() {
    props.triggerResetGame()
  }

  function renderWinner() {
    return (
      <div>
        <p>{props.winner}</p>
        <p>your score: {userTotal()}</p>
        <p>computer score: {computerTotal()}</p>
        <p><button onClick={playAgain} className="btn btn-large">play again</button></p>
      </div>
    )
  }

  function renderPlayButton() {
    return (
      <div>
        <p>your total: {userTotal()}</p>
        <p><button className="btn btn-large" onClick={hitMe}>hit me</button></p>
      </div>
    )
  }

  return (
    <div className="col-lg-12">
      {props.winner ? renderWinner() : renderPlayButton()}  
    </div>
  )
}

export default Game;
