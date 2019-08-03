import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, AsyncStorage, ImageBackground } from 'react-native';
import { AuthSession } from 'expo';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUp: {
    fontSize: 30
  }
});

export default class Logout extends Component {
  constructor(props) {
    super(props);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleSignOut() {
    AsyncStorage.removeItem('userData')
      .then(() => {
        console.log('inside handlesignout')
        this.props.navigation.navigate('Login')
      })
      .catch(err => console.log('error removing userdata from cache', err))
  }

  render() {
    return (
      <ImageBackground source={require('../images/background/background.jpg')} style={{ height: '100%', width: '100%' }}>
        <View style={styles.container}>
          <Text style={{ fontSize: 30, margin: 'auto' }}>Do You Want To Log Out?</Text>
          <Button title="Log Out" style={{ marginTop: 20 }} onPress={this.handleSignOut}></Button>
        </View>
      </ImageBackground>
    )
  }
}