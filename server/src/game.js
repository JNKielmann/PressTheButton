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
  removePlayer(player) {
    var index = this.players.indexOf(player)
    if (index > -1) {
      this.players.splice(index, 1)
    }
  }
  getPlayerNames() {
    return this.players.map(p => p.name)
  }
  forEachPlayer(callback) {
    return this.players.forEach(callback)
  }
  endRound(losingPlayer, involvedPlayerIds, notPressed) {
    console.log('Round Endend')
    this.forEachPlayer((p) => {
      const payload = {
        loserName: losingPlayer.name,
        loserId: losingPlayer.id,
        flashScreen: involvedPlayerIds.indexOf(p.id) > -1,
        notPressed,
      }
      console.log(`send player ${p.id}:`)
      console.dir(payload)
      p.emit('endRound', payload)
    })
    this.stopGameLoop()
  }
  stopGameLoop() {
    this.roundIsRunning = false
  }
  startGameLoop() {
    console.log('New Gameloop started')
    this.initGameLoop()
    const gameLoop = () => {
      this.testForMissedPress()
      if (!this.roundIsRunning) {
        return
      }
      this.timeTillNextLoop = this.computeNextLoopTime()
      this.setNextState(this.timeTillNextLoop)
      this.timeout = setTimeout(gameLoop, this.timeTillNextLoop)
      ++this.loopCounter
    }
    this.timeout = setTimeout(gameLoop, this.timeTillNextLoop)
  }

  /**
   * @private
   */
  initGameLoop() {
    this.roundIsRunning = true
    this.loopCounter = 0
    this.timeTillNextLoop = this.computeNextLoopTime()
    this.setNextState(this.timeTillNextLoop) // initial State
  }
  /**
   * @private
   */
  testForMissedPress() {
    this.forEachPlayer((p) => {
      if (!p.hasPressed) {
        const result = p.task.validatePress(this.state)
        if (result.pressCorrect) {
          p.failedPress(result.involvedPlayerIds, true)
        }
      }
    })
  }
  /**
   * @private
   */
  setNextState(turnDuration) {
    this.state = {
      playerStates: [],
    }
    this.forEachPlayer((p) => {
      p.hasPressed = false
      // if (this.state.playerStates.length === 0 || Math.random() < 0.7) {
      const playerState = this.generateRandomPlayerState()
      this.state.playerStates.push(Object.assign(playerState, { playerId: p.id }))
      p.emit('updateGameState', {
        turnDuration,
        state: playerState,
      })
      // }
    })
    console.log('State is: ')
    console.dir(this.state)
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
