# Redux Blackjack

Build a Redux implementation of a simple blackjack game!

## Objectives

* Build a working version of blackjack using Redux tools and patterns
* Store application state in one central store
* Use the container pattern to build your components
* Update state via user interaction with your components by following the Redux pattern

## Instructions

Your goal is to build a very simple version of Blackjack. In our version of the game, a user should be able to click a button, "hit me", to get a new card dealt to them. When they click this button, their total points will be incremented as a result of this new card being dealt to them.

Every time a card is dealt to the user, a card should be dealt to our AI player as well. 

A user wins if they hit exactly 21 points or if the AI player loses by exceeding 21 points. The user loses if they exceed 21 points or if the AI player wins by hitting exactly 21 points.

It should work like this:

![](https://s3-us-west-2.amazonaws.com/curriculum-content/web-development/react/blackjack_redux.gif)

Clone down this lab, run `npm install` and `npm test` to get started. This is a complicated assignment, so read the instructions below very carefully.

### Things to Think About 

We need a state object that can keep track of the following:

* Total deck of cards
* User's cards
* AI player's card
* Whether or not there is a winner, and who the winner is. 

Your initial state should therefore look something like this:

```js
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

```

### Step 1: Buid the Store, Reducer and Action Creators

First things first, use the Redux `configureStore` function to create a store with a reducer. Build a reducer, `gameReducer`, that can respond to the following actions:

* `executeRound`
* `resetGame`

The reducer should respond to the `executeRound` action by:

* Dealing one card to the user (i.e. removing a card from the state's deck property and putting it in the user card collection)
* Dealing one card to the AI player (i.e. removing another card from the state's deck property and putting it in the AI card collection) 
* Checking to see if there is a winner
* Returning a new copy of game state with the new user card and AI card collections, the new deck collection (with the two cards you dealt from it having been removed) and a new value for `winner`, if applicable. 

In order to determine whether or not there is a winner, you will have to think about the following:

* The user wins if they have a point total of exactly 21 OR if the computer has a point total that exceeds 21. If this is the case, the value of `winner` should be set to: `You win!`
* The computer wins if the AI player has a point total of exactly 21. If this is the case, the value of `winner` should be set to `Computer wins!`.
* If the user has a point value that exceeds 21, the computer wins and the value of `winner` should be set to `You lose :(`


The reducer should respond to the `resetGame` action by returning the original version of state, `initialState.game`. 

**Note:** Remember to wrap your `App` component in the `<Provider>` and pass your store instance to the `<Provider>` in `index.js`.

### Step 2: Building The Components 

We'll be using the container component pattern. Build a top level container, `App`, that uses `mapStateToProps` to pull the game info from state. 

`App` will need access to the action creator functions. Pass them into `App.props.actions` using `mapDispatchToProps`.

Finally, use `connect` to connect `App` to the store.

`App` will render a child component, `Game`. 

`Game` is a functional component that renders the following info under the following conditions:

* If there is no winner:
  * display the user total in a `<p>` tag with a class of `'user-total'`
  * display a button with a class of `play` and text of "hit me"
* If there is a winner:
  * display the winner in a `<p>` tag with a class of `'winner'`
  * display the user total in a `<p>` tag with a class of `'user-total'`
  * display the computer total in a `<p>` tag with a class of `'computer-total'`
  * display a button with a class of `'reset'` and text of `"play again"`

The `App` component should have two functions defined:

* `playRound`
* `reset`

The `playRound` function dispatches the `executeRound` action via `this.props.actions.executeRound`. 

The `reset` function dispatches the `resetGame` action via `this.props.actions.resetGame`. 

Both of these functions need to be passed down to `Game` as props. 

Pass `playRound` to `Game` under a prop of `triggerExecuteRound` and pass `reset` to `Game` under a prop of `triggerResetGame`. 

In the `Game` component, when a user clicks on the `"hit me"` button, it should invoke the `triggerExecuteRound` function from props, which will in turn tell `App` to run `this.props.actions.executeRound`, thus dispatching that action to the reducer and updating application state. 

Similarly, in the `Game` component, when a user clicks on the `"play again"` button, it should inovke the `triggerResetGame` function from props, which will tell `App` to run `this.props.actions.resetGame`, thus dispatching *that* action to the reducer and updating application state. 
