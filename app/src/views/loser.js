import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';

import Button from 'react-native-button'

class Loser extends Component{
  constructor(props){
    super(props)
    this.onPressNextRound = this.onPressNextRound.bind(this)
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.loser} lost this round!</Text>
        {this.showNextRoundButtonIfNecessery(this.props.isHost)}
      </View>
    )
  }
  showNextRoundButtonIfNecessery(isHost) {
    if(isHost) {
      return (
        <Button style={styles.button} onPress={this.onPressNextRound}>
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

module.exports = Loser