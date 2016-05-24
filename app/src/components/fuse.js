import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  Dimensions,
  Animated
} from 'react-native';

var {width} = Dimensions.get('window')
import * as Colors from '../constants/colors'

class Fuse extends Component{
  componentDidUpdate() {
    if(this.props.duration) {
      Animated.timing(
        this.state.rectWidth,
        {
          duration: this.props.duration,
          toValue: width + 40 //TODO: find out why width isn't enough
        }
      ).start()
    }
  }
  componentWillReceiveProps() {
    this.setState(
      { 
        rectWidth: new Animated.Value(0)
      })
  }
  constructor(props) {
    super(props)
    this.state = {
      rectWidth:  new Animated.Value(0)
    }
  }
  render() {
    return (
        <View>
          <Image 
            style={{
              width: 500,
            }}
            resizeMode={"contain"}
            source={require('../../res/fuse.png')}
          />
          <Animated.View style={[styles.rectangle, {width: this.state.rectWidth}]}>
          </Animated.View>
        </View>
        )
  }
}

var styles = StyleSheet.create({
  rectangle: {
    top: 6,
    right: 0,
    height: 6,
    backgroundColor: Colors.BACKGROUND,
    position: 'absolute'
  }
})

module.exports = Fuse