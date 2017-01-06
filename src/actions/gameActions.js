export function resetGame(){
  return {type: "RESET_GAME"}
}

export function startGame(deck){
  console.log("ping")
  const newDeck = JSON.parse(JSON.stringify(deck))
  
  const newUserCards = [getRandCard(newDeck), getRandCard(newDeck)];
  const newAiCards = [getRandCard(newDeck), getRandCard(newDeck)];
  
  const payload = {deck: newDeck, userCards: newUserCards, aiCards: newAiCards}
  
  return {type: "START_GAME", payload: payload}
}

export function hitAI(deck, aiCards, userScore){
  const newDeck = JSON.parse(JSON.stringify(deck));
  const newAiCards = [...JSON.parse(JSON.stringify(aiCards))]
  let winner = null
  
  while(userScore >= newAiCards.reduce((sum, card) => sum+card.value, 0)){
    newAiCards.push(getRandCard(newDeck))
  }
  
  if (newAiCards.reduce((sum, c) => sum+c.value, 0) > 21){
    winner = "User"
  }else{
    winner = "AI"
  }

  const payload = {deck: newDeck, aiCards: newAiCards, winner: winner}
  
  return {type: "HIT_AI", payload: payload}
}

export function hitUser(deck, userCards){
  const newDeck = JSON.parse(JSON.stringify(deck));
  let winner = null;
  
  const newUserCards = [...JSON.parse(JSON.stringify(userCards)), getRandCard(newDeck)];

  if (newUserCards.reduce((sum, c) => sum+c.value, 0) === 21) winner = "User"
  if (newUserCards.reduce((sum, c) => sum+c.value, 0) > 21) winner = "AI"

  const payload = {deck: newDeck, userCards: newUserCards, winner: winner}
  
  return {type: "HIT_USER", payload: payload}
}

const getRandCard = (deck) =>{
  let randNum = Math.floor(Math.random()*deck.length);
  return deck.splice(randNum,1)[0]
}