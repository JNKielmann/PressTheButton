import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Dimensions
} from 'react-native';

import Button from 'react-native-button'
import * as Colors from '../constants/colors'
import I18n from 'react-native-i18n'

var {width, height} = Dimensions.get('window')
var viewHeight = 100

class LoserPopup extends Component{
  constructor(props){
    super(props)
  }
  render() {
    var lostText = ''
    if(this.props.playerId === this.props.loserId) {
      lostText = I18n.t('youLostRound')
    } else {
      lostText = this.props.loserName + I18n.t('lostRound')
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{lostText}</Text>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  text: {
    fontSize: 30,
    textAlign: 'center',
    color: Colors.LOSER_INFO_TEXT
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
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.LOSER_POPUP_BACKGROUND,
    opacity: 0.9,
    width: width,
    position: 'absolute',
    top: height / 2 - viewHeight / 2,
    height: viewHeight
  }
})

module.exports = LoserPopup