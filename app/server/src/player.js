//import uuid from 'node-uuid'
import AllTasks from './tasks/allTasks'

export default class Player {
  constructor(sendFunction) {
    this.id = Math.random()//uuid.v1()
    this.name = ''
    this.sendFunction = sendFunction
    this.hasPressed = false
  }
  emit(event, payload) {
    this.sendFunction(JSON.stringify({
      event,
      payload,
    }))
  }
  joinGame(playerName, game) {
    this.name = playerName
    this.game = game
    game.addPlayer(this)
  }
  pressButton(state) {
    const result = AllTasks.testIfTrueForState(this.task, state)
    if (result.pressCorrect) {
      console.log('valid turn')
      this.hasPressed = true
      this.emit('validTurn', {})
    } else {
      this.failedPress([this.id], false)
    }
  }
  failedPress(involvedPlayerIds, notPressed) {
    --this.lives
    console.log('player lost live')
    this.emit('invalidTurn', { lives: this.lives })
    if (this.lives <= 0) {
      this.game.endRound(this, involvedPlayerIds, notPressed)
    }
  }
}
