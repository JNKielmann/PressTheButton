import chai from 'chai'
chai.should()
import { AssertionError } from 'assert'
import MyButtonIsTask from './myButtonIs'


describe('"My Button is X" Task', () => {
  describe('createRandom', () => {
    it('should generate new task', () => {
      const fakePlayerId = '1234'
      const task = MyButtonIsTask.createRandom(fakePlayerId)
      task.type.should.be.equal('MyButtonIs')
      const attributes = ['buttonColor', 'buttonText', 'buttonShape']
      task.attribute.name.should.be.oneOf(attributes)
      task.attribute.value.should.be.a('string')
      task.onlyMine.should.be.a('boolean')
      task.owningPlayerId.should.equal('1234')
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
      }],
    }
    it('should return correctPress == true for correct states', () => {
      let result
      // Button Color
      const myButtonColorRedTask = {
        type: 'MyButtonIs',
        attribute: {
          name: 'buttonColor',
          value: 'red',
        },
        onlyMine: false,
        owningPlayerId: '1',
      }
      result = MyButtonIsTask.testIfTrueForState(myButtonColorRedTask, testState)
      result.should.deep.equal({
        pressCorrect: true,
        involvedPlayerIds: ['1'],
      }, 'Button Color Test 1')
      myButtonColorRedTask.onlyMine = true
      result = MyButtonIsTask.testIfTrueForState(myButtonColorRedTask, testState)
      result.should.deep.equal({
        pressCorrect: true,
        involvedPlayerIds: ['1'],
      }, 'Button Color Test 2')
      // Button Text
      const myButtonTextBlueTask = {
        type: 'MyButtonIs',
        attribute: {
          name: 'buttonText',
          value: 'blue',
        },
        onlyMine: false,
        owningPlayerId: '1',
      }
      result = MyButtonIsTask.testIfTrueForState(myButtonTextBlueTask, testState)
      result.should.deep.equal({
        pressCorrect: true,
        involvedPlayerIds: ['1'],
      }, 'Button Text Test 1')
      myButtonTextBlueTask.onlyMine = true
      result = MyButtonIsTask.testIfTrueForState(myButtonTextBlueTask, testState)
      result.should.deep.equal({
        pressCorrect: true,
        involvedPlayerIds: ['1'],
      }, 'Button Text Test 2')
    })
    it('should return correctPress == false for incorrect states', () => {
      let result
      // Button Color
      const myButtonColorGreenTask = {
        type: 'MyButtonIs',
        attribute: {
          name: 'buttonColor',
          value: 'green',
        },
        onlyMine: false,
        owningPlayerId: '1',
      }
      result = MyButtonIsTask.testIfTrueForState(myButtonColorGreenTask, testState)
      result.should.deep.equal({
        pressCorrect: false,
        involvedPlayerIds: ['1'],
      }, 'Button Color Test 1')
      myButtonColorGreenTask.owningPlayerId = '2'
      myButtonColorGreenTask.onlyMine = true
      result = MyButtonIsTask.testIfTrueForState(myButtonColorGreenTask, testState)
      result.should.deep.equal({
        pressCorrect: false,
        involvedPlayerIds: ['2', '3'],
      }, 'Button Color Test 2')
      // Button Text
      const myButtonTextPurpleTask = {
        type: 'MyButtonIs',
        attribute: {
          name: 'buttonText',
          value: 'purple',
        },
        onlyMine: false,
        owningPlayerId: '1',
      }
      result = MyButtonIsTask.testIfTrueForState(myButtonTextPurpleTask, testState)
      result.should.deep.equal({
        pressCorrect: false,
        involvedPlayerIds: ['1'],
      }, 'Button Text Test 1')
      myButtonTextPurpleTask.owningPlayerId = '2'
      myButtonTextPurpleTask.onlyMine = true
      result = MyButtonIsTask.testIfTrueForState(myButtonTextPurpleTask, testState)
      result.should.deep.equal({
        pressCorrect: false,
        involvedPlayerIds: ['2', '3'],
      }, 'Button Text Test 2')
    })
    it('should throw when task has wrong type', () => {
      const wrongTask = {
        type: 'WrongTask',
      }
      const funcToTest = MyButtonIsTask.testIfTrueForState.bind(null, wrongTask, testState)
      funcToTest.should.throw(AssertionError)
    })
  })
})

