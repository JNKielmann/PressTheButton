import { Task } from './task'
import { randomArrayElement, randomButtonColor, randomButtonText } from './stateHelper'

/**
 * The state object looks like this:
 * {
 *  playerStates: [
 *    {
 *        playerId: .... ,
 *        buttonColor: ... ,
 *        buttonText: ... ,
 *      }
 *    },
 *    {
 *        playerId: .... ,
 *        buttonColor: ... ,
 *        buttonText: ... ,
 *      }
 *    },
 *  ]
 * }
 */
function testMyState(player, tester) {
  return (state) => {
    const myState = state.playerStates.find(ps => ps.playerId === player.id)
    return tester(myState)
  }
}
function testAtLeastNStates(n, tester) {
  return (state) => {
    const totalCount = state.playerStates.reduce((currCount, playerState) => {
      return tester(playerState) ? currCount + 1 : currCount
    }, 0)
    return totalCount >= n
  }
}

function testMyButtonColor(player, color) {
  return testMyState(player, state => state.buttonColor === color)
}
function testMyButtonText(player, text) {
  return testMyState(player, state => state.buttonText === text)
}
function testAtLeastNButtonColors(n, color) {
  return testAtLeastNStates(n, state => state.buttonColor === color)
}
function testAtLeastNButtonTexts(n, text) {
  return testAtLeastNStates(n, state => state.buttonText === text)
}



function randomMyButtonColorTask({ player }) {
  const buttonColor = randomButtonColor()
  const taskDescription = `Press when your button has the color ${buttonColor}`
  const tester = testMyButtonColor(player, buttonColor)
  return new Task(taskDescription, tester)
}
function randomMyButtonTextTask({ player }) {
  const buttonText = randomButtonText()
  const taskDescription = `Press when your button has ${buttonText} written on it`
  const tester = testMyButtonText(player, buttonText)
  return new Task(taskDescription, tester)
}
function randomAtLeastNButtonColorsTask({ numPlayer }) {
  const buttonColor = randomButtonColor()
  const n = 2 + Math.floor(Math.random() * (numPlayer - 1))
  const taskDescription = `Press when at least ${n} buttons have the color ${buttonColor}`
  const tester = testAtLeastNButtonColors(n, buttonColor)
  return new Task(taskDescription, tester)
}
function randomAtLeastNButtonTextsTask({ numPlayer }) {
  const buttonText = randomButtonText()
  const n = 2 + Math.floor(Math.random() * (numPlayer - 1))
  const taskDescription = `Press when at least ${n} buttons have ${buttonText} written on them`
  const tester = testAtLeastNButtonColors(n, buttonText)
  return new Task(taskDescription, tester)
}

const taskCreators = [
  randomMyButtonColorTask,
  randomMyButtonTextTask,
  randomAtLeastNButtonColorsTask,
  randomAtLeastNButtonTextsTask,
]

export function generateTasks(game) {
  game.forEachPlayer((player) => {
    const context = {
      currentPlayer: player,
      numPlayers: game.players.length,
    }
    player.task = randomArrayElement(taskCreators)(context)
  })
}
