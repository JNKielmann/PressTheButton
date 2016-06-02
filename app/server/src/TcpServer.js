import net from 'react-native-tcp'
import Player from './player'
import { messageHandler } from './messageHandler'

import { Buffer } from 'buffer'
global.Buffer = global.Buffer || Buffer

export default function setupTcpServer(  ) {
  // const server = net.createServer(socket => {
  //   console.log('New client connected')
  //   const player = new Player(socket.write.bind(socket))
  //   socket.on('data', (dataString) => {
  //     const data = JSON.parse(dataString)
  //     if (!data.event) {
  //       console.log('No Message type specified')
  //       return
  //     }
  //     if (!data.payload) {
  //       console.log('No payload provided')
  //       return
  //     }
  //     if (messageHandler[data.event]) {
  //       messageHandler[data.event](player, data.payload)
  //     }
  //   })
  //   socket.on('end', () => {
  //     console.log(`Client ${socket.remoteAddress} disconnected.`)
  //   })
  // }).listen(8085)
  // server.once('listening', () => {
  //   console.log(`Server is listening on port 8085 at ${server.address().address}`)
  //   callback()
  // })
  // server.on('close', () => {
  //   console.log('Server closed')
  // })
  // return server
  var serverPort = 8085;
  console.log('Start: setupServer')
  var server = net.createServer(function (socket) {
    console.log('Client connected to Server on ' + JSON.stringify(server.address()));
    const player = new Player(socket.write.bind(socket))
    console.log('Player instance created');
    socket.on('data', function (dataString) {
      console.log('Server Received: ' + dataString);
      const data = JSON.parse(dataString)
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
    })
    socket.on('error', function (error) {
      console.log('Server Error on Client: ' + error);
    })
  }).listen(serverPort, function () {
    console.log('opened server on ' + JSON.stringify(server.address()));
    //callback()
  });
  server.on('close', function () {
    console.log('Server closed event' );
  });
  server.on('error', function (error) {
    console.log('Server error: ' + error);
  });
  
  console.log('End: setupServer')
  return server
}
