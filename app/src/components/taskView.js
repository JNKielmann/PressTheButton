import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import * as Colors from '../constants/colors'
import I18n from 'react-native-i18n'
var {width} = Dimensions.get('window')

class TaskView extends Component{

  render() {
  var text = ''
  var textPre = this.props.task.type + this.props.task.attribute.name + 'Pre'
  var textPost = this.props.task.type + this.props.task.attribute.name + 'Post'
  if(this.props.task.n) {
    text += this.props.task.n
  }
  text += I18n.t(textPre)
  text += this.props.task.attribute.value
  text += I18n.t(textPost)
    return (
      <View style={styles.taskView}>
        <View style={styles.taskHeaderView}>
          <Text style={styles.taskHeader}>{I18n.t('taskHeader')}</Text>
        </View>
        <View>
          <Text style={styles.task}>{text}</Text>
        </View>
      </View>
    )
  }
}

var styles = StyleSheet.create({
  taskView: {
    marginTop: 20,
    width: width
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