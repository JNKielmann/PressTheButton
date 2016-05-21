import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableHighlight,
  Text
} from 'react-native';

import Button from 'react-native-button'
import * as Connection from '../network/connector'

class Game extends Component{
  constructor(props){
    super(props)
    this.onPressButton = this.onPressButton.bind(this)
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>{this.props.task}</Text>
        </View>
        <TouchableHighlight onPress={this.onPressButton}>
          <View style={{backgroundColor: this.props.gameData.buttonColor}}>
            <View style={styles.button}>
              <Text>{this.props.gameData.buttonText}</Text>
            </View>
          </View>
        </TouchableHighlight>
        <View>
          <Text>Leben: {this.props.lives}</Text>
        </View>
      </View>
    )
  }
  onPressButton() {
    this.props.onPressButton()
  }
}

var styles = StyleSheet.create({
  button: {
    width: 150,
    height: 150,
    borderWidth: 2,
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

module.exports = Game