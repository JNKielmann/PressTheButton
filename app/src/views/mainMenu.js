import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';

import Button from 'react-native-button'

class MainMenu extends Component{
  constructor(props){
    super(props)
    this.onPressCreateGame = this.onPressCreateGame.bind(this)
    this.onPressJoinGame = this.onPressJoinGame.bind(this)
  }
  render() {
    return (
      <View style={styles.container}>
        <Button style={styles.button} onPress={this.onPressCreateGame}>
          Create Game
        </Button>
        <Button style={styles.button} onPress={this.onPressJoinGame}>
          Join Game
        </Button>
      </View>
    )
  }
  onPressCreateGame() {
    this.props.onCreateGame()
  }
  onPressJoinGame() {
    this.props.onReadQRCode()
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

module.exports = MainMenu