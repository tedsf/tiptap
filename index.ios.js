import NavigationBar from 'react-native-navbar'
import React, { Component } from 'react';
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
} from 'react-native'

class Project extends Component {
  render() {
    return (
      <View>
        <NavigationBar
            title={{ title:  'TipTap!' , tintColor:  'black' , }}
            rightButton={{ title: 'Forward', tintColor: 'black' }}
            leftButton={{ title: 'Forward', tintColor: 'black' }}
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
          Nobody in your area is looking for tips!
        </Text>
        
        <Image
          style={{
            width:  300 ,
            height:  200 ,
          }}
          resizeMode={ "contain" }
          source={{uri:'http://i.imgur.com/iuPt0UT.png'}}
        />
        
        <Button 
          style={{fontSize: 25, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={() => this._handlePress()}>
          $1
        </Button>        
        <Button 
          style={{fontSize: 25, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={() => this._handlePress()}>
          $5
        </Button>        
        <Button 
          style={{fontSize: 25, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={() => this._handlePress()}>
          $5
        </Button>        
        <Button 
          style={{fontSize: 25, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={() => this._handlePress()}>
          $+
        </Button>        
        <Button style={{flex: 1, flexDirection: 'row'}}
          style={{fontSize: 25, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={() => this._handlePress()}>
          Tip!
        </Button>
    
      </View>
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