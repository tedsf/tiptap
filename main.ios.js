import { Button } from 'native-base';

import NavigationBar from 'react-native-navbar'
import React, { Component } from 'react';
// import Button from 'react-native-button';
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
} from 'react-native'

import Error from './error'
import Registration from './registration'
import Active from './active'
import BeaconBroadcast from 'beaconbroadcast';


class Main extends Component {
    constructor(props) {
    super(props);
    this.state = BeaconBroadcast.stopAdvertisingBeacon();
  }
      
  activate(){
      BeaconBroadcast.startAdvertisingBeaconWithString('dccd49ae-49d4-4c40-9595-56e8d3a12c95', 'pawl')
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
            Ted Day-Fratto
          </Text>
        
          <Image 
            style={{
              width:  300 ,
              height:  200 ,
            }}
            resizeMode={ "contain" }
            source={{uri:'http://i.imgur.com/iuPt0UT.png'}}
            />
        </View>
        
        <Text>{'\n'}</Text>
        
        <Button bordered success block
//           style={{fontSize: 25, color: 'green'}}
          onPress={() => this._handlePress()}>
          $1
        </Button>  

        <Button bordered success block
//           style={{fontSize: 25, color: 'green'}}
//           styleDisabled={{color: 'red'}}
          onPress={() => this._handlePress()}>
          $5
        </Button>   
        
        <Button bordered success block
//           style={{fontSize: 25, color: 'green'}}
          onPress={() => this._handlePress()}>
          $10
        </Button>  
        
        <Button bordered success block
//           style={{fontSize: 25, color: 'green'}} 
          onPress={() => this._handlePress()}>
          $+
        </Button> 
        
        <Button large success block
          onPress={() => this._handlePress()}>
          Tip!
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