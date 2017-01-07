export function resetGame(){
  return {type: "RESET_GAME"}
}

export function startGame(deck){
  const newDeck = deck.slice()
  
  const newUserCards = [getRandCard(newDeck), getRandCard(newDeck)];
  const newAiCards = [getRandCard(newDeck), getRandCard(newDeck)];

  return {type: "START_GAME", deck: newDeck, userCards: newUserCards, aiCards: newAiCards}
}

export function hitAI(deck, aiCards, userScore){
  const newDeck = deck.slice();
  const newAiCards = aiCards.slice();
  let winner = null
  
  while(userScore >= newAiCards.reduce((sum, card) => sum+card.value, 0)){
    newAiCards.push(getRandCard(newDeck))
  }
  
  if (newAiCards.reduce((sum, c) => sum+c.value, 0) > 21){
    winner = "User"
  }else{
    winner = "AI"
  }

  return {type: "HIT_AI", deck: newDeck, aiCards: newAiCards, winner: winner}
}

export function hitUser(deck, userCards){
  const newDeck = deck.slice();
  let winner = null;
  
  const newUserCards = [...userCards.slice(), getRandCard(newDeck)];

  if (newUserCards.reduce((sum, c) => sum+c.value, 0) === 21) winner = "User"
  if (newUserCards.reduce((sum, c) => sum+c.value, 0) > 21) winner = "AI"

  return {type: "HIT_USER", deck: newDeck, userCards: newUserCards, winner: winner}
}

const getRandCard = (deck) =>{
  let randNum = Math.floor(Math.random()*deck.length);
  return deck.splice(randNum,1)[0]
}