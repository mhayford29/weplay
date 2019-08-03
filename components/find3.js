import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Picker, TouchableOpacity, Modal, AsyncStorage, ImageBackground } from 'react-native';
import axios from 'axios';
import { Input, Button } from 'react-native-elements';

const months = { 1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July', 8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December' }

const pictures = {
  'Basketball': require('../images/background/basketball.jpg'),
  'Football': require('../images/background/football.jpg'),
  'Baseball': require('../images/background/baseball.jpg'),
  'Soccer': require('../images/background/soccer.jpg'),
  'Hockey': require('../images/background/hockey.jpg'),
  'Tennis': require('../images/background/tennis.jpeg'),
  'Water Polo': require('../images/background/waterpolo.jpg'),
  'Volleyball': require('../images/background/volleyball.jpg'),
  'Ultimate Frisbee': require('../images/background/ultimatefrisbee.jpg'),
  'Softball': require('../images/background/softball.jpg'),
  'Dodgeball': require('../images/background/dodgeball.jpg'),
  'Lacrosse': require('../images/background/lacrosse.jpg'),
  'Ping Pong': require('../images/background/pingpong.jpg'),
  'Pickle Ball': require('../images/background/pickleball.jpeg'),
  'Hacky Sack': require('../images/background/hackysack.jpg'),
  'Laser Tag': require('../images/background/lasertag.jpg'),
  'Golf': require('../images/background/golf.jpg'),
  'Mini Golf': require('../images/background/minigolf.jpg'),
  'Rugby': require('../images/background/rugby.jpg'),
  'Badminton': require('../images/background/badminton.jpg')
}

export default class Find3 extends Component {
  constructor(props) {
    super(props);
    let { item } = this.props.navigation.state.params;
    this.state = {
      modalVisible: false,
      members: [],
      owner: '',
      profile: {},
      event: item
    }
    let newMembers = [];
    axios.get('http://localhost:3000/weplay/members', { params: { id: item.owner } })
      .then(profile => {
        this.setState({ owner: profile.data.name })
      })
    for (var i = 0; i < item.members.length; i++) {
      //fill members from item ids
      // console.log('Currently on: ', item.members[i]);
      axios.get('http://localhost:3000/weplay/members', { params: { id: item.members[i] } })
        .then(profile => {
          newMembers.push(profile.data.name);
          if (newMembers.length === item.members.length) {
            this.setState({ members: newMembers });
            // console.log('MEMBERS UPDATED')
          }
        })
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('userData')
      .then(data => {
        // console.log('grabbed data from async storage', JSON.parse(data));
        this.setState({ profile: JSON.parse(data) })
      })
      .catch(err => console.log('error getting data from async storage'))
  }

  render() {
    let { sport, radius, month, day, item, zip } = this.props.navigation.state.params;
    // console.log(sport, radius, month, day, item);


    return (

      <ImageBackground source={pictures[item.sport]} style={styles.backgroundImage}>
        <View style={styles.outer}>
          <View style={[styles.body, { flex: .5 }]}>
            <Text style={{ fontSize: 40, top: 30, fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>Find an Event</Text>
          </View>
          <View style={[styles.body, { flex: .3, marginBottom: 20 }]}>
            <Text style={{ fontSize: 13, top: 30, fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>Searching for {sport} Events on {month}/{day} in area code {zip}</Text>
          </View>

          <View style={[styles.body, styles.rows, { flex: 4.7, alignItems: 'center' }]}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>{item.name}</Text>
            <Text style={{ fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>{sport}</Text>
            <Text style={{ fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>{item.time} on {months[JSON.parse(item.month)]} {item.day}</Text>
            {/* <Text>In Area code: {item.zip}</Text> */}
            <Text style={{ fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>{item.street}</Text>
            <Text style={{ fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>{item.city}, {item.state} {item.zip}</Text>

            {item.maxPlayersEnabled ? <Button style={{ borderRadius: 5, backgroundColor: 'rgba(0, 0, 0, .7)'}} type='outline' title={item.currentPlayers + '/' + item.maxPlayers + ' players'} onPress={() => {
              this.setState({ modalVisible: !this.state.modalVisible })
            }}></Button> : <Button style={{ borderRadius: 5, backgroundColor: 'rgba(0, 0, 0, .7)'}} type='outline' title={'Current Players: ' + item.currentPlayers} onPress={() => {
              this.setState({ modalVisible: !this.state.modalVisible })
            }}></Button>}

            {item.minPlayersEnabled ? <Text style={{ fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>Minimum players: {item.minPlayers}</Text> : null}
            {item.evenOnly ? <Text style={{ fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>Even Number Players Only</Text> : null}
            <Text style={{ margin: 20, fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>{item.details}</Text>

            <Button 
            title="Join Game"
            titleStyle={{color: '#004885'}}
            buttonStyle={{ backgroundColor: 'rgba(66, 164, 245,.9)', width: 200}}
            containerStyle={{ shadowColor: 'black', shadowRadius: 5, shadowOpacity: 1, shadowOffset: {width: 2, height: 2}}}
            onPress={() => {
              console.log('Game added');
              console.log(JSON.stringify(this.state.event))
              //POST REQUEST TO PROFILE DB;
              const { name, phone, heightFeet, heightInches, weight, age, favoriteSports1, favoriteSports2, favoriteSports3, events, facebookID } = this.state.profile;
              events.push(this.state.event.id);
              axios.put('http://localhost:3000/weplay/profile', { name, phone, heightFeet, heightInches, weight, age, favoriteSports1, favoriteSports2, favoriteSports3, events, facebookID })
                .then(() => {
                  this.props.navigation.navigate('Account');
                })
                .catch(err => {
                  console.log(err);
                })

            }}>

            </Button>


          </View>
          <View style={styles.footer}>

            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <ImageBackground source={pictures[item.sport]} style={styles.backgroundImage}>
                <View style={{ marginTop: 22, top: 20 }}>
                  <Button title='Return' style={{ left: 0 }}
                    onPress={() => {
                      this.setState({ modalVisible: !this.state.modalVisible });
                    }}>
                  </Button>
                  <View style={{ alignItems: 'center' }}>
                    <Text style={{ top: 30, fontSize: 40, fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5  }}>Current Players: </Text>
                    <View style={{ top: 50, alignItems: 'center' }}>
                      {this.state.members.map((item, index) => {
                        return (
                          <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>{item}</Text>
                        )
                      })}
                    </View>
                    <View style={{ top: 200, alignItems: 'center' }}>
                      <Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5  }}>Event Created By: </Text>
                      <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>{this.state.owner}</Text>
                    </View>
                  </View>


                </View>
              </ImageBackground>
            </Modal>

          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  outer: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    top: 40,
    // borderWidth: 5,
    // justifyContent: 'space-between',
  },
  body: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'red',
    alignItems: 'center'
  },
  footer: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'yellow'
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rows: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    alignItems: 'center'
  },


  column: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'black',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'black',
    alignItems: 'center'
  },
  input: {
    height: 40,
    width: 100,
    fontSize: 28,
    top: -10,
    margin: 20
  },
  button: {
    display: 'flex',
    height: 70,
    width: 260,
    borderColor: 'darkgreen',
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2AC062',
    shadowColor: '#2AC062',
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20,
    margin: 35
  },
  buttonSmall: {
    display: 'flex',
    height: 50,
    width: 200,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    shadowColor: 'blue',
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20,
  }
});
//  let pic = { uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' };
//<Image source={pic} style={{ width: 193, height: 110 }} />


