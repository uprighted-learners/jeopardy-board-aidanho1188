class Player {
  constructor(name, score, answer) {
    this._name = name;
    this._score = score;
    this._answer = answer;
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
  set score(value) {
    this._score = value;
  }
  set answer(value) {
    this._answer = value;
  }
}
export default Player;
