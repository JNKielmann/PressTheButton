import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  Image
} from 'react-native';

import Button from 'react-native-button'
import Color from 'color'
import * as Colors from '../constants/colors'
import Icon from 'react-native-vector-icons/FontAwesome'

class Game extends Component{
  constructor(props){
    super(props)
    this.onPressButton = this.onPressButton.bind(this)
  }
  render() {
    var buttonTextColor = this.calcButtonTextColor(this.props.gameData.buttonColor)
    var hearts = []
    for(var i=0;i<this.props.lives;i++){
      hearts.push(<Icon key={'live'+i} style={{padding:4}} name="heart" size={30} color="#FF0002" />)
    }
    var feedbackStyle = {}
    if(this.props.validTurn) {
      feedbackStyle.backgroundColor = '#34FC12'
    }
    if(this.props.invalidTurn) {
      feedbackStyle.backgroundColor = '#FC0008'
    }
    return (
      <View style={[styles.container, feedbackStyle]}>
        <View style={styles.taskView}>
          <Text style={styles.task}>{this.props.task}</Text>
        </View>
        <View style={styles.buttonArea}>
          <TouchableHighlight 
            style={{
              borderRadius: 250,
              overflow: 'hidden'
            }} 
            onPress={this.onPressButton}>
            <View style={[styles.button,{backgroundColor: this.props.gameData.buttonColor}]}>
                <Text 
                  style={
                    [
                      {color: buttonTextColor},
                      styles.buttonText
                    ]}>
                  {this.props.gameData.buttonText}
                </Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={styles.lives}>
          {hearts}
        </View>
      </View>
    )
  }
  calcButtonTextColor(buttonColor) {
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
    justifyContent: 'space-between',
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

module.exports = Game