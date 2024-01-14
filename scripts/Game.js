class Game {
  _availableCategory = [];
  _availableQuestion = [];
  _availableAnswer = [];
  constructor(round, cards, questions, categories) {
    this._round = parseInt(round);
    this._cards = cards;
    this._startIndex = setStartingIndex(this._round, this._startIndex); // start index for placeholder question
    this._questions = questions;
    this._categories = categories;
    this._players = [];
    this._isPlayer1Turn = 0;
  }

  setUp() {
    // ignore all of this if it round 3
    if (this._round === 3) {
      return;
    }
    convertToArrays(this._questions, this._availableCategory, this._availableQuestion, this._availableAnswer);
    fillCategories(this._categories, this._availableCategory);
    markCardsWithCategory(this._cards, this._availableCategory);
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

  getCurrentTurn() {
    return this._isPlayer1Turn;
  }

  switchTurn() {
    this._isPlayer1Turn = this._isPlayer1Turn === 0 ? 1 : 0;
  }

  getCurrentPlayer() {
    return this._players[this._isPlayer1Turn];
  }

  getPlayers() {
    return this._players;
  }
}
export default Game;

function setStartingIndex(round, startIndex) {
  if (round === 1) {
    return 0;
  } else if (round === 2) {
    return 5;
  }
}

function convertToArrays(questions, availableCategory, availableQuestion, availableAnswer) {
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

function fillCategories(categories, availableCategory) {
  for (let i = 0; i < availableCategory.length - 1; i++) {
    categories[i].textContent = availableCategory[i];
  }
}

function markCardsWithCategory(cards, availableCategory) {
  for (let i = 0; i < cards.length; i++) {
    cards[i].setAttribute("name", availableCategory[i % 6]);
  }
}

function fillQuestions(catergory, availableQuestion, availableAnswer, startIndex) {
  const card = document.getElementsByName(catergory);

  for (let i = 0; i < card.length; i++) {
    card[i].setAttribute("data.question", availableQuestion[i + startIndex]);
    card[i].setAttribute("data.answer", availableAnswer[i + startIndex]);
  }
}
