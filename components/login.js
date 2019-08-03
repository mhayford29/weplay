import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, AsyncStorage, ImageBackground } from 'react-native';
import { Google } from 'expo';
import { CLIENT_ID } from '../config.js';
import { Button } from 'react-native-elements';
import Axios from 'axios';

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

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      isSignedIn: false
    }
    this.saveItem = this.saveItem.bind(this);
    this.handleGoogleStrategy = this.handleGoogleStrategy.bind(this);
  }

  async saveItem(item, selectedValue) {
    try {
      await AsyncStorage.setItem(item, selectedValue);
    } catch (error) {
      console.error('AsyncStorage error: ' + error.message);
    }
  }

  handleGoogleStrategy = async () => {
    const { type, accessToken, user } = await Google.logInAsync({
      iosClientId: CLIENT_ID
    });

    if (type === 'success') {
      let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      Axios.get('http://localhost:3000/weplay/profile', {
        params: {
          googleID: user.id,
          name: user.name
        }
      })
      .then(({ data }) => {
        const userData = JSON.stringify(data[0]);
        this.saveItem('userData', userData);
        this.setState({ isSignedIn: true }, () => {
          this.props.navigation.navigate('Account', {isSignedIn: this.state.isSignedIn})
        }) 
      })
      .catch(err => console.log(err, 'error in get'))
    }
  }

  render() {
    return (
      <ImageBackground source={require('../images/background/background.jpg')} style={{height: '100%', width: '100%'}}>
        <View style={styles.container}>
          <Text style={{ fontSize: 50, fontStyle: 'italic', fontWeight: 'bold' }}>WePlay</Text>  
          <View style={{ marginTop: 20 }}>
            <Button style={{ backgroundColor: 'red' }} title="Sign In With Google" onPress={this.handleGoogleStrategy} />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

