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
    console.log(this.props.task)
  var text = ''
  var textPre = this.props.task.type + this.props.task.attribute.name + 'Pre'
  var textPost = this.props.task.type + this.props.task.attribute.name + 'Post'

  var type = I18n.t(this.props.task.attribute.name)
  var n = ""
  var pre = ""
  var attribute
  var post = ""
  if(this.props.task.n) {
    n += this.props.task.n
  }
  pre += I18n.t(textPre)
  post += I18n.t(textPost)

  switch(this.props.task.attribute.name) {
    case "buttonText":
      attribute = <Text style={[styles.task, styles.weightedAttribute]}>{I18n.t(this.props.task.attribute.value)}</Text> 
      break;
    case "buttonColor":   
      attribute = <View style={[styles.colorView, {backgroundColor: this.props.task.attribute.value}]}></View> 
      break;
  }

    return (
      <View style={styles.taskView}>
        <View style={styles.taskHeaderView}>
          <Text style={styles.taskHeader}>{I18n.t('taskHeader')}</Text>
        </View>
        <View style={styles.textView}>
            <Text style={[styles.task, styles.weightedAttribute]}>{n}</Text>
            <Text style={styles.task}>{pre}</Text>
            <Text style={[styles.task, styles.weightedAttribute]}>{type}</Text>
            {attribute}
            <Text style={styles.task}>{post}</Text>
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
  colorView: {
    margin: 8,
    width: 70,
  },
  textView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center'
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
  weightedAttribute: {
    fontWeight: 'bold'
  },
})

module.exports = TaskView