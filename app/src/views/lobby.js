import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  ListView,
  Text
} from 'react-native';

import Button from 'react-native-button'
import QRCode from 'react-native-qrcode'

class Lobby extends Component{
  constructor(props){
    super(props)
    this.onPressStartGame = this.onPressStartGame.bind(this)
  }
  render() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    var players = ds.cloneWithRows(this.props.players)
    return (
      <View style={styles.container}>
        <View style={styles.formular}>
          <QRCode
            value={this.props.gameId}
            size={250}
            bgColor='black'
            fgColor='white'/>
          <ListView
            dataSource={players}
            renderRow={(rowData) => <Text>{rowData}</Text>}
          />
        </View>
        {this.showStartGameButtonIfNecessery(this.props.isHost)}
      </View>
    )
  }
  showStartGameButtonIfNecessery(isHost) {
    if(isHost) {
      return (
        <Button style={styles.button} onPress={this.onPressStartGame}>
          Start Game
        </Button>
      )
    }
  }
  onPressStartGame() {
    this.props.onForward()
  }
}

var styles = StyleSheet.create({
  formular: {
  },
  button: {
    width: 150,
    marginTop: 20,
    padding:5,
    borderWidth: 2,
    fontSize: 18,
    textAlign: 'center',
    color: "rgba(0,0,0,1)"
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputField: {
    padding: 5,
    borderWidth: 2,
    width: 200,
    height: 40,
    fontSize: 18,
    textAlign: 'center',
    color: '#656565'
  },
})

module.exports = Lobby