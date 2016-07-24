import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  Navigator,
  TouchableHighlight
} from 'react-native';
import NavigationBar from 'react-native-navbar'

class Search extends Component {
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
            rightButton={{ title: 'Get Tips', tintColor: 'black', handler: this.navigate.bind(this, "search")}}
            leftButton={{ title: 'Back', tintColor: 'black', handler: this.navigate.bind(this, "registration")} }
            style={{ backgroundColor:  "#D3D3D3" , }}
            statusBar={{ tintColor:  "white" , }}
        />
          <Text style={styles.title}>
            Searching!
          </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    backgroundColor: '#B8D8D8',
    marginTop: 24,
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

export default Search;
