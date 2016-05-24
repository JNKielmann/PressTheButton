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
    if (myState) { // TODO: Should never be null
      return {
        pressCorrect: tester(myState),
        involvedPlayerIds: [player.id],
      }
    }
  }
}
function testAtLeastNStates(n, tester) {
  return (state) => {
    const involvedPlayerIds = []
    let totalCount = 0
    state.playerStates.filter(tester).forEach((playerState) => {
      ++totalCount
      involvedPlayerIds.push(playerState.playerId)
    })
    return {
      pressCorrect: totalCount >= n,
      involvedPlayerIds,
    }
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



function randomMyButtonColorTask({ currentPlayer }) {
  const buttonColor = randomButtonColor()
  const pressWhen = `your button has the color ${buttonColor}`
  const tester = testMyButtonColor(currentPlayer, buttonColor)
  return new Task(pressWhen, tester)
}
function randomMyButtonTextTask({ currentPlayer }) {
  const buttonText = randomButtonText()
  const pressWhen = `your button has ${buttonText} written on it`
  const tester = testMyButtonText(currentPlayer, buttonText)
  return new Task(pressWhen, tester)
}
function randomAtLeastNButtonColorsTask({ numPlayers }) {
  const buttonColor = randomButtonColor()
  let n = 0
  if (numPlayers <= 4) {
    n = 2
  } else {
    n = Math.floor(Math.random() * 2) + 2
  }
  const pressWhen = `at least ${n} buttons have the color ${buttonColor}`
  const tester = testAtLeastNButtonColors(n, buttonColor)
  return new Task(pressWhen, tester)
}
function randomAtLeastNButtonTextsTask({ numPlayers }) {
  const buttonText = randomButtonText()
  const n = 2 + Math.floor(Math.random() * (numPlayers - 1))
  const pressWhen = `at least ${n} buttons have ${buttonText} written on them`
  const tester = testAtLeastNButtonTexts(n, buttonText)
  return new Task(pressWhen, tester)
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
