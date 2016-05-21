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
  startGameLoop() {
    this.loopCounter = 0
    let timeTillNextLoop = 0
    const gameLoop = () => {
    // TODO: Check if players did not press the button in time
      this.state = {
        playerStates: [],
      }
      this.forEachPlayer((p) => {
        const playerState = this.generateRandomPlayerState()
        this.state.playerStates.push({
          playerId: p.id,
          state: playerState,
        })
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
