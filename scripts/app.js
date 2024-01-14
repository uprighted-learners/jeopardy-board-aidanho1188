import placeholderQuestions from "./placeholder-questions.js";
import Game from "./Game.js";
import Player from "./Player.js";

const nextRoundBtn = document.getElementById("next-round");
const guessBtn = document.getElementById("guess-btn");
const passBtn = document.getElementById("pass-btn");
const categories = document.querySelectorAll(".category");
const cards = document.querySelectorAll(".point");
const popup = document.querySelector(".popup");
const showQuestion = document.getElementById("question");
const overlay = document.querySelector(".overlay");
const playerOneScore = document.getElementById("player1-score");
const playerTwoScore = document.getElementById("player2-score");
let turns = document.getElementById("turns");

nextRoundBtn.style.visibility = "hidden";

let questions = {...placeholderQuestions};
let round = 1; // TODO: change this based on query parameters
let answer;
let questionPoints;
let playerOneTurn = false;
let playerTwoTurn = false;

function initializeCardClickListeners() {
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      handleCardClick(card);
    });
  });
}

function handleCardClick(card) {
  card.style.visibility = "hidden";
  showPopUp();
  questionPoints = parseFloat(card.textContent.slice(1));
  showQuestion.textContent = card.getAttribute("data.question");
  answer = card.getAttribute("data.answer");
}

function handleGuess() {
  let playerAnswer = document.getElementById("player-answer");
  if (checkAnswer(playerAnswer.value)) {
    game.getCurrentPlayer().score += questionPoints;
    hidePopUp();
  } else {
    game.getCurrentPlayer().score -= questionPoints;
    countTurn();
    game.switchTurn();
    displayTurn(game.getCurrentTurn());
  }
  checkTurns();
  updateScore(game.getCurrentPlayer());
}

function handlePass() {
  countTurn();
  game.switchTurn();
  displayTurn(game.getCurrentTurn());
  checkTurns();
}

function handleNextRound() {
  window.location = "/round-2.html"; // pass query parameter here
}

// helper functions
function countTurn() {
  // 0 is player 1
  // 1 is player 2
  // these are indexes and it also used as true/false values in getCurrentPlayer
  if (game.getCurrentTurn() === 0) {
    playerOneTurn = true;
  } else if (game.getCurrentTurn() === 1) {
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

function checkAnswer(input) {
  input = input.toLowerCase();
  answer = answer.toLowerCase();
  if (input === answer) {
    return true;
  } else {
    return false;
  }
}

const game = new Game(round, cards, questions, categories);

setUpGame();

function setUpGame() {
  initializeCardClickListeners();
  const player1 = new Player("Player 1");
  const player2 = new Player("Player 2");
  game.setUp();
  game.addPlayer(player1);
  game.addPlayer(player2);
  guessBtn.addEventListener("click", handleGuess);
  passBtn.addEventListener("click", handlePass);
  nextRoundBtn.addEventListener("click", handleNextRound);
  gameLoop(game);
}

async function gameLoop(game) {
  let isOver = game.getPlayers().forEach((player) => {
    if (player.score > 15000) {
      return true;
    } else {
      return false;
    }
  });
  displayTurn(game.getCurrentTurn());
  //TODO: if player reach 15k points or board is cleared
}

function displayTurn(isPlayerTwoTurn) {
  if (!isPlayerTwoTurn) {
    turns.textContent = `Player one's turn`;
  } else {
    turns.textContent = `Player two's turn`;
  }
}

function showPopUp() {
  popup.classList.remove("hide");
  popup.classList.toggle("show");
  overlay.classList.toggle("show");
}

function hidePopUp() {
  popup.classList.toggle("hide");
  popup.classList.remove("show");
  overlay.classList.remove("show");
}

function updateScore(player) {
  game.getPlayers().forEach((player) => {
    if (player.name === "Player 1") {
      playerOneScore.textContent = player.score;
    } else if (player.name === "Player 2") {
      playerTwoScore.textContent = player.score;
    }
  });
}
