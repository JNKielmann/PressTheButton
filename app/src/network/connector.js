import * as Connection from '../constants/network'

var listeners = {}
var ws

export function init() {
  ws = new WebSocket(Connection.SERVER_URL)
  ws.onopen = () => {
    console.log('connection established')
  }
  ws.onmessage = (e) => {
    var data = JSON.parse(e.data)
    if(listeners[data.event]) {
      listeners[data.event](data)
    }
  }
  ws.onerror = (e) => {
    console.log(e.message)
  }
  ws.onclose = (e) => {
    console.log(e.code, e.reason)
  }
}

export function doLogin(obj) {
  name = obj.name
}

export function doCreateGame(obj) {
  var data = {
    event: Connection.CREATE_GAME_EVENT,
    payload: {
    	playerName: obj.name
    }
  }
  ws.send(JSON.stringify(data))
}

export function onCreateGame(cb) {
  listeners[Connection.CREATE_GAME_EVENT] = cb
}

export function doJoinGame(obj) {
  var data = {
    event: Connection.JOIN_GAME_EVENT,
    payload: {
    	gameId: obj.gameId,
    	playerName: obj.name
    }
  }
  ws.send(JSON.stringify(data))
}

export function onJoinGame(cb) {
  listeners[Connection.JOIN_GAME_EVENT] = cb
}

export function onPlayerList(cb) {
  listeners[Connection.PLAYER_LIST_EVENT] = cb
}

export function onUpdateGameState(cb) {
  listeners[Connection.UPDATE_GAME_STATE_EVENT] = cb
}

export function onValidTurn(cb) {
  listeners[Connection.VALID_TURN_EVENT] = cb
}

export function onInvalidTurn(cb) {
  listeners[Connection.INVALID_TURN_EVENT] = cb
}

export function onEndRound(cb) {
  listeners[Connection.END_ROUND_EVENT] = cb
}

export function onStartRound(cb) {
  listeners[Connection.START_ROUND_EVENT] = cb
}

export function doStartRound(obj) {
  var data = {
    event: Connection.START_ROUND_EVENT,
    payload: {
    	playerId: obj.playerId
    }
  }
  ws.send(JSON.stringify(data))
}

export function doAction(obj) {
  var data = {
    event: Connection.ACTION_EVENT,
    payload: {
    	playerId: obj.playerId,
    	type: obj.type
    }
  }
  ws.send(JSON.stringify(data))
}