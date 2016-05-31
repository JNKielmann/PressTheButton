import chai from 'chai'
chai.should()
import { AssertionError } from 'assert'
import NButtonsAreXTask from './nButtonsAre'

describe('"n Button are X" Task', () => {
  describe('createRandom', () => {
    it('should generate new task', () => {
      const task = NButtonsAreXTask.createRandom(3)
      task.type.should.be.equal('NButtonsAre')
      const attributes = ['buttonColor', 'buttonText', 'buttonShape']
      task.attribute.name.should.be.oneOf(attributes)
      task.attribute.value.should.be.a('string')
      task.n.should.be.a('number')
      task.comparator.should.be.oneOf(['atLeast', 'exactly'])
    })
  })
  describe('testIfTrueForState', () => {
    const testState = {
      playerStates: [{
        playerId: '1',
        buttonColor: 'red',
        buttonText: 'blue',
      }, {
        playerId: '2',
        buttonColor: 'green',
        buttonText: 'purple',
      }, {
        playerId: '3',
        buttonColor: 'green',
        buttonText: 'purple',
      }, {
        playerId: '4',
        buttonColor: 'green',
        buttonText: 'green',
      }],
    }
    it('should return correctPress == true for correct states', () => {
      let result
      // Button Color
      let testTask = {
        type: 'NButtonsAre',
        attribute: {
          name: 'buttonColor',
          value: 'green',
        },
        n: 3,
        comparator: 'exactly',
      }
      result = NButtonsAreXTask.testIfTrueForState(testTask, testState)
      result.should.deep.equal({
        pressCorrect: true,
        involvedPlayerIds: ['2', '3', '4'],
      }, 'Test: Exactly three Buttons should have the color red')

      testTask.n = 2
      testTask.comparator = 'atLeast'
      result = NButtonsAreXTask.testIfTrueForState(testTask, testState)
      result.should.deep.equal({
        pressCorrect: true,
        involvedPlayerIds: ['2', '3', '4'],
      }, 'Test: At least two Buttons should have the color red')
      // Button Text
      testTask = {
        type: 'NButtonsAre',
        attribute: {
          name: 'buttonText',
          value: 'purple',
        },
        n: 2,
        comparator: 'exactly',
      }
      result = NButtonsAreXTask.testIfTrueForState(testTask, testState)
      result.should.deep.equal({
        pressCorrect: true,
        involvedPlayerIds: ['2', '3'],
      }, 'Test: Exactly two Buttons should have the text pruple')

      testTask.comparator = 'atLeast'
      result = NButtonsAreXTask.testIfTrueForState(testTask, testState)
      result.should.deep.equal({
        pressCorrect: true,
        involvedPlayerIds: ['2', '3'],
      }, 'Test: At least two Button should have the text purple')
    })

    it('should return correctPress == false for incorrect states', () => {
      let result
      // Button Color
      let testTask = {
        type: 'NButtonsAre',
        attribute: {
          name: 'buttonColor',
          value: 'green',
        },
        n: 2,
        comparator: 'exactly',
      }
      result = NButtonsAreXTask.testIfTrueForState(testTask, testState)
      result.should.deep.equal({
        pressCorrect: false,
        involvedPlayerIds: ['2', '3', '4'],
      }, 'Test: Exactly two Buttons should have the color red (is not correct press)')

      testTask.n = 4
      testTask.comparator = 'atLeast'
      result = NButtonsAreXTask.testIfTrueForState(testTask, testState)
      result.should.deep.equal({
        pressCorrect: false,
        involvedPlayerIds: ['2', '3', '4'],
      }, 'Test: At least four Buttons should have the color red (is not correct press)')
      // Button Text
      testTask = {
        type: 'NButtonsAre',
        attribute: {
          name: 'buttonText',
          value: 'purple',
        },
        n: 1,
        comparator: 'exactly',
      }
      result = NButtonsAreXTask.testIfTrueForState(testTask, testState)
      result.should.deep.equal({
        pressCorrect: false,
        involvedPlayerIds: ['2', '3'],
      }, 'Test: Exactly one Buttons should have the text pruple (is not correct press)')

      testTask.n = 3
      testTask.comparator = 'atLeast'
      result = NButtonsAreXTask.testIfTrueForState(testTask, testState)
      result.should.deep.equal({
        pressCorrect: false,
        involvedPlayerIds: ['2', '3'],
      }, 'Test: At least three Button should have the text purple (is not correct press)')
    })
    it('should throw when task has wrong type', () => {
      const wrongTask = {
        type: 'WrongTask',
      }
      const funcToTest = NButtonsAreXTask.testIfTrueForState.bind(null, wrongTask, testState)
      funcToTest.should.throw(AssertionError)
    })
  })
})

