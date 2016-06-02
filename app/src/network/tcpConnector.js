import * as Connection from '../constants/network'
import setupTcpServer from '../server/TcpServer'

global.Buffer = global.Buffer || require('buffer').Buffer
import net from 'react-native-tcp'

var listeners = {}
var tcpClient, tcpServer

export function doLogin(obj) {
  name = obj.name
}

function setupTcpClient(firstMsg, hostIp, callback) {
  // tcpClient = net.createConnection({
  //   host: hostIp,
  //   port: 8085,
  // }, callback)
  // tcpClient.on('data', (dataString) => {
  //   const data = JSON.parse(dataString)
  //   if (listeners[data.event]) {
  //     listeners[data.event](data)
  //   }
  // })
  // tcpClient.on('error', (e) => {
  //   if (listeners[Connection.ERROR_EVENT]) {
  //     listeners[Connection.ERROR_EVENT](e.message)
  //   }
  // })
  console.log('Start: setupTcpClient')  
  var serverPort = 8085
  var client = net.createConnection(serverPort, function () {
    console.log('opened client on ' + JSON.stringify(client.address()));
    client.write(firstMsg);
    console.log('Message send to Server: ' + firstMsg)
  });

  client.on('data', function (dataString) {
    console.log('Client Received: ' + dataString);
    const data = JSON.parse(dataString)
    if (listeners[data.event]) {
      listeners[data.event](data)
    }
  });

  client.on('error', function (error) {
    console.log('client error ' + error);
  });

  client.on('close', function () {
    console.log('client close event');
  });
  console.log('End: setupTcpClient')
  
  return client
}

export function socketTest() {
  var serverPort = 8085;
  console.log('Start: socketTest')
  var server = net.createServer(function (socket) {
    console.log('Client connected to Server on ' + JSON.stringify(server.address()));

    socket.on('data', function (data) {
      console.log('Server Received: ' + data);
      socket.write('Echo server\r\n');
      console.log('Echo message send to client')

    });

    socket.on('error', function (error) {
      console.log('Server Error on Client: ' + error);
    });
  }).listen(serverPort, function () {
    console.log('opened server on ' + JSON.stringify(server.address()));
  });
  server.on('close', function () {
    console.log('Server closed event');
  });
  server.on('error', function (error) {
    console.log('Server error: ' + error);
  });

  var client = net.createConnection(serverPort, function () {
    console.log('opened client on ' + JSON.stringify(client.address()));
    client.write('Hello, server! Love, Client.');
    console.log('Message send to Server')
  });

  client.on('data', function (data) {
    console.log('Client Received: ' + data);
    console.log('Destroy the Client now')
    client.destroy(); // kill client after server's response
    console.log('Destroy the Server now')
    server.close();
    console.log('All done')
  });

  client.on('error', function (error) {
    console.log('client error ' + error);
  });

  client.on('close', function () {
    console.log('client close event');
  });
  console.log('End: socketTest')
}


export function doCreateGame(obj) {
  console.log('Start: doCreateGame!')
  tcpServer = setupTcpServer()
  var data = {
    event: Connection.CREATE_GAME_EVENT,
    payload: {
      playerName: obj.name
    }
  }
  setTimeout(() => {
    tcpClient = setupTcpClient(JSON.stringify(data))
  }, 500)
  // tcpServer = setupTcpServer(() => {
  //   setupTcpClient('localhost', () => {
  //     var data = {
  //       event: Connection.CREATE_GAME_EVENT,
  //       payload: {
  //         playerName: obj.name
  //       }
  //     }
  //     tcpClient.write(JSON.stringify(data))
  //   })
  // })
  console.log('End: doCreateGame')
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

  if (tcpServer) {
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