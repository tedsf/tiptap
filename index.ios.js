import React, { Component } from 'react';
import { DeviceEventEmitter } from 'react-native';
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
} from 'react-native'

import Main from './main'
import Error from './error'
import Registration from './registration'
import Active from './active'
import Search from './search'

var region = {
    identifier: 'Ted',
    uuid: 'B0702880-A295-A8AB-F734-031A98A512DE',
//     major: 9,
//     minor: 41
};

Beacons.requestWhenInUseAuthorization();

Beacons.startMonitoringForRegion(region);
Beacons.startRangingBeaconsInRegion(region);

Beacons.startUpdatingLocation();

var subscription = DeviceEventEmitter.addListener(
  'beaconsDidRange',
  (data) => {
    console.log(data);
    console.log(data.beacons);
//     console.log(data.beacons.first.minor)
    // data.region.identifier
    // data.region.uuid

    // data.beacons - Array of all beacons inside a region
    //  in the following structure:
    //    .uuid
    //    .major - The major version of a beacon
    //    .minor - The minor version of a beacon
    //    .rssi - Signal strength: RSSI value (between -100 and 0)
    //    .proximity - Proximity value, can either be "unknown", "far", "near" or "immediate"
    //    .accuracy - The accuracy of a beacon
  }
);

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
    if(route.name === 'error') {
      return <Error navigator={navigator} {...route.passProps} />
    }    
    if(route.name === 'active') {
      return <Active navigator={navigator} {...route.passProps} />
    }    
    if(route.name === 'search') {
      return <Search navigator={navigator} {...route.passProps} />
    }
    if(route.name === 'registration') {
      return <Registration navigator={navigator} {...route.passProps} />
    }
  }

//   navigate(routeName) {
//     this.props.navigator.push({
//       name: routeName
//       // passProps: {name: routeName},
//     })
//   }

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
