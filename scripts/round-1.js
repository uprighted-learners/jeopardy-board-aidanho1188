import placeholderQuestions from "./placeholder-questions.js";

const nextRoundBtn = document.getElementById("next-round");
const guessBtn = document.getElementById("guess-btn");
const passBtn = document.getElementById("pass-btn");
const categories = document.querySelectorAll(".category");
const cards = document.querySelectorAll(".point");

nextRoundBtn.style.visibility = "hidden";
guessBtn.style.visibility = "hidden";
passBtn.style.visibility = "hidden";

let questions = {...placeholderQuestions};
let availableCategory = [];
let availableQuestion = [];
let player1Score = 0;
let player2Score = 0;

cards.forEach((card) => {
  card.addEventListener("click", () => {
    card.style.visibility = "hidden";
    guessBtn.style.visibility = "visible";
    passBtn.style.visibility = "visible";
  });
});

nextRoundBtn.addEventListener("click", () => {
  window.location = "/round-2.html";
});

function getCategory(questions) {
  for (const key in questions) {
    if (Object.hasOwnProperty.call(questions, key)) {
      const element = questions[key];
      if (!availableCategory.includes(element.category)) {
        availableCategory.push(element.category);
      }
    }
  }
}

function fillCategory(availableCategory) {
  for (let i = 0; i < 6; i++) {
    categories[i].textContent = availableCategory[i];
  }
}
// should mark each box with data-info
// repeat every 6 boxes
function markBoxWithData(availableCategory) {
  for (let i = 0; i < cards.length; i++) {
    cards[i].setAttribute("data.info", availableCategory[i % 6]); // Aidan is so smart :))
  }
}

getCategory(questions);
fillCategory(availableCategory);
markBoxWithData(availableCategory);
// now fill in questions