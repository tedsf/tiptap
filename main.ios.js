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
  ScrollView,
  Switch,
  DatePickerIOS,
  Navigator,
} from 'react-native'

import Error from './error'
import Registration from './registration'
import Active from './active'

class Main extends Component {
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
            statusBar={{ tintColor:  "white" , }}
        />
        
        <Switch 
          value={(this.state && this.state.switchValue) || false}
          onValueChange={(value) => {
            this.setState({switchValue: value})
          }}
          tintColor={ "rgba(230,230,230,1)" }
          onTintColor={ "rgba(68,219,94,1)" }
        />
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
          onPress={this.navigate.bind(this, "active")}>
          Active
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

export default Main