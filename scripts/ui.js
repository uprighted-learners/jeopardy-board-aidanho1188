const playerOneScoreDisplay = document.getElementById("player1-score");
const playerTwoScoreDisplay = document.getElementById("player2-score");
const popup = document.querySelector(".popup");
const overlay = document.querySelector(".overlay");
let turnsDisplay = document.getElementById("turns");
const availablePoints = document.getElementById("playerPoints");
const popupTurnDisplay = document.getElementById("popup-turn");

export function loadScore(playerOneScore, playerTwoScore) {
  playerOneScoreDisplay.textContent = playerOneScore;
  playerTwoScoreDisplay.textContent = playerTwoScore;
}

export function updateScore(game) {
  const [player1, player2] = game.getPlayers();
  playerOneScoreDisplay.textContent = player1.score;
  playerTwoScoreDisplay.textContent = player2.score;
}

export function setScore(game, playerOneScore = 0, playerTwoScore = 0) {
  const [player1, player2] = game.getPlayers();
  player1.score = playerOneScore;
  player2.score = playerTwoScore;
}

export function displayTurn(currentPlayer) {
  if (currentPlayer.name === "Player 1") {
    turnsDisplay.textContent = `Player one's turn`;
  } else {
    turnsDisplay.textContent = `Player two's turn`;
  }
}

export function updateTurnDisplay(game) {
  displayTurn(game.getCurrentPlayer());
  popupTurnDisplay.textContent = `${game.getCurrentPlayer().name} turn to wager`;
  availablePoints.textContent = `Available points: ${game.getCurrentPlayer().score}`;
}

export function hideTurn() {
  turnsDisplay.textContent = "";
}
export function clearInput(input) {
  input.value = "";
}
export function showPopUp() {
  popup.classList.remove("hide");
  popup.classList.toggle("show");
  overlay.classList.toggle("show");
}

export function hidePopUp() {
  popup.classList.toggle("hide");
  setTimeout(() => {
    popup.classList.remove("show");
    overlay.classList.remove("show");
  }, 500);
}

export function disableCard(card) {
  card.textContent = "";
  card.style.pointerEvents = "none";
}

export function removeContent(parentNode) {
  while (parentNode.firstChild) {
    parentNode.removeChild(parentNode.firstChild);
  }
}

export function findWinner(game) {
  const [player1, player2] = game.getPlayers();
  if(player1.score > player2.score) {
    return `<h3>Congratulations! <i>${player1.name} emerged victorious with ${player1.score} points! surpassing ${player2.name} who scored ${player2.score} points<i></h3>`;
  } else if (player1.score < player2.score) {
    return `<h3>Congratulations! <i>${player2.name} emerged victorious with ${player2.score} points! surpassing ${player1.name} iwho scored ${player1.score} points<i></h3>`
  } else {
    return `<h3>Congratulations! <i>Both ${player1.name} and ${player2.name} achieved victory with an equal score of  ${player1.score} points!<i></h3>`;
  }
}
