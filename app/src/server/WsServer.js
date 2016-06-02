import http from 'http'
import { server as WebSocketServer } from 'websocket'

import { Player } from './player'
import { messageHandler } from './messageHandler'

export default function setupServer() {
  const server = http.createServer((request, response) => {
    console.log(`Received request for ${request.url}`)
    response.writeHead(404)
    response.end()
  })
  server.listen(8085, () => {
    console.log('Server is listening on port 8085')
  })

  const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false,
  })

  wsServer.on('request', (request) => {
    const connection = request.accept(null, request.origin)
    console.log('Connection accepted.')
    const player = new Player(connection.send.bind(connection))
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
        if (messageHandler[data.event]) {
          messageHandler[data.event](player, data.payload)
        }
      }
    })
    connection.on('close', () => {
      console.log(`Peer ${connection.remoteAddress} disconnected.`)
    })
  })
}
