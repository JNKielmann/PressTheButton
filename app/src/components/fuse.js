import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  View,
  Dimensions,
} from 'react-native';

var {width} = Dimensions.get('window')
import * as Colors from '../constants/colors'
import ReactTimeout from 'react-timeout/native'

class Fuse extends Component{
  componentWillReceiveProps(props) {
    this.setState(
      { 
        updateCounter: 1,
        percentage: 0
      })
  }
  constructor(props) {
    super(props)
    this.updatePercentage = this.updatePercentage.bind(this)
    this.state = {
      percentage: 0,
      updateCounter: 1
    }
  }
  render() {
    var fuseWidth = width * this.state.percentage
    return (
        <View>
          <Image 
            style={{
              width: 500,
            }}
            resizeMode={"contain"}
            source={require('../../res/fuse.png')}
          />
          <View style={[styles.rectangle, {width: fuseWidth}]}>
          </View>
        </View>
        )
  }
  updatePercentage() {
    var newPercentage = 100 / this.props.duration * 1000 * this.state.updateCounter / 100
    this.setState(
      {
        percentage: newPercentage,
        updateCounter: this.state.updateCounter + 1
      })
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

export default ReactTimeout(Fuse)