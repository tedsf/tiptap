import React, { Component } from 'react';
import NavigationBar from 'react-native-navbar'
import { Button } from 'native-base';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  ReactNative,
  findNodeHandle,
  SegmentedControlIOS,
  Image,
  Switch,
  DatePickerIOS,
  Navigator,
  TouchableHighlight,
  AlertIOS,
  AsyncStorage,
} from 'react-native'

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {first_name: '', last_name: '', photo_url: '', payment_url: ''};
  }

  navigate(routeName) {
    this.props.navigator.push({
      name: routeName
    });
  }

  inputFocused(refName) {
    setTimeout(() => {
      let scrollResponder = this.refs.scrollView.getScrollResponder();
      scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
        findNodeHandle(this.refs[refName]),
        110, //additionalOffset
        true
      );
    }, 50);
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

        <ScrollView style={{padding: 50}} ref='scrollView'>
        <TextInput
         ref='FirstName'
         style={{fontSize: 20, height: 50, borderColor: 'gray', borderWidth: 2, padding: 3, marginTop: 1}}
         placeholder=" First Name"
         onChangeText={(text) => this.setState({first_name: text})}
         onSubmitEditing={(event) => {
           this.refs.LastName.focus();
         }}
       />
       <TextInput
         ref='LastName'
         style={{fontSize: 20, height: 50, borderColor: 'gray', borderWidth: 2, padding: 3, marginTop: 1}}
         placeholder=" Last Name"
         onChangeText={(text) => this.setState({last_name: text})}
         onSubmitEditing={(event) => {
           this.refs.PhotoUrl.focus();
         }}
         onFocus={this.inputFocused.bind(this, 'LastName')}
        />
       <TextInput
         ref='PhotoUrl'
         style={{fontSize: 20, height: 50, borderColor: 'gray', borderWidth: 2, padding: 3, marginTop: 1}}
         placeholder=" Photo URL"
         onChangeText={(text) => this.setState({photo_url: text})}
         onSubmitEditing={(event) => {
           this.refs.PaymentUrl.focus();
         }}
         onFocus={this.inputFocused.bind(this, 'PhotoUrl')}
         />
       <TextInput
         ref='PaymentUrl'
         style={{fontSize: 20, height: 50, borderColor: 'gray', borderWidth: 2, padding: 3, marginTop: 1, marginBottom: 1}}
         placeholder=" Payment URL"
         onChangeText={(text) => this.setState({payment_url: text})}
         onFocus={this.inputFocused.bind(this, 'PaymentUrl')}
       />

          <Button large success block
            onPress={this.registerTippee.bind(this)}>
            Submit Registration
          </Button>

        </ScrollView>
      </View>
    );
  }

  registerTippee() {
    var that = this
    fetch("https://tiptap-api.herokuapp.com/tippees", {
      method: "POST",
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }, body: JSON.stringify({tippee: that.state})})
    .then((response) => response.json())
    .then((responseJson) => {
      AsyncStorage.setItem(
        'beacons',
        JSON.stringify(responseJson.beacons),
        () => that.navigate("active")
      )
    })
    .done();
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
