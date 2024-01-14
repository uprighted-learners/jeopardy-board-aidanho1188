import placeholderQuestions from "./placeholder-questions.js";
import Game from "./Game.js";
import Player from "./Player.js";
import {updateScore, displayTurn, showPopUp, hidePopUp, loadScore} from "./ui.js";

const urlParams = new URLSearchParams(window.location.search);
const round = urlParams.get("round");

const nextRoundBtn = document.getElementById("next-round");
const guessBtn = document.getElementById("guess-btn");
const passBtn = document.getElementById("pass-btn");
const categories = document.querySelectorAll(".category");
const cards = document.querySelectorAll(".point");
const showQuestion = document.getElementById("question");
let turnsDisplay = document.getElementById("turns");

nextRoundBtn.style.visibility = "hidden";

let questions = {...placeholderQuestions};
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
  displayTurn(game.getCurrentTurn());
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
      console.log(round);
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
  checkGameLogic();
  updateScore(game);
}

function handlePass() {
  countTurn();
  game.switchTurn();
  displayTurn(game.getCurrentTurn());
  checkGameLogic();
}

// this need to be more dynamic
function handleNextRound() {
  const queryParams = new URLSearchParams({
    round: "2",
    playerOneScore: game.getPlayers()[0].score,
    playerTwoScore: game.getPlayers()[1].score,
  });
  const urlWithParams = `/round-2.html?${queryParams.toString()}`;
  window.location = urlWithParams;
}

// helper functions
function countTurn() {
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
  return input === answer;
}

function checkGameLogic() {
  checkTurns();
  displayTurn(game.getCurrentTurn());
  if (scoreIsReached() || boardIsCleared()) {
    nextRoundBtn.style.visibility = "visible";
    turnsDisplay.textContent = "Rounds over!";
    disableCards();
  }
}

function disableCards() {
  cards.forEach((card) => {
    card.style.pointerEvents = "none";
  });
}
function boardIsCleared() {
  return Array.from(cards).every((card) => card.style.visibility === "hidden");
}

function scoreIsReached() {
  return game.getPlayers().some((player) => player.score >= 200); // TODO: change this later
}
