import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
  AlertIOS,
  Modal,
  AsyncStorage,
  DeviceEventEmitter,
} from 'react-native';
import { Button } from 'native-base';
import NavigationBar from 'react-native-navbar';
import Beacons from 'react-native-ibeacon';

var region = {
    identifier: 'TipTap',
    uuid: 'c617d2c3-25a7-45d3-96c5-51a9e3731862'
};

Beacons.requestWhenInUseAuthorization();
Beacons.startMonitoringForRegion(region);
Beacons.startRangingBeaconsInRegion(region);
Beacons.startUpdatingLocation();

class TipMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    }
  }

  onTip(num) {
    // TODO: This function should be called upon confirmation of a successful payment.  It is currently called too soon.
    fetch("https://tiptap-api.herokuapp.com/tips", {
      method: "POST",
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, body: JSON.stringify({tip: {amount: num, tippee_id: this.props.tippeeId, processed: true}})})
    .then((response) => response.json())
    .done();
  }

  render(){
    return (
      <View>
       <Modal
         animationType={ 'slide' }
         transparent={ true }
         visible={(this.state.modalVisible)}>
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
               "-Team TipTap"
              ));
            }}>
        <Image
          source={{uri:'https://developer.apple.com/library/safari/documentation/UserExperience/Conceptual/MobileHIG/Art/apple_pay_payment_sheet_2x.png'}}
          style={{width: 315, height:385 }}
        />
        </TouchableHighlight>
        </View>
       </Modal>
        <Button success block onPress={() => {
            this.setState({modalVisible: true})
            this.onTip(1)
          }}>
          $1
        </Button>
        <Button success block onPress={() => {
            this.setState({modalVisible: true})
            this.onTip(5)
          }}>
          $5
        </Button>
        <Button success block onPress={() => {
            this.setState({modalVisible: true})
            this.onTip(10)
          }}>
          $10
        </Button>
      </View>
    );
  }
}

class Tippee extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.props.firstName} {this.props.lastName}
        </Text>
        <Image
          style={{
            width:  300 ,
            height:  200 ,
          }}
          resizeMode={ "contain" }
          source={{uri:this.props.photoUrl}}
          />
      </View>
    );
  }
}

class TipableTippee extends Component {
  render(){
    return (
      <ScrollView>
        <Tippee
          firstName={ this.props.firstName }
          lastName={ this.props.lastName }
          photoUrl={ this.props.photoUrl }
        />

        <Text>{'\n'}</Text>

        {(this.props.tippeeId) ? (
          <TipMaker
            tippeeId={ this.props.tippeeId }
            paymentUrl={ this.props.paymentUrl }
          />
        ): null }

        <Text>{'\n'}{'\n'}</Text>
      </ScrollView>
    );
  }
}

class NearestTipableTippee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tippeeId: '',
      firstName: '',
      lastName: '',
      photoUrl: '',
      paymentUrl: '',
    }
  }

  componentDidMount () {
    DeviceEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        if (data.beacons[0]) {
          // TODO:  This app is currently hard coded to support the first beacon in the beacons array only.
          // TODO: This fetch presumes that minor value of the first beacon = the relevant tippee_id, which will break if any tippee has more than one beacon or the tippee_id is greater than 2 bytes.  This fetch should more explicitly request the tippee data associated with the beacon based on its major and minor values.
          fetch("https://tiptap-api.herokuapp.com/tippees/" + data.beacons[0].minor, {method: "GET"})
          .then((response) => response.json())
          .then((responseData) => {
            this.setState({tippeeId: responseData.id})
            this.setState({firstName: responseData.first_name})
            this.setState({lastName: responseData.last_name})
            this.setState({photoUrl: responseData.photo_url})
            this.setState({paymentUrl: responseData.payment_url})
            })
          .done()
        }
        else {
          this.setState({tippeeId: ''})
          this.setState({firstName: 'No users are in your area'})
          this.setState({lastName: ''})
          this.setState({photoUrl: 'http://i.imgur.com/CGB5Uv9.png'})
          this.setState({paymentUrl: ''})
        }
      }
    )
  }

  render(){
    return (
      <TipableTippee
        tippeeId={ this.state.tippeeId }
        firstName={ this.state.firstName }
        lastName={ this.state.lastName }
        photoUrl={ this.state.photoUrl }
        paymentUrl={ this.state.paymentUrl }
      />
    );
  }
}

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beacons: [],
    }
  }

  componentDidMount() {
    AsyncStorage.getItem(
      'beacons',
      (error, result) => {
        this.setState({beacons: JSON.parse(result)})
      }
    );
  }

  navigate(routeName) {
    this.props.navigator.push({
      name: routeName
    });
  }

  render() {
    return (
      <View>
        <NavigationBar
            title={{ title:  'TipTap!' , tintColor:  'black' , }}
            rightButton={{ title: 'Get Tips', tintColor: 'black', handler: this.navigate.bind(this,
              (this.state.beacons && this.state.beacons.length > 0) ? "active" : "registration"
            )}}
            style={{ backgroundColor:  "#D3D3D3" , }}
            statusBar={{ tintColor:  "white", hideAnimation: 'none' }}
        />

        <NearestTipableTippee />
      </View>
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
});

export default Main
