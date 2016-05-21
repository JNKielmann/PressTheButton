import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import Button from 'react-native-button'
import * as Colors from '../constants/colors'

class Login extends Component{
  constructor(props){
    super(props)
    this.onPressLogin = this.onPressLogin.bind(this)
    this.state = {
      name: '',
      errorMessage: ''
    }
  }
  render() {
    return (
      <View style={styles.container}>
          <Text style={styles.text}>
            What is your name?
          </Text>
        <View style={styles.formular}>
          <Text style={styles.errorMessage}>{this.state.errorMessage}</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={(name) => this.setState({name})}
            value={this.state.name}
          />
        </View>
        <Button 
          containerStyle={styles.button}
          style={styles.buttonText} 
          onPress={this.onPressLogin}>
          Login
        </Button>
      </View>
    )
  }
  onPressLogin() {
    var nameWithoutSpaces = this.state.name.trim()
    if(nameWithoutSpaces !== "") {
      this.props.onForward(nameWithoutSpaces)
    }else{
      this.showErrorMessage('Enter a valid name you bastard!')
    }
  }
  showErrorMessage(errorMessage) {
    this.setState({errorMessage})
  }
}

var styles = StyleSheet.create({
  formular: {
  },
  errorMessage: {
    color: Colors.ERROR_MESSAGE
  },
  text: {
    marginBottom: 40,
    fontSize: 30,
    color: Colors.LOGIN_INFO_TEXT
  },
  button: {
    width: 200,
    marginTop: 20,
    padding:4,
    borderWidth: 2,
    backgroundColor: Colors.MAIN_BUTTON_BACKGROUND,
  },
  buttonText: {
    fontSize: 24,
    textAlign: 'center',
    color: Colors.MAIN_BUTTON_TEXT,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.BACKGROUND
  },
  inputField: {
    padding: 5,
    borderWidth: 2,
    width: 200,
    height: 40,
    fontSize: 20,
    textAlign: 'center',
    color: Colors.INPUT_FIELD_TEXT,
    backgroundColor: Colors.INPUT_FIELD_BACKGROUND,
  },
})

module.exports = Login