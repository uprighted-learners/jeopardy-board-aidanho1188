class Player {
  constructor(name, score = 0, answer = null, bet = null) {
    this._name = name;
    this._score = score;
    this._answer = answer;
    this._bet = bet;
  }

  get name() {
    return this._name;
  }
  get score() {
    return this._score;
  }
  get answer() {
    return this._answer;
  }
  get bet() {
    return this._bet;
  }
  set score(value) {
    this._score = parseFloat(value);
  }
  set answer(value) {
    this._answer = value;
  }
  set bet(value) {
    this._bet = value;
  }
}
export default Player;
