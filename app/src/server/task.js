
export class Task {
  constructor(pressWhenText, tester) {
    this.pressWhenText = pressWhenText
    this.text = `Press when ${pressWhenText}`
    this.tester = tester
  }
  validatePress(state) {
    return this.tester(state)
  }
}
