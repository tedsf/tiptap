import React, { Component } from 'react';
import NavigationBar from 'react-native-navbar'
import { Button } from 'native-base';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  SegmentedControlIOS,
  Image,
  Switch,
  DatePickerIOS,
  Navigator,
  TouchableHighlight,
  AlertIOS,
} from 'react-native'

class Registration extends Component {
    navigate(routeName) {
      this.props.navigator.push({
        name: routeName
      });
    }
  
    constructor(props) {
      super(props);
      this.state = { text: 'Teddy' };
    }
  
      _onPressButtonPOST() {
        fetch("https://tiptap-api.herokuapp.com/tippees", {
          method: "POST", 
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, body: JSON.stringify({tippee: {first_name: "Ted", last_name: "Smith", payment_url: 'none'}})})
        .then((response) => response.json())
        .done();
    }
  
  render() { 
    return (
      <View>
      <NavigationBar
          title={{ title:  'TipTap!' , tintColor:  'black' , }}
          leftButton={{ title: 'Back', tintColor: 'black', handler: this.navigate.bind(this, "main")} }
          style={{ backgroundColor:  "#D3D3D3" , }}
          statusBar={{ tintColor:  "white" , }}
      />

      <View style={{padding: 50}}>
        <TextInput
          style={{fontSize: 20, height: 50, borderColor: 'gray', borderWidth: 2, padding: 3, marginTop: 1}}
          placeholder=" First Name"
          ref="first_name"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <TextInput
          style={{fontSize: 20, height: 50, borderColor: 'gray', borderWidth: 2, padding: 3, marginTop: 1}}
          placeholder=" Last Name"
          onChangeText={(text) => this.setState({text})}
         />
        <TextInput
           style={{fontSize: 20, height: 50, borderColor: 'gray', borderWidth: 2, padding: 3, marginTop: 1}}
           placeholder=" Photo URL"
           onChangeText={(text) => this.setState({text})}
          />
        <TextInput 
            style={{fontSize: 20, height: 50, borderColor: 'gray', borderWidth: 2, padding: 3, marginTop: 1, marginBottom: 1}}
            placeholder=" Payment URL"
            onChangeText={(text) => this.setState({text})}
        />

        <Button large success block
          onPress={this._onPressButtonPOST}>
          Submit Registration
          {/*onPress={this.navigate.bind(this, "main")}*/}
        </Button>
        
      </View>
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

export default Registration
