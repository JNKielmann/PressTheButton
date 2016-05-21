
export class Task {
  constructor(text, tester) {
    this.text = text
    this.tester = tester
  }
  isValidPress(state) {
    return this.tester(state)
  }
}
