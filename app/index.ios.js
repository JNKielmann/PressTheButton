/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View
} from 'react-native';


import App from './src/views/app'

class PressTheButton extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <App />
    )
  }
}

AppRegistry.registerComponent('PressTheButton', () => PressTheButton);
