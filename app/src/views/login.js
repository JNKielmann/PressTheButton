import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import Button from 'react-native-button'
import * as Connection from '../network/connector'

class Login extends Component{
  constructor(props){
    super(props)
    this.onPressLogin = this.onPressLogin.bind(this)
    this.state = {name: ''}
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formular}>
          <Text>Name:</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
          />
          <Button style={styles.button} onPress={this.onPressLogin}>
            Login
          </Button>
        </View>
      </View>
    )
  }
  onPressLogin() {
    this.props.onForward(this.state.name)
  }
}

var styles = StyleSheet.create({
  formular: {
  },
  button: {
    width: 150,
    marginTop: 20,
    padding:5,
    borderWidth: 2,
    fontSize: 18,
    textAlign: 'center',
    color: "rgba(0,0,0,1)"
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

module.exports = Login