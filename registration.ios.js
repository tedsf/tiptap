import React, { Component } from 'react';
import NavigationBar from 'react-native-navbar'
import Button from 'react-native-button';
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
} from 'react-native'

class Registration extends Component {
  navigate(routeName) {
    this.props.navigator.push({
      name: routeName
    });
  }

  render() {
    return (
      <View style={{padding: 50}}>
        <TextInput
          style={{height: 30}}
          placeholder="First Name"
          onChangeText={(text) => this.setState({text})}
        />
        <TextInput
          style={{height: 30}}
          placeholder="Last Name"
          onChangeText={(text) => this.setState({text})}
         />
        <TextInput
           secureTextEntry={true}
           style={{height: 30}}
           placeholder="Photo URL"
           onChangeText={(text) => this.setState({text})}
          />
        <TextInput
            secureTextEntry={true}
            style={{height: 30}}
            placeholder="Payment URL"
            onChangeText={(text) => this.setState({text})}
        />

        <Button
          style={{fontSize: 25, color: 'green'}}
          styleDisabled={{color: 'red'}}
          onPress={this.navigate.bind(this, "main")}>
          Submit Registration
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

export default Registration
