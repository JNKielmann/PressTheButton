import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  LayoutAnimation
} from 'react-native';

import Button from '../components/button'
import TaskView from '../components/taskView'
import Fuse from '../components/fuse'
import * as Colors from '../constants/colors'
import * as Feedback from '../constants/feedback'
import ReactTimeout from 'react-timeout/native'
import I18n from 'react-native-i18n'

class Game extends Component{
  componentWillMount() {
    LayoutAnimation.spring()
  }
  componentWillReceiveProps(obj) {
    if(obj.newGameState){
      this.setState({ buttonShouldAnimate: true })
    } else {
      this.setState({ buttonShouldAnimate: false })
    }
  }
  componentDidUpdate(prevProps, props) {
    if(this.state.buttonShouldAnimate) {
      this.props.onButtonAnimated()
    }
  }
  constructor(props) {
    super(props)
    this.showAllItems = this.showAllItems.bind(this)
    this.decrementCountdown = this.decrementCountdown.bind(this)
    this.state = {
      onlyTaskView: true,
      countdown: 3,
      countdownStarted: false,
      countdownEnded: false,
      buttonShouldAnimate: false
    }
  }
  render() {
    var feedbackStyle = {}
    if(this.props.validTurn) {
      feedbackStyle.backgroundColor = Colors.FEEDBACK_VALID
    }
    if(this.props.roundEnded && this.props.flashScreen) {
      //TODO: flash background after a timeout
    }
    var views = []
    var justifyContent
    if(!this.state.onlyTaskView) {
      var buttonText
      var buttonColor
      var buttonText180
      if(this.state.countdown>0){
        buttonText = this.state.countdown
        buttonColor = Colors.COUNTDOWN_BUTTON
        buttonText180 = false
      } else {
        buttonText = this.props.gameData.buttonText
        buttonColor = this.props.gameData.buttonColor
        buttonText180 = true
      }
      views.push(
        <Button 
          key='button'
          disabled={!this.state.countdownEnded}
          color={buttonColor}
          text={buttonText}
          text180={buttonText180}
          animated={this.state.buttonShouldAnimate}
          onPressButton={this.props.onPressButton}
        />)
      views.push(<Fuse key='fuse' duration={this.props.turnDuration}/>)
      justifyContent = 'space-between'
    } else {
      justifyContent = 'center'
      this.props.setTimeout(this.showAllItems, this.props.timeTillStart - 3000)
    }
    if(this.props.roundEnded && !this.state.removeLostScreen) {
      //TODO: show popup, that removes after a few seconds
    }

    return (
      <View 
        style={[styles.container, {justifyContent: justifyContent}, feedbackStyle]}>
        <TaskView task={this.props.task} />
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
}

var styles = StyleSheet.create({
  loserView: {
    position: 'absolute',
    top: 200
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.BACKGROUND
  },
})

export default ReactTimeout(Game)