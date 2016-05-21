import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';

import Button from 'react-native-button'
import * as Colors from '../constants/colors'

class MainMenu extends Component{
  constructor(props){
    super(props)
    this.onPressCreateGame = this.onPressCreateGame.bind(this)
    this.onPressJoinGame = this.onPressJoinGame.bind(this)
  }
  render() {
    return (
      <View style={styles.container}>
        <Button 
          containerStyle={styles.button}
          style={styles.buttonText}
          onPress={this.onPressCreateGame}>
          Create Game
        </Button>
        <Button 
          containerStyle={styles.button}
          style={styles.buttonText} 
          onPress={this.onPressJoinGame}>
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
  buttonText: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.MAIN_BUTTON_TEXT,
  },
  button: {
    width: 200,
    marginTop: 70,
    padding:20,
    borderWidth: 2,
    backgroundColor: Colors.MAIN_BUTTON_BACKGROUND,
    borderRadius: 20,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BACKGROUND
  },
})

module.exports = MainMenu