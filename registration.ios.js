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
      <View>
      <NavigationBar
          title={{ title:  'TipTap!' , tintColor:  'black' , }}
          leftButton={{ title: 'Back', tintColor: 'black', handler: this.navigate.bind(this, "main")} }
          style={{ backgroundColor:  "#D3D3D3" , }}
          statusBar={{ tintColor:  "white" , }}
      />

      <View style={{padding: 50}}>
        <TextInput
          style={{fontSize: 20, height: 50, borderColor: 'gray', borderWidth: 3, padding: 3, marginTop: 1}}
          placeholder=" First Name"
          onChangeText={(text) => this.setState({text})}
        />
        <TextInput
          style={{fontSize: 20, height: 50, borderColor: 'gray', borderWidth: 3, padding: 3, marginTop: 1}}
          placeholder=" Last Name"
          onChangeText={(text) => this.setState({text})}
         />
        <TextInput
           style={{fontSize: 20, height: 50, borderColor: 'gray', borderWidth: 3, padding: 3, marginTop: 1}}
           placeholder=" Photo URL"
           onChangeText={(text) => this.setState({text})}
          />
        <TextInput
            style={{fontSize: 20, height: 50, borderColor: 'gray', borderWidth: 3, padding: 3, marginTop: 1}}
            placeholder=" Payment URL"
            onChangeText={(text) => this.setState({text})}
        />

        <Button
          style={{fontSize: 25, color: 'green', borderColor: 'green', borderWidth: 7, borderRadius: 15, marginTop: 15, paddingTop: 15}}
          styleDisabled={{color: 'red'}}
          onPress={this.navigate.bind(this, "main")}>
          Submit Registration
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
