import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';

import Button from 'react-native-button'
import * as Colors from '../constants/colors'
import I18n from 'react-native-i18n'

class Loser extends Component{
  constructor(props){
    super(props)
    this.onPressNextRound = this.onPressNextRound.bind(this)
    this.onPressGiveUp = this.onPressGiveUp.bind(this)
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.loser}{I18n.t('lostRound')}</Text>
        {this.showNextRoundButtonIfNecessery(this.props.isHost)}
        <Button 
          containerStyle={[styles.button, styles.buttonGiveUp]}
          style={styles.buttonText} 
          onPress={this.onPressGiveUp}>
          {I18n.t('giveUp')}
        </Button>
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
          {I18n.t('nextRound')}
        </Button>
      )
    }
  }
  onPressNextRound() {
    this.props.onNextRound()
  }
  onPressGiveUp() {
    this.props.onGiveUp()
  }
}

var styles = StyleSheet.create({
  text: {
    marginTop: 200,
    fontSize: 30,
    textAlign: 'center',
    color: Colors.LOGIN_INFO_TEXT
  },
  buttonText: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.MAIN_BUTTON_TEXT,
  },
  button: {
    width: 200,
    padding:20,
    borderWidth: 2,
    backgroundColor: Colors.MAIN_BUTTON_BACKGROUND,
    borderRadius: 20,
    overflow: 'hidden',
  },
  buttonGiveUp: {
    marginBottom: 40
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.BACKGROUND
  },
})

module.exports = Loser