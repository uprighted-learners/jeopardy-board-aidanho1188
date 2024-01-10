class Game {
  constructor(round, cards, startIndex = 0) {
    this._round = round;
    this._cards = cards;
    this._startIndex = startIndex; // start index for placeholder question
    this._players = [];
    this._isPlayer1Turn = true;
  }

  markBoxesWithCategory() {
    for (let i = 0; i < this._cards.length; i++) {
      this._cards[i].setAttribute("name", this._availableCategory[i % 6]);
    }
  }

  setUp() {
    convertToArrays(questions);
    fillCategories(categories);
    markBoxesWithCategory();
    fillQuestions("Nature", this._availableQuestion, this._availableAnswer, this._startIndex);
    fillQuestions("Animals", this._availableQuestion, this._availableAnswer, this._startIndex + 10);
    fillQuestions("Computers", this._availableQuestion, this._availableAnswer, this._startIndex + 20);
    fillQuestions("Mythology", this._availableQuestion, this._availableAnswer, this._startIndex + 30);
    fillQuestions("History", this._availableQuestion, this._availableAnswer, this._startIndex + 40);
    fillQuestions("General", this._availableQuestion, this._availableAnswer, this._startIndex + 50);
  }

  addPlayer(player) {
    this._players.push(player);
  }

  switchTurn() {
    this._currentTurn = !this._isPlayer1Turn;
  }

  getPlayer() {
    return this._players[this._currentTurn];
  }
}
export default Game;

const availableCategory = [];
const availableQuestion = [];
const availableAnswer = [];

function convertToArrays(questions) {
  for (const key in questions) {
    if (Object.hasOwnProperty.call(questions, key)) {
      const element = questions[key];
      if (!availableCategory.includes(element.category)) {
        availableCategory.push(element.category);
      }
      availableQuestion.push(element.question);
      availableAnswer.push(element.answer);
    }
  }
}

function fillCategories(categories) {
  for (let i = 0; i < this._availableCategory.length - 1; i++) {
    categories[i].textContent = this._availableCategory[i];
  }
}

function fillQuestions(catergory, availableQuestion, availableAnswer, startIndex) {
  const card = document.getElementsByName(catergory);

  for (let i = 0; i < card.length; i++) {
    card[i].setAttribute("data.question", availableQuestion[i + startIndex]);
    card[i].setAttribute("data.answer", availableAnswer[i + startIndex]);
  }
}
