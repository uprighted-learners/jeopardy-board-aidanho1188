import placeholderQuestions from "./placeholder-questions.js";
import Game from "/Game.js";

const nextRoundBtn = document.getElementById("next-round");
const guessBtn = document.getElementById("guess-btn");
const passBtn = document.getElementById("pass-btn");
const categories = document.querySelectorAll(".category");
const cards = document.querySelectorAll(".point");
const popup = document.querySelector(".popup");
const showQuestion = document.getElementById("question");
let turns = document.getElementById("turns");

nextRoundBtn.style.visibility = "hidden";

let questions = {...placeholderQuestions};
let player1Score = 0;
let player2Score = 0;
let round = 1;
let answer;
let questionPoints;
let pass = {
  player1: false,
  player2: false,
};

cards.forEach((card) => {
  card.addEventListener("click", () => {
    card.style.visibility = "hidden";
    popup.style.display = "flex";
    showQuestion.textContent = card.getAttribute("data.question");
    answer = card.getAttribute("data.answer");
  });
});

guessBtn.addEventListener("click", () => {
  let playerAnswer = document.getElementById("player-answer");
  let questionPoints = document.getElementById("question-points"); // TODO
  if (checkAnswer(playerAnswer)) {
    currentPlayer[point] += questionPoints;
  } else {
    currentPlayer[point] -= questionPoints;
  }
});

passBtn.addEventListener("click", () => {
  if (bothPassed) {
    popup.style.display = "none";
  } else {
    pass[currentPlayer] = true;
    game.switchTurn();
  }
});

nextRoundBtn.addEventListener("click", () => {
  window.location = "/round-2.html";
});

// helper functions
function bothPassed() {
  return pass[player1] && pass[player2];
}

function checkAnswer(input) {
  if (input === answer) {
    return true;
  } else {
    return false;
  }
}

// game set up
const player1 = new Player("Player 1");
const player2 = new Player("Player 2");
const game = new Game(round, cards, questions, categories);
game.markBoxesWithCategory();
game.setUp();
game.addPlayer(player1);
game.addPlayer(player2);
turns.textContent = playerTurn;
