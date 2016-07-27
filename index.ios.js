import React, { Component } from 'react';
import NavigationBar from 'react-native-navbar'
import Button from 'react-native-button';
import Beacons from 'react-native-ibeacon';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  SegmentedControlIOS,
  Image,
  Switch,
  DatePickerIOS,
  Navigator,
  AsyncStorage,
} from 'react-native'

import Main from './main'
import Registration from './registration'
import Active from './active'

class Project extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{name:'main'}}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }

  renderScene(route, navigator) {
    if(route.name === 'main') {
      return <Main navigator={navigator} {...route.passProps} />
    }
    if(route.name === 'active') {
      return <Active navigator={navigator} {...route.passProps} />
    }
    if(route.name === 'registration') {
      return <Registration navigator={navigator} {...route.passProps} />
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Project', () => Project);
