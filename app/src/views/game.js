import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Image,
  LayoutAnimation
} from 'react-native';

import Button from 'react-native-button'
import Color from 'color'
import * as Colors from '../constants/colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import ReactTimeout from 'react-timeout/native'

class Game extends Component{
  componentWillMount() {
    LayoutAnimation.spring()
  }
  constructor(props) {
    super(props)
    this.onPressButton = this.onPressButton.bind(this)
    this.showAllItems = this.showAllItems.bind(this)
    this.decrementCountdown = this.decrementCountdown.bind(this)
    this.state = {
      onlyTaskView: true,
      countdown: 3,
      countdownStarted: false,
      countdownEnded: false
    }
  }
  render() {
    var buttonTextColor = this.calcButtonTextColor(this.props.gameData.buttonColor)
    var hearts = []
    for(var i=0;i<this.props.lives;i++){
      hearts.push(<Icon key={'live'+i} style={{padding:4}} name="heart" size={30} color="#FF0002" />)
    }
    var feedbackStyle = {}
    if(this.props.validTurn) {
      feedbackStyle.backgroundColor = Colors.FEEDBACK_VALID
    }
    if(this.props.invalidTurn) {
      feedbackStyle.backgroundColor = Colors.FEEDBACK_INVALID
    }
    var views = []
    var justifyContent
    if(!this.state.onlyTaskView) {
      var buttonText
      var buttonColor
      if(this.state.countdown>0){
        buttonText = this.state.countdown
        buttonColor = Colors.COUNTDOWN_BUTTON
      } else {
        buttonText = this.props.gameData.buttonText
        buttonColor = this.props.gameData.buttonColor
      }
      views.push(
        <View key='buttonArea' style={styles.buttonArea}>
          <TouchableHighlight 
            style={{
              borderRadius: 250,
              overflow: 'hidden'
            }} 
            disabled={!this.state.countdownEnded}
            onPress={this.onPressButton}>
            <View style={[styles.button,{backgroundColor: buttonColor}]}>
                <Text 
                  style={
                    [
                      {color: buttonTextColor},
                      styles.buttonText
                    ]}>
                  {buttonText}
                </Text>
            </View>
          </TouchableHighlight>
        </View>)
      views.push(
        <View key='livesArea' style={styles.lives}>
          {hearts}
        </View>)
      justifyContent = 'space-between'
    } else {
      justifyContent = 'center'
      this.props.setTimeout(this.showAllItems, 3000)
    }

    return (
      <View style={[styles.container, {justifyContent: justifyContent}, feedbackStyle]}>
        <View style={[styles.taskView, this.state.taskViewStyle]}>
          <Text style={styles.task}>{this.props.task}</Text>
        </View>
        {views}
      </View>
    )
  }
  decrementCountdown() {
    var nextCountdownState = this.state.countdown - 1
    this.setState({ countdown: nextCountdownState })
    if(nextCountdownState>0) {
      this.props.setTimeout(this.decrementCountdown, 1000)
    } else {
      this.setState({ countdownEnded: true })
    }
  }
  showAllItems() {
    LayoutAnimation.spring()
    this.setState({ onlyTaskView: false })
    if(!this.state.countdownStarted){
      this.setState({ countdownStarted: true })
      this.props.setTimeout(this.decrementCountdown, 1000)
    }
  }
  calcButtonTextColor(buttonColor) {
    if(!buttonColor) {
      return Colors.COUNTDOWN_TEXT
    }
    var color = Color(buttonColor)
    return color.negate().rgbString()
  }
  onPressButton() {
    this.props.onPressButton()
  }
}

var styles = StyleSheet.create({
  lives: {
    marginLeft: 20,
    marginBottom: 15,
    alignSelf: 'flex-start',
    flexDirection: 'row'
  },
  taskView: {
    marginTop: 50
  },
  task: {
    textAlign: 'center',
    fontSize: 40
  },
  buttonArea: {
  },
  buttonText: {
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderRadius: 250,
    overflow: 'hidden',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
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

export default ReactTimeout(Game)