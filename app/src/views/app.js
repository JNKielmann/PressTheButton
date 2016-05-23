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
import * as Translations from '../constants/translations'

import Login from './login'
import MainMenu from './mainMenu'
import Lobby from './lobby'
import Game from './game'
import Loser from './loser'
import BarcodeScanner from 'react-native-barcodescanner'
import ReactTimeout from 'react-timeout/native'
import I18n from 'react-native-i18n'

class App extends Component{
  constructor(props){
    super(props)
    Connection.init()
    Translations.init()
    this.renderScene = this.renderScene.bind(this)
    this.turnOffValidTurn = this.turnOffValidTurn.bind(this)
    this.turnOffInvalidTurn = this.turnOffInvalidTurn.bind(this)
    this.initializeEventListeners()
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
      invalidTurn: false,
      roundEnded: false,
      loserId: '',
      screenFlashes: false,
      notPressed: false,
      duration: 0,
      newGameState: false
    }
  }
  render() {
    return (
      <Navigator
        ref='navigator'
        initialRoute={{name: 'login'}}
        renderScene={this.renderScene}
      />
    )
  }
  renderScene(route, navigator) {
    switch(route.name) {
      case 'login':
        return (
          <Login
            onForward={(name) => {
              this.setState({name: name})
              Connection.doLogin({name: name})
              navigator.push({
                name: 'mainMenu'
              })
            }}
          />
        )
      case 'mainMenu':
        return (
          <MainMenu
            onCreateGame={() => {
              Connection.doCreateGame({
                name: this.state.name
              })
            }}
            onReadQRCode={() => {
              navigator.push({
                name: 'qrCodeReader'
              })
            }}
          />
        )
      case 'lobby':
        return (
          <Lobby
            gameId={this.state.gameId}
            players={this.state.players}
            isHost={this.state.isHost}
            onForward={() => {
              Connection.doStartRound({playerId: this.state.playerId})
            }}
            onCancel={() => {
              Connection.doRemoveFromGame(
                {
                  playerId: this.state.playerId,
                  gameId: this.state.gameId
                })
              navigator.pop()
            }}
          />
        )
      case 'game':
        return (
          <Game 
            gameData={this.state.gameData}
            task={this.state.task}
            lives={this.state.lives}
            validTurn={this.state.validTurn}
            invalidTurn={this.state.invalidTurn}
            loser={this.state.loser}
            loserId={this.state.loserId}
            screenFlashes={this.state.screenFlashes}
            notPressed={this.state.notPressed}
            duration={this.state.duration}
            newGameState={this.state.newGameState}
            onPressButton={()=>this.onPressButton()}
            onButtonAnimated={()=>this.onButtonAnimated()}
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
              Connection.doRemoveFromGame(
                {
                  playerId: this.state.playerId,
                  gameId: this.state.gameId
                })
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
  onButtonAnimated() {
    this.setState({newGameState: false})
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
  initializeEventListeners() {
    Connection.onError((data) => {
      this.showErrorMessage(data, navigator)
    })
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
      this.refs.navigator.replace({
        name: 'game',
      })
    })
    Connection.onCreateGame((data) => {
      this.setState({
        playerId: data.payload.playerId,
        gameId: data.payload.gameId,
        isHost: true
      })
      this.refs.navigator.push({
        name: 'lobby'
      })
    })
    Connection.onUpdateGameState((data) => {
      this.setState({
        gameData: data.payload,
        duration: 3000,
        newGameState: true
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
      this.setState(
        {
          roundEnded: true,
          loser: data.payload.loser,
          screenFlashes: data.payload.screenFlashes,
          loserId: data.payload.loserId,
          notPressed: data.payload.notPressed
        })
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