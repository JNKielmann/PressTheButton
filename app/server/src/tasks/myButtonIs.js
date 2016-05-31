import assert from 'assert'
import { randomArrayElement, randomAttribute } from '../stateHelper'

const MyButtonIsTask = {
  createRandom: (owningPlayerId) => {
    return {
      type: 'MyButtonIs',
      attribute: randomAttribute(),
      onlyMine: randomArrayElement([true, false]),
      owningPlayerId,
    }
  },

  testIfTrueForState: (task, state) => {
    assert(task.type === 'MyButtonIs',
      `MyButtonIsTask.testIfTrueForState was called with a task of type ${task.type}`)
    let myPressCorrect = false
    let otherPressCorrect = false
    const involvedPlayerIds = [task.owningPlayerId]
    for (const playerState of state.playerStates) {
      if (playerState[task.attribute.name] === task.attribute.value) {
        if (playerState.playerId === task.owningPlayerId) {
          myPressCorrect = true
        } else if (task.onlyMine) {
          otherPressCorrect = true
          involvedPlayerIds.push(playerState.playerId)
        }
      }
    }
    return {
      pressCorrect: myPressCorrect && !(task.onlyMine && otherPressCorrect),
      involvedPlayerIds,
    }
  },
}

export default MyButtonIsTask
