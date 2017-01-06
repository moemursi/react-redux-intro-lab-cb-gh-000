import React from 'react';

const Game = (props) => {
  return(
    <div>
      <button hidden={(props.userCards.length > 0 && !props.winner)} onClick={props.newGame}>New Game</button>  
      
      <h1>
        {props.winner ? `The Winner is: ${props.winner}`:''}
      </h1>
      
      <div className="col-sm-6">
        <h2>Your Hand: {props.calculateScore(props.userCards)}</h2>
        <ul>
          {props.userCards.map((c, i) => <li key={i}>{c.name}</li>)}
        </ul>
        <button 
          hidden={(props.userCards.length == 0 || props.winner)}
          onClick={props.hitUser.bind(undefined, props.deck, props.userCards)}>
          Hit Me
        </button>
        <button
          hidden={(props.userCards.length == 0 || props.winner)}
          onClick={props.stay.bind(undefined, props.deck, props.aiCards)}>
          Stay
        </button>
      </div>
      <div className="col-sm-6">
        <h2>AI Cards: : {props.calculateScore(props.aiCards)}</h2>
          <ul>
            {props.aiCards.map((c, i) => <li key={i}>{c.name}</li>)}
          </ul>
      </div>
    </div>
  )
}

export default Game;
