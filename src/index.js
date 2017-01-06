import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './store/configureStore';

import { resetGame, startGame } from './actions/gameActions';

const store = configureStore();

store.dispatch(resetGame());
// store.dispatch(startGame(store.getState().game.deck))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container')
);


