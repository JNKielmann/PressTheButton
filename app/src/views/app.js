import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Navigator,
  Alert
} from 'react-native';

import * as Connection from '../network/connector'
import * as ActionTypes from '../constants/actionTypes'
import * as FeedbackConstants from '../constants/feedback'

import Login from './login'
import MainMenu from './mainMenu'
import Lobby from './lobby'
import Game from './game'
import Loser from './loser'
import BarcodeScanner from 'react-native-barcodescanner'
import ReactTimeout from 'react-timeout/native'

class App extends Component{
  constructor(props){
    super(props)
    Connection.init()
    this.renderScene = this.renderScene.bind(this)
    this.turnOffValidTurn = this.turnOffValidTurn.bind(this)
    this.turnOffInvalidTurn = this.turnOffInvalidTurn.bind(this)
    this.state = {
      name: '',
      gameId: '',
      playerId: '',
      players: [],
      isHost: false,
      gameData: {},
      task: '',
      lives: 0,
      loser: '',
      validTurn: false,
      invalidTurn: false
    }
  }
  render() {
    return (
      <Navigator
        initialRoute={{name: 'login', index: 0}}
        renderScene={this.renderScene}
      />
    )
  }
  renderScene(route, navigator) {
    Connection.onError((data) => {
      this.showErrorMessage(data, navigator)
    })
    switch(route.name) {
      case 'login':
        return (
          <Login
            onForward={(name) => {
              this.setState({name: name})
              Connection.doLogin({name: name})
              var nextIndex = route.index + 1;
              navigator.push({
                name: 'mainMenu',
                index: nextIndex,
              })
            }}
          />
        )
      case 'mainMenu':
        return (
          <MainMenu
            onCreateGame={() => {
              Connection.onCreateGame((data) => {
                this.setState({
                  playerId: data.payload.playerId,
                  gameId: data.payload.gameId,
                  isHost: true
                })
                var nextIndex = route.index + 1;
                navigator.push({
                  name: 'lobby',
                  index: nextIndex,
                })
              })
              Connection.doCreateGame({
                name: this.state.name
              })
            }}
            onReadQRCode={() => {
              var nextIndex = route.index + 1;
              navigator.push({
                name: 'qrCodeReader',
                index: nextIndex,
              })
            }}
          />
        )
      case 'lobby':
        Connection.onPlayerList((data) => {
          this.setState({
            players: data.payload.players
          })
        })
        Connection.onStartRound((data) => {
          this.setState({
            task: data.payload.task,
            lives: data.payload.lives
          })
          navigator.replace({
            name: 'game',
          })
        })
        return (
          <Lobby
            gameId={this.state.gameId}
            players={this.state.players}
            isHost={this.state.isHost}
            onForward={() => {
              Connection.doStartRound({playerId: this.state.playerId})
            }}
            onCancel={() => {
              Connection.doCancelGame({playerId: this.state.playerId})
              navigator.pop()
            }}
          />
        )
      case 'game':
        Connection.onUpdateGameState((data) => {
          this.setState({
            gameData: data.payload
          })
        })
        Connection.onValidTurn((data) => {
          this.setState({validTurn: true})
          this.props.setTimeout(this.turnOffValidTurn, FeedbackConstants.FEEDBACK_TIME)
        })
        Connection.onInvalidTurn((data) => {
          this.setState({
            lives: data.payload.lives,
            invalidTurn: true
          })
          this.props.setTimeout(this.turnOffInvalidTurn, FeedbackConstants.FEEDBACK_TIME)
        })
        Connection.onEndRound((data) => {
          this.setState({loser: data.payload.loser})
          navigator.replace({
            name: 'loser',
          })
        })
        return (
          <Game 
            gameData={this.state.gameData}
            task={this.state.task}
            lives={this.state.lives}
            validTurn={this.state.validTurn}
            invalidTurn={this.state.invalidTurn}
            onPressButton={()=>this.onPressButton()}
          />
        )
      case 'qrCodeReader':
        return (
          <BarcodeScanner
            onBarCodeRead={(e)=>this.barcodeReceived(e,navigator)}
            style={{ flex: 1 }}
            torchMode={'off'}
            cameraType={'back'}
          />
        )
      case 'loser':
        return (
          <Loser
            loser={this.state.loser}
            isHost={this.state.isHost}
            onNextRound={() => {
              Connection.doStartRound({playerId: this.state.playerId})
            }}
            onGiveUp={() => {
              Connection.doGiveUp({playerId: this.state.playerId})
              navigator.pop()
            }}
          />
        )
    }
  }
  turnOffValidTurn(valid) {
    this.setState({ validTurn: false })
  }
  turnOffInvalidTurn(invalid) {
    this.setState({ invalidTurn: false })
  }
  showErrorMessage(message, navigator) {
    Alert.alert(
            'Error',
            message,
          )
  }
  onPressButton() {
    Connection.doAction(
      {
        playerId: this.state.playerId,
        type: ActionTypes.BUTTON_PRESSED
      }
    )
  }
  barcodeReceived(e, navigator) {
    this.setState({gameId: e.data})
    Connection.doJoinGame(
      {
        gameId: e.data,
        name: this.state.name
      }
    )
    navigator.replace({
      name: 'lobby',
    })
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default ReactTimeout(App)