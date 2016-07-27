import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  TouchableHighlight,
  Image
} from 'react-native';
import NavigationBar from 'react-native-navbar'

class Active extends Component {
  navigate(routeName) {
    this.props.navigator.push({
      name: routeName
      // passProps: {name: routeName},
    })
  }

  render() {
    return (
      <View>
        <NavigationBar
            title={{ title:  'TipTap!' , tintColor:  'black' , }}
            leftButton={{ title: 'Off', tintColor: 'black', handler: this.navigate.bind(this, "main")} }
            style={{ backgroundColor:  "#D3D3D3" , }}
            statusBar={{ tintColor:  "white" , }}
        />
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Looking for tips!
          </Text>

          <Image
            style={{
              width:  300 ,
              height:  200 ,
            }}
            resizeMode={ "contain" }
            source={{uri:'http://i.imgur.com/jVXo2FL.png'}}
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: 'white',
    marginTop: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  title: {
    marginTop: 250,
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  bButton: {
    backgroundColor: '#007399',
    color: 'white',
    textAlign: 'left',
    marginTop: 0,
    fontSize: 40,
    width: 55,
    fontWeight: 'bold',
  },
  nav: {
    justifyContent: 'flex-start',
    width: 378,
    height: 50,
    backgroundColor: '#007399',
    flexDirection: 'row',
  },
  navtitle: {
    fontFamily: 'Helvetica',
    marginTop: 15,
    marginLeft: 74,
    fontSize: 20,
    color: 'white',
    letterSpacing: 14,
  },
    title: {
    marginTop: 250,
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  bButton: {
    backgroundColor: '#007399',
    color: 'white',
    textAlign: 'left',
    marginTop: 0,
    fontSize: 40,
    width: 55,
    fontWeight: 'bold',
  },
  nav: {
    justifyContent: 'flex-start',
    width: 378,
    height: 50,
    backgroundColor: '#007399',
    flexDirection: 'row',
  },
  navtitle: {
    fontFamily: 'Helvetica',
    marginTop: 15,
    marginLeft: 74,
    fontSize: 20,
    color: 'white',
    letterSpacing: 14,
  },
});

export default Active;
