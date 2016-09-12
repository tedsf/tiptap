import React, { Component } from 'react';
import {
  TextInput,
  View,
  ScrollView,
  findNodeHandle,
  AlertIOS,
  AsyncStorage,
} from 'react-native';
import { Button } from 'native-base';
import NavigationBar from 'react-native-navbar';

class TippeeMaker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      photo_url: '',
      payment_url: '',
      loading: false};
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

  registerTippee() {
    if (this.state.first_name && this.state.last_name && this.state.payment_url)
      {
      var that = this
      this.setState({loading: true})
      fetch("https://tiptap-api.herokuapp.com/tippees", {
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, body: JSON.stringify({tippee: that.state})})
      .then((response) => response.json())
      .then((responseJson) => {
        that.setState({loading: false})
        AsyncStorage.setItem(
          'beacons',
          JSON.stringify(responseJson.beacons),
          that.props.handler
        );
      })
      .done();
    } else {
      AlertIOS.alert(
        "Missing required fields!",
        "- Team TipTap")
    }
  }

  render(){
    return(
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

        {(!this.state.loading) ? (
          <Button large success block
            onPress={this.registerTippee.bind(this)}
            visible={(!this.state.loading)}>
            Submit Registration
          </Button>
        ) : (
          <Button large success block transparent visible={(this.state.loading)}>
            Registering...
          </Button>
        )}
      </ScrollView>
    );
  }
}

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
        <TippeeMaker
          handler={ this.navigate.bind(this, "active") }
        />
      </View>
    );
  }
}

export default Registration
