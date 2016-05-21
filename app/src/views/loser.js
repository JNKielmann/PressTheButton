import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';

import Button from 'react-native-button'
import * as Colors from '../constants/colors'

class Loser extends Component{
  constructor(props){
    super(props)
    this.onPressNextRound = this.onPressNextRound.bind(this)
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.loser} lost this round!</Text>
        {this.showNextRoundButtonIfNecessery(this.props.isHost)}
      </View>
    )
  }
  showNextRoundButtonIfNecessery(isHost) {
    if(isHost) {
      return (
        <Button 
          containerStyle={styles.button}
          style={styles.buttonText} 
          onPress={this.onPressNextRound}>
          Next Round
        </Button>
      )
    }
  }
  onPressNextRound() {
    this.props.onNextRound()
  }
}

var styles = StyleSheet.create({
  text: {
    marginBottom: 40,
    fontSize: 30,
    color: Colors.LOGIN_INFO_TEXT
  },
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

module.exports = Loser