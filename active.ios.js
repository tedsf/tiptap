import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  TouchableHighlight
} from 'react-native';



class Active extends Component {
  navigate(routeName) {
    this.props.navigator.push({
      name: routeName
    })
  }

  render() {
    return (
      <View>
        <Text>
          Sooooooooooooooooooooorry.
        </Text>
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

export default Active