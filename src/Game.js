import React from 'react';

const Game = (props) => {
  return(
    <div>
      <button className="newGame" onClick={props.newGame}>New Game</button>  
      
      <h1 className="winner">
        {props.winner ? `The winner is ${props.winner}!`:''}
      </h1>
      
      <div className="col-sm-6">
        <h2 className='user-total'>Your hand: {props.calculateScore(props.userCards)}</h2>
        <ul>
          {props.userCards.map((c, i) => <li key={i}>{c.name}</li>)}
        </ul>
        <button
          className = "hitUser"
          onClick={props.hitUser.bind(undefined, props.deck, props.userCards)}>
          Hit Me
        </button>
        <button
          className = "stay"
          onClick={props.aiTurn.bind(undefined, props.deck, props.aiCards)}>
          Stay
        </button>
      </div>
      <div className="col-sm-6">
        <h2 className='ai-total'>AI Hand: {props.calculateScore(props.aiCards)}</h2>
          <ul>
            {props.aiCards.map((c, i) => <li key={i}>{c.name}</li>)}
          </ul>
      </div>
    </div>
  )
}

export default Game;
