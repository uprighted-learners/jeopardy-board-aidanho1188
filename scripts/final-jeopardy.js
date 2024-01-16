import placeholderQuestions from "./placeholder-questions.js";
import Game from "./Game.js";
import Player from "./Player.js";
import {showPopUp, displayTurn, setScore, hidePopUp, hideTurn, updateTurnDisplay, clearInput, removeContent, findWinner, showTurnNotification} from "./ui.js";

const finalCategory = document.querySelector(".final-category");
const finalQuestion = document.querySelector(".final-question");
const userInput = document.querySelector(".user-input");
const popupCategoryDisplay = document.getElementById("popup-category");
const betBtn = document.getElementById("bet-btn");
const submitBtn = document.querySelector(".submit-btn");
const continueBtn = document.getElementById("continue-btn");

const urlParams = new URLSearchParams(window.location.search);
let playerOneScore = urlParams.get("playerOneScore") === null ? 0 : urlParams.get("playerOneScore");
let playerTwoScore = urlParams.get("playerTwoScore") === null ? 0 : urlParams.get("playerTwoScore");
const game = initializeGame();

finalQuestion.addEventListener("click", handleClick);
betBtn.addEventListener("click", handleBet);
submitBtn.addEventListener("click", handleSubmit);
continueBtn.addEventListener("click", handleContinue);

function initializeGame() {
  const game = new Game();
  const player1 = new Player("Player 1");
  const player2 = new Player("Player 2");
  game.addPlayer(player1);
  game.addPlayer(player2);
  userInput.style.visibility = "hidden";
  continueBtn.style.visibility = "hidden";
  finalCategory.textContent = getValueFromJson("category");
  displayTurn(game.getCurrentPlayer());
  setScore(game, playerOneScore, playerTwoScore);
  return game;
}

function handleClick() {
  popupCategoryDisplay.textContent = `Category: ${getValueFromJson("category")}`;
  updateTurnDisplay(game);
  showPopUp();
  showTurnNotification(game);
}

function handleBet() {
  const playerBet = document.getElementById("player-bet");
  if (!validBetPoints(playerBet)) {
    alert("Please enter a valid bet.");
  } else if (validBetPoints(playerBet) === -1) {
    alert("You don't have enough points, please try again");
  } else {
    game.getCurrentPlayer().bet = playerBet.value;
    game.switchTurn();
    updateTurnDisplay(game);
    showTurnNotification(game);
    clearInput(playerBet);
    if (playerTwoTurnIsDone("bet")) {
      hidePopUp();
      // show question and prompt for answers
      showFinalQuestion();
      userInput.style.visibility = "visible";
    }
  }
}

function handleSubmit() {
  const finalAnswer = document.getElementById("player-answer");
  if (isEmpty(finalAnswer)) {
    alert("Please enter something");
    return false;
  }

  game.getCurrentPlayer().answer = finalAnswer.textContent;
  game.switchTurn();
  clearInput(finalAnswer);
  displayTurn(game.getCurrentPlayer());
  showTurnNotification(game);
  if (playerTwoTurnIsDone("answer")) {
    userInput.style.visibility = "hidden";
    const [player1, player2] = game.getPlayers();
    let answer = getValueFromJson("answer");
    checkAnswer(player1, answer);
    checkAnswer(player2, answer);
    showFinalAnswer();
    hideTurn();
    continueBtn.style.visibility = "visible";
  }
}

function handleContinue() {
  const popupContent = document.querySelector(".popup-content");
  const winner = document.createElement("h3");

  winner.innerHTML = findWinner(game);
  removeContent(popupContent);
  popupContent.appendChild(winner);
  showPopUp();
}

function validBetPoints(playerBet) {
  let playerScore = parseFloat(game.getCurrentPlayer().score);
  if (playerBet.value < 0 || isEmpty(playerBet)) {
    return 0;
  }
  if (playerScore >= playerBet.value > 0 || (playerScore <= 0 && playerBet.value == 0)) {
    return 1;
  } else {
    return -1;
  }
}

function showFinalQuestion() {
  finalQuestion.style.animation = "flipInY 0.5s ease-in-out";
  finalQuestion.textContent = getValueFromJson("question");
  finalQuestion.style.pointerEvents = "none";
}

function showFinalAnswer() {
  finalQuestion.style.animation = "flipInX 0.5s ease-in-out";
  finalQuestion.textContent = `Answer: ${getValueFromJson("answer")}`;
  finalQuestion.style.pointerEvents = "none";
}

// helper functions
function getValueFromJson(propertyName) {
  return JSON.stringify(placeholderQuestions[60][propertyName]).replace(/"/g, "");
}

function checkAnswer(player, answer) {
  if (player.answer.toLowerCase() === answer.toLowerCase()) {
    player.score += player.bet;
  } else {
    player.score -= player.bet;
  }
}

function playerTwoTurnIsDone(propertyName) {
  const player2 = game.getPlayers()[1];
  return player2[propertyName] != null;
}

function isEmpty(input) {
  return input.value === "";
}
