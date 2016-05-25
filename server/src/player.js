import uuid from 'node-uuid'
import AllTasks from './tasks/allTasks'

export class Player {
  constructor(wsConnection) {
    this.id = uuid.v1()
    this.name = ''
    this.wsConnection = wsConnection
    this.hasPressed = false
  }
  emit(event, payload) {
    this.wsConnection.send(JSON.stringify({
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
