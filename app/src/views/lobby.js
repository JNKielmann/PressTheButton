import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  ScrollView,
  Text
} from 'react-native';

import Button from 'react-native-button'
import QRCode from 'react-native-qrcode'
import * as Colors from '../constants/colors'

class Lobby extends Component{
  constructor(props){
    super(props)
    this.onPressStartGame = this.onPressStartGame.bind(this)
    this.onPressCancel = this.onPressCancel.bind(this)
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formular}>
          <QRCode
            value={this.props.gameId}
            size={250}
            bgColor='black'
            fgColor='#A2BAD1'/>
        </View>
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          automaticallyAdjustContentInsets={false}
          scrollEventThrottle={200}
          style={styles.playerList}>
          {this.props.players.map(this.createPlayersRow)}
        </ScrollView>
        <View style={styles.buttonArea}>
          <Button 
            containerStyle={styles.button}
            style={styles.buttonText} 
            onPress={this.onPressCancel}>
            Cancel
          </Button>
          {this.showStartGameButtonIfNecessery(this.props.isHost)}
        </View>
      </View>
    )
  }
  createPlayersRow(player) {
    return (
      <View key={player} style={styles.row}>
        <Text style={styles.name}>{player}</Text>
      </View>
    )
  }
  showStartGameButtonIfNecessery(isHost) {
    if(isHost) {
      return (
        <Button 
          containerStyle={styles.button}
          style={styles.buttonText} 
          onPress={this.onPressStartGame}>
          Start Game
        </Button>
      )
    }
  }
  onPressStartGame() {
    this.props.onForward()
  }
  onPressCancel() {
    this.props.onCancel()
  }
}

var styles = StyleSheet.create({
  buttonArea: {
    flexDirection: 'row'
  },
  playerList: {
    marginTop: 50,
  },
  row: {
    borderWidth: 2,
    borderRadius: 20,
    width: 250,
    overflow: 'hidden',
    backgroundColor: Colors.LOBBY_PLAYER_LIST_BACKGROUND
  },
  name: {
    fontSize: 20,
    textAlign: 'center'
  },
  formular: {
    marginTop: 50
  },
  button: {
    width: 200,
    marginBottom: 20,
    padding:20,
    borderWidth: 2,
    backgroundColor: Colors.MAIN_BUTTON_BACKGROUND,
    borderRadius: 20,
    overflow: 'hidden'
  },
  buttonText: {
    fontSize: 24,
    color: Colors.MAIN_BUTTON_TEXT,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BACKGROUND
  },
  inputField: {
    padding: 5,
    borderWidth: 2,
    width: 200,
    height: 40,
    fontSize: 18,
    textAlign: 'center',
    color: Colors.INPUT_FIELD_TEXT
  },
})

module.exports = Lobby