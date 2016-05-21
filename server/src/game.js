import uuid from 'node-uuid'
import { randomButtonColor, randomButtonText } from './stateHelper'


export class Game {
  constructor() {
    this.id = uuid.v1()
    this.players = []
    this.roundIsRunning = false
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
    this.roundIsRunning = false
  }
  startGameLoop() {
    console.log('New Gameloop started')
    this.roundIsRunning = true
    this.loopCounter = 0
    let timeTillNextLoop = 0
    this.state = {
      playerStates: [],
    }
    const gameLoop = () => {
      if (!this.roundIsRunning) {
        return
      }
      if (this.state && this.state.playerStates.length > 0) {
        this.forEachPlayer((p) => {
          if (!p.hasPressed && p.task.isValidPress(this.state)) {
            p.failedPress()
          }
        })
      }

      this.state = {
        playerStates: [],
      }
      this.forEachPlayer((p) => {
        p.hasPressed = false
        if (this.state.playerStates.length === 0 || Math.random() < 0.7) {
          const playerState = this.generateRandomPlayerState()
          this.state.playerStates.push(Object.assign(playerState, { playerId: p.id }))
          p.emit('updateGameState', playerState)
        }
      })
      timeTillNextLoop = this.computeNextLoopTime()
      this.timeout = setTimeout(gameLoop, timeTillNextLoop)
      ++this.loopCounter
    }
    gameLoop()
  }

  /**
   * @private
   */
  generateRandomPlayerState() {
    return {
      buttonColor: randomButtonColor(),
      buttonText: randomButtonText(),
    }
  }

  /**
   * @private
   */
  computeNextLoopTime() {
    if (this.loopCounter < 5) {
      return 3500
    } else if (this.loopCounter < 10) {
      return 2500
    } else if (this.loopCounter < 15) {
      return 2000
    } else if (this.loopCounter < 25) {
      return 1500
    } else if (this.loopCounter < 35) {
      return 1200
    }
    return 900
  }
}
