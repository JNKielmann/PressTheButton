import uuid from 'node-uuid'

export class Player {
  constructor(wsConnection) {
    this.id = uuid.v1()
    this.name = ''
    this.wsConnection = wsConnection
  }
  emit(event, payload) {
    this.wsConnection.send(JSON.stringify({
      event,
      payload,
    }))
  }
  joinGame(playerName, game) {
    this.name = playerName
    this.game = game
    game.addPlayer(this)
  }
}
