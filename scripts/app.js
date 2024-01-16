import placeholderQuestions from "./placeholder-questions.js";
import Game from "./Game.js";
import Player from "./Player.js";
import {updateScore, displayTurn, showPopUp, hidePopUp, loadScore, clearInput, disableCard, showTurnNotification} from "./ui.js";
const urlParams = new URLSearchParams(window.location.search);
let round = urlParams.get("round");

const nextRoundBtn = document.getElementById("next-round");
const guessBtn = document.getElementById("guess-btn");
const passBtn = document.getElementById("pass-btn");
const categories = document.querySelectorAll(".category");
const cards = document.querySelectorAll(".point");
const showQuestion = document.getElementById("question");
let turnsDisplay = document.getElementById("turns");

let questions = {...placeholderQuestions};
let question;
let answer;
let questionPoints;
let playerOneTurn = false;
let playerTwoTurn = false;
const game = initializeGame();

guessBtn.addEventListener("click", handleGuess);
passBtn.addEventListener("click", handlePass);
nextRoundBtn.addEventListener("click", handleNextRound);

function initializeGame() {
  const game = new Game(round, cards, questions, categories);
  const player1 = new Player("Player 1");
  const player2 = new Player("Player 2");
  game.setUp();
  game.addPlayer(player1);
  game.addPlayer(player2);
  nextRoundBtn.style.visibility = "hidden";
  displayTurn(game.getCurrentPlayer());
  if (urlParams.has("playerOneScore") && urlParams.has("playerTwoScore")) {
    const playerOneScore = urlParams.get("playerOneScore");
    const playerTwoScore = urlParams.get("playerTwoScore");
    loadScore(playerOneScore, playerTwoScore);
  }
  return game;
}

initializeCardClickListeners();
function initializeCardClickListeners() {
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      handleCardClick(card);
    });
  });
}

function handleCardClick(card) {
  questionPoints = parseFloat(card.textContent.slice(1));
  question = card.getAttribute("data.question");
  answer = card.getAttribute("data.answer");
  showQuestion.textContent = question;
  showPopUp();
  disableCard(card);
  showTurnNotification(game);
}

function handleGuess() {
  const playerAnswer = document.getElementById("player-answer");
  if (playerAnswer.value === "") {
    alert("Please enter something");
    return false;
  }

  if (checkAnswer(playerAnswer.value)) {
    disableInputButtons(guessBtn, passBtn);
    game.getCurrentPlayer().score += questionPoints;
    showQuestion.textContent = "Correct!";
    setTimeout(() => {
      hidePopUp();
      enableInputButtons(passBtn, passBtn);
    }, 2000);
  } else {
    game.getCurrentPlayer().score -= questionPoints;
    countTurn();
    game.switchTurn();
    clearInput(playerAnswer);
    showQuestion.textContent = "Incorrect!";
    displayTurn(game.getCurrentPlayer());
    setTimeout(() => {
      showQuestion.textContent = question;
    }, 2000);
  }
  checkGameLogic();
  updateScore(game);
  showTurnNotification(game);
}

function handlePass() {
  const playerAnswer = document.getElementById("player-answer");
  countTurn();
  game.switchTurn();
  clearInput(playerAnswer);
  displayTurn(game.getCurrentPlayer());
  checkGameLogic();
  showTurnNotification(game);
}

function handleNextRound() {
  let urlWithParams;
  round = parseFloat(round);
  round++;
  const queryParams = new URLSearchParams({
    round: round,
    playerOneScore: game.getPlayers()[0].score,
    playerTwoScore: game.getPlayers()[1].score,
  });
  if (round === 3) {
    urlWithParams = `/final-jeopardy.html?${queryParams.toString()}`;
  } else {
    urlWithParams = `/round-2.html?${queryParams.toString()}`;
  }
  window.location = urlWithParams;
}

// helper functions
function checkAnswer(input) {
  input = input.toLowerCase();
  answer = answer.toLowerCase();
  return input === answer;
}

function countTurn() {
  if (game.getCurrentPlayer().name === "Player 1") {
    playerOneTurn = true;
  } else if (game.getCurrentPlayer().name === "Player 2") {
    playerTwoTurn = true;
  }
}

function checkTurns() {
  if (bothTurnsDone()) {
    hidePopUp();
    resetTurns();
  }
}

function bothTurnsDone() {
  return playerOneTurn && playerTwoTurn;
}

function resetTurns() {
  playerOneTurn = false;
  playerTwoTurn = false;
}

function checkGameLogic() {
  checkTurns();
  displayTurn(game.getCurrentPlayer());
  if (scoreIsReached() || boardIsCleared()) {
    nextRoundBtn.style.visibility = "visible";
    turnsDisplay.textContent = "Rounds over!";
    disableBoard();
  }
}

function disableBoard() {
  cards.forEach((card) => {
    card.style.pointerEvents = "none";
  });
}

function disableInputButtons() {
  guessBtn.disabled = true;
  passBtn.disabled = true;
}

function enableInputButtons() {
  guessBtn.disabled = false;
  passBtn.disabled = false;
}

function boardIsCleared() {
  return Array.from(cards).every((card) => card.style.visibility === "hidden");
}

function scoreIsReached() {
  return game.getPlayers().some((player) => player.score >= 200); // TODO: change this later
}
