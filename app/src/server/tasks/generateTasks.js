import AllTasks from './allTasks'

export function generateTasks(players) {
  players.forEach((player) => {
    player.task = AllTasks.createRandom(player.id, players.length)
  })
}
