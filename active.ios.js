import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import BeaconBroadcast from 'beaconbroadcast';

class BeaconBroadcaster extends Component {
  componentDidMount() {
    AsyncStorage.getItem(
      'beacons',
      (error, result) => {
        // TODO:  BeaconBroadcast does not support configuration of a beacon's major and minor values.  They have been hard-coded in node_modules/beaconbroadcast/BeaconBroadcast.m to major:0, minor:1.  The system needs to broadcast the major and minor values stored in beacons.
        // TODO:  This app is currently hard coded to support the first beacon in the beacons array only.
        BeaconBroadcast.startAdvertisingBeaconWithString(JSON.parse(result)[0].uuid, 'TipTap')
      }
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Looking for tips!
        </Text>

        <Image
          style={{
            width:  300 ,
            height:  200 ,
          }}
          resizeMode={ "contain" }
          source={{uri:'http://i.imgur.com/jVXo2FL.png'}}
          />
      </View>
    );
  }
}

class Active extends Component {
  navigate(routeName) {
    BeaconBroadcast.stopAdvertisingBeacon()
    this.props.navigator.push({
      name: routeName
    });
  }

  render() {
    return (
      <View>
        <NavigationBar
            title={{ title:  'TipTap!' , tintColor:  'black' , }}
            leftButton={{ title: 'Off', tintColor: 'black', handler: this.navigate.bind(this, "main")} }
            style={{ backgroundColor:  "#D3D3D3" , }}
            statusBar={{ tintColor:  "white" , }}
        />
        <BeaconBroadcaster
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'white',
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

export default Active;
