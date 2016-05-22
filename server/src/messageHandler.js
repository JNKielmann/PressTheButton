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
    generateTasks(game)
    game.forEachPlayer((p) => {
      p.lives = 3
      p.emit('startRound', {
        task: p.task.text,
        lives: p.lives,
      })
    })
    game.startGameLoop()
  },
  action: (player, payload) => {
    const game = player.game
    if (payload.type === 'buttonPressed') {
      console.dir(game.state)
      if (player.task.isValidPress(game.state)) {
        console.log('valid turn')
        player.hasPressed = true
        player.emit('validTurn', {})
      } else {
        player.failedPress()
      }
    }
  },
}
