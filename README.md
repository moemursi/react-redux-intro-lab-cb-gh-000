# Redux Blackjack

Build a Redux implementation of a simple blackjack game!

## Objectives

* Build a working version of blackjack using Redux tools and patterns
* Store application state in one central store
* Use the container pattern to build your components
* Update state via user interaction with your components by following the Redux pattern

## Instructions

Your goal is to build a very simple version of Blackjack. In our version of the game, a user should be able to click a button, "Hit Me", to get a new card dealt to them. When they click this button, their total points will be incremented as a result of this new card being dealt to them.

The user can hit as many times as they like, but if they go over 21, they will lose. At any point, the user can click the "Stay" button. This will kick off the AI logic to keep hitting until they have more points than the user. 

A user wins if they hit exactly 21 points or if the AI player gets more than 21 points in trying to outscore the user. 

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

### Step 1: Build the Store, Reducer and Action Creators

First things first, use the Redux `configureStore` function to create a store with a reducer. Build a reducer, `gameReducer`, that can respond to the following actions:

* `resetGame` - Return action with type `"RESET_GAME"`
* `startGame` - Takes in a `deck` as an argument and returns and action with type `"START_GAME"`, `userCards`, `aiCards` and a `deck` with the remaining cards
* `hitUser` - Takes in a `deck` and the `userCards` and returns and action with a type `"HIT_USER"`, the new `userCards`, and a `winner` (`null` if one cannot be determined, `User` if the user get's 21)
* `hitAI` - Takes in a `deck`, the `aiCards`, and the current user's score and returns an action with a type `"HIT_AI"`, the new `aiCards`, the `deck`, and the `winner` (`AI` if it gets more points than the user without going over 21, `User` if the AI goes over 21). This action should keep drawing cards for the AI until it has a higher point value than the user. 

>Note: You can test just these actions by running `npm test test/game-actions-test.js`. This is really helpful to break down large labs!

The reducer should respond to each of these actions by using `Object.assign()` to return a full new state.

The reducer should respond to the `resetGame` action by returning the original version of state, `initialState.game`. 

**Note:** Remember to wrap your `App` component in the `<Provider>` and pass your store instance to the `<Provider>` in `index.js`.

### Step 2: Building The Components 

We'll be using the container component pattern. Build a top level container, `App`, that uses `mapStateToProps` to pull the game info from state. 

`App` will need access to the action creator functions. Pass them into `App.props.actions` using `mapDispatchToProps`.

Finally, use `connect` to connect `App` to the store.

`App` will render a child component, `Game`. 

The `App` component should have three functions defined:

* `calculateScore` - Should take in a hand as an argument and return the total
* `newGame` - Should dispatch the `resetGame` action and the `startGame` action
* `aiTurn` - Should dispatch the `hitAI` action 

All of these functions need to be passed down to `Game` as props. 

`Game` is a functional component that renders the following info under the following conditions:

* If there is no winner:
  * display the user total in a `<p>` tag with a class of `'user-total'`
  * display a button with a class of `hitMe` and text of "Hit Me"
* If there is a winner:
  * display the winner in a `<p>` tag with a class of `'winner'`
  * display the user total in a `<p>` tag with a class of `'user-total'`
  * display the computer total in a `<p>` tag with a class of `'ai-total'`
  * display a button with a class of `'newGame'` and text of `"New Game"`


In the `Game` component, when a user clicks on the `"Hit Me"` button, it should invoke the `hitUser` action, which will in turn tell `App` to run `hitUser`, thus dispatching that action to the reducer and updating application state. 

Similarly, in the `Game` component, when a user clicks on the `"New Game"` button, it should invoke the `newGame` function from props.