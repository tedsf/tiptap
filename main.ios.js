import { Button } from 'native-base';
import NavigationBar from 'react-native-navbar'
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
  Modal,
  AsyncStorage,
  DeviceEventEmitter,
} from 'react-native'
import React, { Component } from 'react';
import Error from './error'
import Registration from './registration'
import Active from './active'
import BeaconBroadcast from 'beaconbroadcast';
import Beacons from 'react-native-ibeacon';

var region = {
    identifier: 'TipTap',
    uuid: 'c617d2c3-25a7-45d3-96c5-51a9e3731862'
};

Beacons.requestWhenInUseAuthorization();
Beacons.startMonitoringForRegion(region);
Beacons.startRangingBeaconsInRegion(region);
Beacons.startUpdatingLocation();

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'No users are in your area',
      lastName: '',
      photoUrl: 'http://i.imgur.com/CGB5Uv9.png',
      paymentUrl: '',
      modalVisible: false,
      beacons: [],
    }
  }

  componentWillMount () {
    DeviceEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        if (data.beacons[0]) {
          // TODO:  This app is currently hard coded to support the first beacon in the beacons array only.
          // TODO: This fetch presumes that minor value of the first beacon = the relevant tippee_id, which will break if any tippee has more than one beacon or the tippee_id is greater than 2 bytes.  This fetch should more explicitly request the tippee data associated with the beacon based on its major and minor values.
          fetch("https://tiptap-api.herokuapp.com/tippees/" + data.beacons[0].minor, {method: "GET"})
          .then((response) => response.json())
          .then((responseData) => {
            this.setState({firstName: responseData.first_name})
            this.setState({lastName: responseData.last_name})
            this.setState({photoUrl: responseData.photo_url})
            this.setState({paymentUrl: responseData.payment_url})
            })
          .done()
        }
        else {
          this.setState({firstName: 'No users are in your area'})
          this.setState({lastName: ''})
          this.setState({photoUrl: 'http://i.imgur.com/CGB5Uv9.png'})
          this.setState({paymentUrl: ''})
        }
      }
    )
    AsyncStorage.getItem(
      'beacons',
      (error, result) => {
        this.setState({beacons: JSON.parse(result)})
      }
    )
  }

  activate(){
    // TODO:  BeaconBroadcast does not support configuration of a beacon's major and minor values.  They have been hard-coded in node_modules/beaconbroadcast/BeaconBroadcast.m to major:0, minor:1.  The system needs to broadcast the major and minor values stored in beacons.
    // TODO:  This app is currently hard coded to support the first beacon in the beacons array only.
    BeaconBroadcast.startAdvertisingBeaconWithString(this.state.beacons[0].uuid, 'TipTap')
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

        <View>
         <Modal
           animationType={ 'slide' }
           transparent={ true }
           visible={(this.state && this.state.modalVisible)}>
           <View
             style={{
               flex: 1,
               backgroundColor: '#f5fcff',
               alignItems: 'center',
               justifyContent: 'center',
               padding: 20,
             }}>

            <TouchableHighlight onPress={
              () => {
               this.setState({modalVisible: false});
               (AlertIOS.alert(
                 "Thanks for your tip!",
               "- Team TipTap"
                ));
            }}>
               <Image
               source={{uri:'https://developer.apple.com/library/safari/documentation/UserExperience/Conceptual/MobileHIG/Art/apple_pay_payment_sheet_2x.png'}}
               style={{width: 315, height:385 }}
               />
             </TouchableHighlight>
           </View>
         </Modal>
       </View>

        <Button success block onPress={() => this.setState({modalVisible: true}) }>
          $1
        </Button>

        <Button success block onPress={() => this.setState({modalVisible: true})}>
          $5
        </Button>

        <Button success block onPress={() => this.setState({modalVisible: true})}>
          $10
        </Button>

        {(this.state.beacons && this.state.beacons.length > 0) ? (
          <View>
            <Button large bordered success block
              onPress={() => this.activate()}>
              Activate
            </Button>

            <Button large bordered success block
              onPress={() => this.deactivate()}>
              Deactivate
            </Button>
          </View>
        ): null }

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
