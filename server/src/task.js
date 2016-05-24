
export class Task {
  constructor(pressWhenText, tester) {
    this.pressWhenText = pressWhenText
    this.text = `Press when ${pressWhenText}`
    this.tester = tester
  }
  negate() {
    const oldTester = this.tester
    this.tester = state => !oldTester(state)
    this.text = `Press not when ${this.pressWhenText}`
  }
  validatePress(state) {
    return this.tester(state)
  }
}
