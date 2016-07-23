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

import Main from './main'

class Registration extends Component {
  navigate(routeName) {
    this.props.navigator.push({
      name: routeName
    });
  }
  
//   constructor(props) {
//     super(props);
//     this.state = {text: ''};
//   }

  render() {
    return (
      <View style={styles.form}>
        <TextInput
          style={{height: 30}}
          placeholder="Username"
          onChangeText={(text) => this.setState({text})}
        />
        <TextInput 
          secureTextEntry={true}
          style={{height: 30}}
          placeholder="Password"
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
  form: {
    padding: 50,
    flex: 1,
//     justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default Registration