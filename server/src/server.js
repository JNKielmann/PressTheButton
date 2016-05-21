import http from 'http'
import { server as WebSocketServer } from 'websocket'
import uuid from 'node-uuid'

import { Player } from './player'
import { messageHandler } from './messageHandler'

const server = http.createServer((request, response) => {
  console.log(`Received request for ${request.url}`)
  response.writeHead(404)
  response.end()
})
server.listen(8080, () => {
  console.log('Server is listening on port 8080')
})

const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
})

wsServer.on('request', (request) => {
  const connection = request.accept(null, request.origin)
  console.log('Connection accepted.')
  const player = new Player(connection)
  connection.on('message', (message) => {
    if (message.type === 'utf8') {
      console.log(`Received Message: ${message.utf8Data}`)
      const data = JSON.parse(message.utf8Data)
      if (!data.event) {
        console.log('No Message type specified')
        return
      }
      if (!data.payload) {
        console.log('No payload provided')
        return
      }
      console.log(messageHandler)
      messageHandler[data.event](player, data.payload)
    }
  })
  connection.on('close', () => {
    console.log(`Peer ${connection.remoteAddress} disconnected.`)
  })
})