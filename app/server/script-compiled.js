'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Player = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = exports.Player = function () {
  function Player(socket) {
    _classCallCheck(this, Player);

    this.id = _nodeUuid2.default.v1();
    this.name = '';
    this.socket = socket;
  }

  _createClass(Player, [{
    key: 'on',
    value: function on(eventName, callback) {
      this.socket.on(eventName, callback);
    }
  }, {
    key: 'emit',
    value: function emit(eventName, data) {
      this.socket.emit(eventName, data);
    }
  }]);

  return Player;
}();
'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _nodeUuid = require('node-uuid');

var _nodeUuid2 = _interopRequireDefault(_nodeUuid);

var _player = require('./player');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var server = new _http.Server(_express2.default);

var io = (0, _socket2.default)(server);


server.listen(8080, function () {
  console.log('=================================================');
  console.log('= Server Started                                =');
  console.log('=================================================');
});

var currentGames = {};

io.on('connection', function (socket) {
  console.log('Player connected');
  var player = new _player.Player(socket);
  // socket.on('login', ({ payload }) => {
  //   onlinePlayers[playerId] = {
  //     id: playerId,
  //     name: payload.name,
  //   }
  //   socket.emit('login', {
  //     playerId,
  //   })
  // })
  player.on('createGame', function (_ref) {
    var payload = _ref.payload;

    player.name = payload.playerName;
    var gameId = _nodeUuid2.default.v1();
    currentGames[gameId] = {
      players: [player],
      host: player
    };
    player.emit('createGame', {
      gameId: gameId,
      playerId: player.id
    });
    player.emit('playerList', [player.name]);
    console.log('Game created');
  });
  socket.on('joinGame', function (_ref2) {
    var payload = _ref2.payload;

    var game = currentGames[payload.gameId];
    if (!game) {
      console.log('Client tried to join not existing game ' + payload.gameId);
      return;
    }
    if (!payload.playerId) {
      console.log('Client tried to join without specifying a player id');
    }
    game.players.push(player);
    player.emit('joinGame', {});
    var playerNames = game.players.map(function (p) {
      return p.name;
    });
    game.players.forEach(function (p) {
      p.emit('playerList', playerNames);
    });
    console.log('Player joined');
  });
});
