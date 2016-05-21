import { Game } from './game'
import { generateTask } from './generateTask'

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
    game.forEachPlayer((p) => {
      const task = generateTask()
      p.task = task
      p.emit('startRound', {
        task: task.text,
        lives: 3,
      })
    })
    game.startGameLoop()
  },
}
