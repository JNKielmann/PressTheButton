import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import * as Colors from '../constants/colors'
import I18n from 'react-native-i18n'


class TaskView extends Component{
  render() {
    return (
      <View style={styles.taskView}>
        <View style={styles.taskHeaderView}>
          <Text style={styles.taskHeader}>{I18n.t('taskHeader')}</Text>
        </View>
        <View>
          <Text style={styles.task}>{this.props.task}</Text>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  taskView: {
    marginTop: 50
  },
  taskHeaderView: {
    padding: 5,
    alignSelf: 'stretch',
    backgroundColor: '#FFD13B'
  },
  taskHeader: {
    textAlign: 'center',
    color: '#4E5950',
    fontSize: 30
  },
  task: {
    textAlign: 'center',
    fontSize: 40
  },
})

module.exports = TaskView