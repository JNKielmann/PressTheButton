import MyButtonIs from './myButtonIs'
import NButtonsAre from './nButtonsAre'
import { randomArrayElement } from '../stateHelper'
import assert from 'assert'

const AllTasks = {
  createRandom: (owningPlayerId, totalNumberOfPlayers) => {
    const taskType = randomArrayElement(['MyButtonIs', 'NButtonsAre'])
    if (taskType === 'MyButtonIs') {
      return MyButtonIs.createRandom(owningPlayerId)
    } else if (taskType === 'NButtonsAre') {
      return NButtonsAre.createRandom(totalNumberOfPlayers)
    }
    return null
  },
  testIfTrueForState: (task, state) => {
    assert(task !== undefined)
    assert(state !== undefined)
    if (task.type === 'MyButtonIs') {
      return MyButtonIs.testIfTrueForState(task, state)
    } else if (task.type === 'NButtonsAre') {
      return NButtonsAre.testIfTrueForState(task, state)
    }
    console.error(`Unknown task type ${task.type}`)
    return null
  },
}

export default AllTasks
