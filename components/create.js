import React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Alert, Picker, Slider, AsyncStorage, ImageBackground, Dimensions } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Dropdown } from 'react-native-material-dropdown';
import { Input, Button, CheckBox } from 'react-native-elements';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 90,
    marginLeft: 15,
    marginRight: 15,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  create: {
    fontSize: 50,
    marginBottom: 5,
  },
  input: {
    height: 32,
    fontSize: 26,
    marginTop: 15,
    marginRight: 10,
    marginLeft: 8,
  },
  dropdown: {
    marginRight: 20,
    marginLeft: 18
  },
  button: {
    marginBottom: 15,
    marginRight: 15,
    marginLeft: 10
  }
});

export default class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      sport: '',
      month: '',
      day: '',
      time: '',
      street: '',
      city: '',
      state: '',
      zip: '',
      maxPlayersEnabled: false,
      minPlayersEnabled: false,
      maxPlayers: 0,
      minPlayers: 0,
      evenOnly: false,
      details: '',
    };
  }

  // componentDidMount(){
  //   AsyncStorage.getItem('userData')
  //   .then(data => console.log('grabbed data from async storage', JSON.parse(data)))
  //   .catch(err => console.log('error getting data from async storage'))
  // }

  render() {

    let sports = [{ value: 'Basketball' }, { value: 'Football' }, { value: 'Baseball' },
    { value: 'Soccer' }, { value: 'Hockey' }, { value: 'Tennis' }, { value: 'Water Polo' },
    { value: 'Volleyball' }, { value: 'Ultimate Frisbee' }, { value: 'Softball' },
    { value: 'Dodgeball' }, { value: 'Lacrosse' }, { value: 'Ping Pong' },
    { value: 'Pickle Ball' }, { value: 'Hacky Sack' }, { value: 'Laser Tag' },
    { value: 'Golf' }, { value: 'Mini Golf' }, { value: 'Rugby' }, { value: 'Badminton' }];

    let months = [{ value: 'January' }, { value: 'February' }, { value: 'March' },
    { value: 'April' }, { value: 'May' }, { value: 'June' },
    { value: 'July' }, { value: 'August' }, { value: 'September' },
    { value: 'October' }, { value: 'November' }, { value: 'December' }];

    let days = [{ value: '1st' }, { value: '2nd' }, { value: '3rd' }, { value: '4th' }, { value: '5th' }, { value: '6th' },
    { value: '7th' }, { value: '8th' }, { value: '9th' }, { value: '10th' }, { value: '11th' }, { value: '12th' },
    { value: '13th' }, { value: '14th' }, { value: '15th' }, { value: '16th' }, { value: '17th' }, { value: '18th' }, { value: '19th' },
    { value: '20th' }, { value: '21st' }, { value: '22nd' }, { value: '23rd' }, { value: '24th' }, { value: '25th' }, { value: '26th' },
    { value: '27th' }, { value: '28th' }, { value: '29th' }, { value: '30th' }, { value: '31st' }];

    let times = [{ value: '6:00AM' }, { value: '6:30AM' }, { value: '7:00AM' }, { value: '7:30AM' },
    { value: '8:00AM' }, { value: '8:30AM' }, { value: '9:00AM' }, { value: '9:30AM' },
    { value: '10:00AM' }, { value: '10:30AM' }, { value: '11:00AM' }, { value: '11:30AM' },
    { value: '12:00PM' }, { value: '12:30PM' }, { value: '1:00PM' }, { value: '1:30PM' },
    { value: '2:00PM' }, { value: '2:30PM' }, { value: '3:00PM' }, { value: '3:30PM' },
    { value: '4:00PM' }, { value: '4:30PM' }, { value: '5:00PM' }, { value: '5:30PM' },
    { value: '6:00PM' }, { value: '6:30PM' }, { value: '7:00PM' }, { value: '7:30PM' },
    { value: '8:00PM' }, { value: '8:30PM' }, { value: '9:00PM' }, { value: '9:30PM' },
    { value: '10:00PM' }, { value: '10:30PM' }, { value: '11:00PM' },]

    return (
      <ImageBackground source={require('../images/background/background.png')} style={{ height: '100%', width: '100%' }}>

        <View style={styles.container}>
          <ScrollView>
            <Text style={styles.create}>Create New Event</Text>
            <View style={styles.input}>
              <Input
                placeholder="Event Name"
                placeholderTextColor='black'
                onChangeText={(name) => this.setState({ name })}
              />
            </View>
            <Dropdown
              label='Sport'
              data={sports}
              fontSize={20}
              containerStyle={styles.dropdown}
              baseColor='black'
              textColor='black'
              onChangeText={(itemValue, itemIndex) => this.setState({ sport: itemValue })}
            />
            <Dropdown
              label='Month'
              data={months}
              fontSize={20}
              containerStyle={styles.dropdown}
              baseColor='black'
              textColor='black'
              onChangeText={(itemValue, itemIndex) => this.setState({ month: itemValue })}
            />
            <Dropdown
              label='Day'
              data={days}
              fontSize={20}
              containerStyle={styles.dropdown}
              baseColor='black'
              textColor='black'
              onChangeText={(itemValue, itemIndex) => this.setState({ day: itemValue })}
            />
            <Dropdown
              label='Start Time'
              data={times}
              fontSize={20}
              containerStyle={styles.dropdown}
              baseColor='black'
              textColor='black'
              onChangeText={(itemValue, itemIndex) => this.setState({ time: itemValue })}
            />
            <View style={styles.input}>
              <Input
                placeholder="Street Address"
                inputContainerStyle={styles.inputContainer}
                placeholderTextColor='black'
                onChangeText={(street) => this.setState({ street })}
              />
            </View>
            <View style={styles.input}>
              <Input
                placeholder="City"
                inputContainerStyle={styles.inputContainer}
                placeholderTextColor='black'
                onChangeText={(city) => this.setState({ city })}
              />
            </View>
            <View style={styles.input}>
              <Input
                placeholder="State"
                inputContainerStyle={styles.inputContainer}
                placeholderTextColor='black'
                onChangeText={(state) => this.setState({ state })}
              />
            </View>
            <View style={styles.input}>
              <Input
                placeholder="Zip Code"
                inputContainerStyle={styles.inputContainer}
                placeholderTextColor='black'
                onChangeText={(zip) => this.setState({ zip })}
              />
            </View>
            <View style={{ marginRight: 100, marginTop: 30 }}>
              <CheckBox
                title='Set Minimum # of Players'
                left
                containerStyle={{backgroundColor: 'rgba(255,255,255,.7)'}}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                uncheckedColor='black'
                checked={this.state.minPlayersEnabled}
                onPress={() => this.setState({ minPlayersEnabled: !this.state.minPlayersEnabled })}
              />
            </View>
            <Text style={{ marginLeft: 20, marginTop: 10, marginBottom: 10, fontSize: 16 }}>
              {this.state.minPlayersEnabled ? this.state.minPlayers + ' players minimum' : 'No minimum players'}
            </Text>
            <Slider
              disabled={this.state.minPlayersEnabled ? false : true}
              style={{ width: 200, height: 40, marginLeft: 10 }}
              minimumValue={2}
              maximumValue={50}
              step={1}
              value={2}
              minimumTrackTintColor="#000000"
              maximumTrackTintColor="#000000"
              onValueChange={value => this.setState({ minPlayers: value })}
            />
            <View style={{ marginRight: 100 }}>
              <CheckBox
                title='Set Maximum # of Players'
                left
                containerStyle={{backgroundColor: 'rgba(255,255,255,.7)'}}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                uncheckedColor='black'
                checked={this.state.maxPlayersEnabled}
                onPress={() => this.setState({ maxPlayersEnabled: !this.state.maxPlayersEnabled })}
              />
            </View>
            <Text style={{ marginLeft: 20, marginTop: 10, marginBottom: 10, fontSize: 16 }}>
              {this.state.maxPlayersEnabled ? this.state.maxPlayers + ' players maximum' : 'No maximum players'}
            </Text>
            <Slider
              disabled={this.state.maxPlayersEnabled ? false : true}
              style={{ width: 200, height: 40, marginLeft: 10 }}
              minimumValue={2}
              maximumValue={50}
              step={1}
              value={2}
              minimumTrackTintColor="#000000"
              maximumTrackTintColor="#000000"
              onValueChange={value => this.setState({ maxPlayers: value })}
            />
            <View style={{ marginRight: 100 }}>
              <CheckBox
                title='Allow even # of Players Only'
                left
                containerStyle={{backgroundColor: 'rgba(255,255,255,.7)'}}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                uncheckedColor='black'
                checked={this.state.evenOnly}
                onPress={() => this.setState({ evenOnly: !this.state.evenOnly })}
              />
            </View>
            <TextInput
              style={{
                minHeight: 150, height: 'auto', fontSize: 20, padding: 10,
                marginTop: 15, marginBottom: 15, marginRight: 15, marginLeft: 10, borderWidth: 1,
                backgroundColor: 'rgba(255,255,255,0.7)'
              }}
              multiline={true}
              numberOfLines={4}
              placeholder="Details"
              onChangeText={(details) => this.setState({ details })}
            />
            <Button
              style={styles.button}
              titleStyle={{color: '#004885'}}
              buttonStyle={{ backgroundColor: 'rgba(66, 164, 245,.9)', width: Dimensions.get('window').width - 55}}
              containerStyle={{ shadowColor: 'black', shadowRadius: 5, shadowOpacity: 1, shadowOffset: {width: 2, height: 2}}}
              onPress={() => {

                //Make sure inputs are present/valid
                if (this.state.name === '') {
                  Alert.alert('Please enter an event name');
                }
                else if (this.state.sport === '') {
                  Alert.alert('Please choose a sport');
                }
                else if (this.state.month === '') {
                  Alert.alert('Please choose a month');
                }
                else if (this.state.day === '') {
                  Alert.alert('Please choose a day');
                }
                else if (this.state.time === '') {
                  Alert.alert('Please choose a start time');
                }
                else if (this.state.street === '') {
                  Alert.alert('Please enter a street address');
                }
                else if (this.state.city === '') {
                  Alert.alert('Please enter a city');
                }
                else if (this.state.state === '') {
                  Alert.alert('Please enter a state');
                }
                else if (this.state.zip === '') {
                  Alert.alert('Please enter a zip');
                }
                else if (this.state.maxPlayersEnabled && this.state.maxPlayersEnabled && this.state.minPlayers > this.state.maxPlayers) {
                  Alert.alert('Maximum number of players cannot exceed minimum number of players');
                }

                else {
                  axios.post('http://localhost:3000/weplay/event', this.state)
                    .then(() => console.log('Success posting event to database!'))
                    .catch(err => console.log(err));

                  Alert.alert('Event successfully posted!');
                }
              }}
              title="Post Event"
            />
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}

//button for viewing state:

// <Button
//             style={styles.button}
//             onPress={() => {
//               Alert.alert(this.state);
//             }}
//             title="VIEW STATE"
//           />