import React, { Component } from 'react';
import NavigationBar from 'react-native-navbar'
import Button from 'react-native-button';
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
} from 'react-native'

import Main from './main'
import Error from './error'
import Nouser from './nouser'

class Project extends Component {
  renderScene(route, navigator) {
    if (route.name === 'main') {
      return <Main navigator={navigator} {...route.passProps} />
    }
    else if(route.name == 'nouser') {
      return <Profile navigator={navigator} {...route.passProps}/>
    }
    else if (route.name === 'error') {
      return <Error navigator={navigator} {...route.passProps} />
    }

  }

  navigate(routeName) {
    this.props.navigator.push({
      name: routeName
      // passProps: {name: routeName},
    })
  }

  render() {

    return (

      <Navigator
        initialRoute={{name:'main'}}
        renderScene={this.renderScene.bind(this)}
      />
    );
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
