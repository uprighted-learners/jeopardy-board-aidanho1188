const playerOneScoreDisplay = document.getElementById("player1-score");
const playerTwoScoreDisplay = document.getElementById("player2-score");
const popup = document.querySelector(".popup");
const overlay = document.querySelector(".overlay");
let turnsDisplay = document.getElementById("turns");

export function loadScore(playerOneScore, playerTwoScore) {
  playerOneScoreDisplay.textContent = playerOneScore;
  playerTwoScoreDisplay.textContent = playerTwoScore;
}

export function updateScore(game) {
  const [player1, player2] = game.getPlayers();
  playerOneScoreDisplay.textContent = player1.score;
  playerTwoScoreDisplay.textContent = player2.score;
}

export function displayTurn(isPlayerTwoTurn) {
  if (!isPlayerTwoTurn) {
    turnsDisplay.textContent = `Player one's turn`;
  } else {
    turnsDisplay.textContent = `Player two's turn`;
  }
}

export function showPopUp() {
  popup.classList.remove("hide");
  popup.classList.toggle("show");
  overlay.classList.toggle("show");
}
export function hidePopUp() {
  popup.classList.toggle("hide");
  popup.classList.remove("show");
  overlay.classList.remove("show");
}
