import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';

import Color from 'color'
import * as Colors from '../constants/colors'
import * as Animatable from 'react-native-animatable'


class Button extends Component{
  componentWillReceiveProps(obj) {
    if(obj.animated){
      this.refs.button.shake(100)
    }
  }
  constructor(props) {
    super(props)
    this.onPressButton = this.onPressButton.bind(this)
  }
  render() {
    var buttonText180 
    if(this.props.text180) {
    buttonText180 = (
        <Text 
          style={
            [
              {transform: [{rotate: '180deg'}]},
              {color: this.calcButtonTextColor(this.props.color)},
              styles.buttonText
            ]}>
          {this.props.text}
        </Text>)
    }
    return (
        <Animatable.View 
          style={styles.buttonArea}
          ref='button'>
          <TouchableHighlight 
            style={{
              borderRadius: 250,
              overflow: 'hidden'
            }} 
            disabled={this.props.disabled}
            onPress={this.onPressButton}>
            <View style={[styles.button,{backgroundColor: this.props.color}]}>
                {buttonText180}
                <Text 
                  style={
                    [
                      {color: this.calcButtonTextColor(this.props.color)},
                      styles.buttonText
                    ]}>
                  {this.props.text}
                </Text>
            </View>
          </TouchableHighlight>
        </Animatable.View>
        )
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
  buttonArea: {
    alignSelf: 'center'
  },
  buttonText: {
    fontSize: 80,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button: {
    width: 320,
    height: 320,
    borderWidth: 2,
    borderRadius: 250,
    overflow: 'hidden',
    justifyContent: 'center'
  },
})

module.exports = Button