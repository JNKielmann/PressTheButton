import { Game } from './game'
import { generateTasks } from './generateTasks'

const currentGames = {}

export const messageHandler = {
  createGame: (player, payload) => {
    if (!payload.playerName) {
      console.log('Client tried to create a game without specifying a player name')
      return
    }
    const game = new Game()
    player.joinGame(payload.playerName, game)
    currentGames[game.id] = game
    player.emit('createGame', {
      gameId: game.id,
      playerId: player.id,
    })
    player.emit('playerList', { players: game.getPlayerNames() })
    console.log('Game created')
  },
  joinGame: (player, payload) => {
    const game = currentGames[payload.gameId]
    if (!game) {
      console.log(`Client tried to join not existing game ${payload.gameId}`)
      return
    }
    if (!payload.playerName) {
      console.log('Client tried to join without specifying a player Name')
      return
    }
    player.joinGame(payload.playerName, game)
    player.emit('joinGame', {})
    const playerNames = game.getPlayerNames()
    game.forEachPlayer((p) => {
      p.emit('playerList', { players: playerNames })
    })
    console.log('Player joined')
  },
  startRound: (player) => {
    const game = player.game
    if (!game) {
      console.log('Client is not in a game and tried to start a round')
      return
    }
    const timeTillStart = 6000
    generateTasks(game)
    game.forEachPlayer((p) => {
      p.lives = 1
      p.emit('startRound', {
        task: p.task.text,
        lives: p.lives,
        timeTillStart,
      })
    })
    setTimeout(() => game.startGameLoop(), timeTillStart)
  },
  action: (player, payload) => {
    const game = player.game
    if (payload.type === 'buttonPressed') {
      const result = player.task.validatePress(game.state)
      if (result.pressCorrect) {
        console.log('valid turn')
        player.hasPressed = true
        player.emit('validTurn', {})
      } else {
        player.failedPress([player.id], false)
      }
    }
  },
  removeFromGame: (player, payload) => {
    const game = currentGames[payload.gameId]
    if (!game) {
      console.log(`Client tried to get removed from not existing game ${payload.gameId}`)
      return
    }
    game.removePlayer(player)
    const playerNames = game.getPlayerNames()
    game.forEachPlayer((p) => {
      p.emit('playerList', { players: playerNames })
    })
    console.log('Player removed')
    if (game.getPlayerNames().length === 0) {
      game.stopGameLoop()
      delete currentGames[payload.gameId]
      console.log('Game deleted')
    }
  },
}
