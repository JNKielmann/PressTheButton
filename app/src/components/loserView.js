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

class LoserView extends Component{
  constructor(props){
    super(props)
    this.onPressNextRound = this.onPressNextRound.bind(this)
  }
  render() {
    var viewStyle={}
    var lostText = ''
    if(this.props.playerId === this.props.loserId) {
      lostText = I18n.t('youLostRound')
    } else {
      lostText = this.props.loserName + I18n.t('lostRound')
    }
    if(this.props.isModel) {
      var top = height / 2 - viewHeight / 2
      viewStyle = {
        position: 'absolute',
        top: top,
        height: viewHeight
      }
    }
    return (
      <View style={[styles.container, viewStyle]}>
        <Text style={styles.text}>{lostText}</Text>
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
          {I18n.t('nextRound')}
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
    backgroundColor: Colors.LOSER_VIEW_BACKGROUND,
    opacity: 0.9,
    width: width
  }
})

module.exports = LoserView