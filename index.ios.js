import React, { Component } from 'react';
import { AppRegistry, Navigator } from 'react-native';

import Main from './main';
import Registration from './registration';
import Active from './active';

class TipTap extends Component {
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
    else if(route.name === 'active') {
      return <Active navigator={navigator} {...route.passProps} />
    }
    else if(route.name === 'registration') {
      return <Registration navigator={navigator} {...route.passProps} />
    }
  }
}

AppRegistry.registerComponent('Project', () => TipTap);
