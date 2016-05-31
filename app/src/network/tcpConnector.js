import * as Connection from '../constants/network'
import setupTcpServer from '../../server/src/TcpServer'
import net from 'react-native-tcp'

var listeners = {}
var tcpClient, tcpServer

export function doLogin(obj) {
  name = obj.name
}

function setupTcpClient(hostIp, callback) {
  tcpClient = net.createConnection({
    host: hostIp,
    port: 8085,
  }, callback)
  tcpClient.on('data', (dataString) => {
    const data = JSON.parse(dataString)
    if (listeners[data.event]) {
      listeners[data.event](data)
    }
  })
  tcpClient.on('error', (e) => {
    if (listeners[Connection.ERROR_EVENT]) {
      listeners[Connection.ERROR_EVENT](e.message)
    }
  })
}

export function doCreateGame(obj) {
  tcpServer = setupTcpServer(() => {
    setupTcpClient('localhost', () => {
      var data = {
        event: Connection.CREATE_GAME_EVENT,
        payload: {
          playerName: obj.name
        }
      }
      tcpClient.write(JSON.stringify(data))
    })
  })

}

export function onCreateGame(cb) {
  listeners[Connection.CREATE_GAME_EVENT] = cb
}

export function doJoinGame(obj) {
  setupTcpClient(obj.ip, () => {
    var data = {
      event: Connection.JOIN_GAME_EVENT,
      payload: {
        gameId: obj.gameId,
        playerName: obj.name
      }
    }
    tcpClient.write(JSON.stringify(data))
  })
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

export function onError(cb) {
  listeners[Connection.ERROR_EVENT] = cb
}

export function doStartRound(obj) {
  var data = {
    event: Connection.START_ROUND_EVENT,
    payload: {
      playerId: obj.playerId
    }
  }
  tcpClient.write(JSON.stringify(data))
}

export function doRemoveFromGame(obj) {
  var data = {
    event: Connection.REMOVE_FROM_GAME_EVENT,
    payload: {
      playerId: obj.playerId,
      gameId: obj.gameId
    }
  }
  tcpClient.end(JSON.stringify(data))
  tcpClient.destroy()
  tcpClient = null

  if(tcpServer){
    tcpServer.close()
    tcpServer = null
  }  
}

export function doAction(obj) {
  var data = {
    event: Connection.ACTION_EVENT,
    payload: {
      playerId: obj.playerId,
      type: obj.type
    }
  }
  tcpClient.write(JSON.stringify(data))
}