import uuid from 'node-uuid'

export class Game {
  constructor() {
    this.id = uuid.v1()
    this.players = []

    this.loopCounter = 0
  }
  addPlayer(player) {
    this.players.push(player)
  }
  getPlayerNames() {
    return this.players.map(p => p.name)
  }
  forEachPlayer(callback) {
    return this.players.forEach(callback)
  }
  endRound(loserName) {
    this.forEachPlayer((p) => {
      p.emit('endRound', {
        loser: loserName,
      })
    })
    clearTimeout(this.timeout)
  }
  startGameLoop() {
    this.loopCounter = 0
    let timeTillNextLoop = 0
    const gameLoop = () => {
      this.forEachPlayer((p) => {
        if (p.task.isValidPress(this.state)) {
          p.failedPress()
        }
      })

      this.state = {
        playerStates: [],
      }
      this.forEachPlayer((p) => {
        const playerState = this.generateRandomPlayerState()
        this.state.playerStates.push(Object.assign(playerState, { playerId: p.id }))
        p.emit('updateGameState', playerState)
      })
      timeTillNextLoop = this.computeNextLoopTime()
      this.timeout = setTimeout(gameLoop, timeTillNextLoop)
      ++this.loopCounter
    }
    this.timeout = setTimeout(gameLoop, timeTillNextLoop)
  }

  /**
   * @private
   */
  generateRandomPlayerState() {
    function randomArrayElement(array) {
      return array[Math.floor(Math.random() * array.length)]
    }
    const colors = ['red', 'green', 'blue', 'yellow', 'pink', 'brown']
    const words = ['red', 'green', 'blue', 'yellow', 'pink', 'brown']
    return {
      buttonColor: randomArrayElement(colors),
      buttonText: randomArrayElement(words),
    }
  }

  /**
   * @private
   */
  computeNextLoopTime() {
    if (this.loopCounter < 4) {
      return 2000
    } else if (this.loopCounter < 15) {
      return 1000
    }
    return 500
  }
}
