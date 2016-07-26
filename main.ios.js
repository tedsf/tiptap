import { Button } from 'native-base';

import NavigationBar from 'react-native-navbar'
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  SegmentedControlIOS,
  TouchableHighlight,
  Image,
  Switch,
  ScrollView,
  DatePickerIOS,
  Navigator,
  AlertIOS,

} from 'react-native'

import Error from './error'
import Registration from './registration'
import Active from './active'
import BeaconBroadcast from 'beaconbroadcast';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'No users are in your area',
      lastName: '',
      photoUrl: 'http://i.imgur.com/CGB5Uv9.png',
      paymentUrl: ''
    }
  }

  _onPressButtonGET() {
    var that = this;
    fetch("https://tiptap-api.herokuapp.com/tippees", {method: "GET"})
    .then((response) => response.json())
    .then((responseData) => {
      that.setState({firstName: responseData[0].first_name})
      that.setState({lastName: responseData[0].last_name})
      that.setState({paymentUrl: responseData[0].payment_url})
      that.setState({photoUrl: responseData[0].photo_url})

        // AlertIOS.alert(
        //     "GET Response",
        //     "Search Query -> " + first_name + " " + last_name
        // )
    })
    .done();
  }
  

  activate(){
      BeaconBroadcast.startAdvertisingBeaconWithString('b075ec89-2d25-4e38-8182-d5a07cea17a0', 'ben')
  }

  deactivate(){
    BeaconBroadcast.stopAdvertisingBeacon()
  }

    navigate(routeName) {
    this.props.navigator.push({
      name: routeName
    });
  }
  render() {
    return (
      <ScrollView>
        <NavigationBar
            title={{ title:  'TipTap!' , tintColor:  'black' , }}
            rightButton={{ title: 'Get Tips', tintColor: 'black', handler: this.navigate.bind(this, "search")}}
            leftButton={{ title: 'Register', tintColor: 'black', handler: this.navigate.bind(this, "registration")} }
            style={{ backgroundColor:  "#D3D3D3" , }}
            statusBar={{ tintColor:  "white", hideAnimation: 'none' }}
        />

        <Switch
          value={(this.state && this.state.switchValue) || false}
          onValueChange={(value) => {
            this.setState({switchValue: value})
          }}
          tintColor={ "rgba(230,230,230,1)" }
          onTintColor={ "rgba(68,219,94,1)" }
        />
        <Button bordered success block onPress={this._onPressButtonGET.bind(this)} style={styles.button}>
          SEARCH
        </Button>

        

        
        {/*<Text>{'\n'}{'\n'}</Text>
        <Text style={styles.welcome}>
          Nobody in your area is looking for tips!
        </Text>
        <View style={styles.container}>
          <Image style={styles.image}
            resizeMode={ "contain" }
            source={{uri:'http://i.imgur.com/CGB5Uv9.png'}}
            />
        </View>*/}

        <View style={styles.container}>
          <Text style={styles.welcome}>
           {this.state.firstName} {this.state.lastName}
          </Text>

          <Image
            style={{
              width:  300 ,
              height:  200 ,
            }}
            resizeMode={ "contain" }
            source={{uri:this.state.photoUrl}}
            />
        </View>

        <Text>{'\n'}</Text>

        <Button success block
          onPress={() => (AlertIOS.alert(
            "You tipped $1",
            "Thanks!"))}>
          $1
        </Button>

        <Button success block
          onPress={() => (AlertIOS.alert(
            "You tipped $5",
            "Thanks!"))}>
          $5
        </Button>

        <Button success block
          onPress={() => (AlertIOS.alert(
            "You tipped $10",
            "Thanks!"))}>
          $10
        </Button>

        <Button large bordered success block
         onPress={() => this.activate()}>
          Activate
        </Button>
        <Button large bordered success block
        onPress={() => this.deactivate()}>
          Deactivate
        </Button>

        <Text>{'\n'}{'\n'}</Text>
        <Text>{'\n'}{'\n'}</Text>
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  image: {
    width:  150 ,
    height:  100 ,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default Main
