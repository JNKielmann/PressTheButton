import assert from 'assert'
import { randomArrayElement, randomAttribute } from '../stateHelper'

const NButtonsAreTask = {
  createRandom: (totalNumberOfPlayer) => {
    let n
    if (totalNumberOfPlayer <= 4) {
      n = 2
    } else if (totalNumberOfPlayer <= 7) {
      n = randomArrayElement([2, 3])
    } else {
      n = randomArrayElement([2, 3, 4])
    }
    return {
      type: 'NButtonsAre',
      attribute: randomAttribute(),
      n,
      comparator: randomArrayElement(['atLeast', 'exactly']),
    }
  },

  testIfTrueForState: (task, state) => {
    assert(task.type === 'NButtonsAre',
      `NButtonsAre.testIfTrueForState was called with a task of type ${task.type}`)
    const involvedPlayerIds = []
    let totalCount = 0
    const testProperty = playerState => {
      return playerState[task.attribute.name] === task.attribute.value
    }
    state.playerStates.filter(testProperty).forEach((playerState) => {
      ++totalCount
      involvedPlayerIds.push(playerState.playerId)
    })
    const comperators = {
      atLeast: (lhs, rhs) => lhs >= rhs,
      exactly: (lhs, rhs) => lhs === rhs,
    }
    return {
      pressCorrect: comperators[task.comparator](totalCount, task.n),
      involvedPlayerIds,
    }
  },
}

export default NButtonsAreTask
