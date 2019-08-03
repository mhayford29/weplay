import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Picker, Button, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

const pictures = {
  'Basketball': require('../images/basketball.jpg'),
  'Football': require('../images/football.jpg'),
  'Baseball': require('../images/baseball.jpg'),
  'Soccer': require('../images/soccer.jpg'),
  'Hockey': require('../images/hockey.jpg'),
  'Tennis': require('../images/tennis.jpg'),
  'Water Polo': require('../images/waterpolo.jpg'),
  'Volleyball': require('../images/volleyball.jpg'),
  'Ultimate Frisbee': require('../images/ultimatefrisbee.jpg'),
  'Softball': require('../images/softball.jpg'),
  'Dodgeball': require('../images/dodgeball.jpg'),
  'Lacrosse': require('../images/lacrosse.jpg'),
  'Ping Pong': require('../images/pingpong.jpg'),
  'Pickle Ball': require('../images/pickleball.jpg'),
  'Hacky Sack': require('../images/hackysack.jpg'),
  'Laser Tag': require('../images/lasertag.jpg'),
  'Golf': require('../images/golf.jpg'),
  'Mini Golf': require('../images/minigolf.jpg'),
  'Rugby': require('../images/rugby.jpg'),
  'Badminton': require('../images/badminton.jpg')
}

export default class Find2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sport: 'Ping Pong',
      radius: '1',
      month: '01',
      day: '01'
    }
  }
  render() {
    let { sport, zip, month, day, query, monthEnd, dayEnd } = this.props.navigation.state.params;
    console.log(sport)
    console.log('query length: ', query.length)
    return (
      <ImageBackground source={require('../images/background/background.jpg')} style={{ height: '100%', width: '100%' }}>

        <View style={styles.outer}>
          <View style={[styles.body, { flex: .4 }]}>
            <Text style={{ fontSize: 40, top: 0 }}>Find an Event</Text>
          </View>
          <View style={[styles.body, { flex: .2, marginBottom: 20 }]}>
            {monthEnd ?
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 15 }}>Searching for {sport} Events Between {month}/{day} and {monthEnd}/{dayEnd}</Text>
                <Text style={{ fontSize: 15 }}>in zip code: {zip}</Text>
              </View>
              :
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 15 }}>Searching for {sport} On {month}/{day}</Text>
                <Text style={{ fontSize: 15 }}>in zip code: {zip}</Text>
              </View>
            }
          </View>
          <View style={[styles.body, styles.rows, { flex: 4.7, alignItems: 'center' }]}>
            {query.length === 0 ? <Text style={{ top: 100, fontSize: 20 }}>No Results Found</Text> : null}
            <ScrollView>
              {query.map((item, index) => {
                //gather members and add to list
                return (

                  <TouchableOpacity key={index} style={styles.event} onPress={() => {
                    this.props.navigation.navigate('Find3',
                      { sport, zip, month, day, item })
                  }}>
                    <ImageBackground source={pictures[item.sport]} style={styles.backgroundImage}>
                      <Text style={{ fontSize: 20, margin: 5, fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>{item.name}</Text>
                      <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>{item.currentPlayers}/{item.maxPlayers} Players | Time: {item.time}</Text>
                      <Text style={{ fontSize: 12, margin: 10, fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>{item.details.split('.')[0] + '.'}</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                )
              })}
            </ScrollView>

          </View>
          <View style={styles.footer}>
            <Text></Text>
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
    // borderColor: 'black'
    // justifyContent: 'space-between',
  },
  body: {
    flex: 1,
    // borderWidth: 2,
    alignItems: 'center'
  },
  footer: {
    flex: .4,
    // borderWidth: 2,
    // borderColor: 'yellow'
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rows: {
    flexDirection: 'column',
    // justifyContent: 'space-around',
    alignItems: 'stretch'
  },
  event: {
    height: 100,
    borderWidth: 2,
    borderColor: 'black',
    alignItems: 'center',
    margin: 3,
    width: Dimensions.get('window').width - 10,
    borderRadius: 5,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
    alignItems: 'center',
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
    // top: 30,
    margin: 20
  },
  button: {
    display: 'flex',
    height: 70,
    width: 260,
    borderColor: 'darkgreen',
    borderWidth: 2,
    borderRadius: 5,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2AC062',
    shadowColor: '#2AC062',
    shadowOpacity: 0.4,
    shadowOffset: { height: 10, width: 0 },
    shadowRadius: 20,
    margin: 15
  },
  buttonSmall: {
    display: 'flex',
    height: 50,
    width: 200,
    borderRadius: 5,
    top: 20,
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


/*<TouchableOpacity style={styles.event} onPress={() => {
  this.props.navigation.navigate('Find3',
    { sport, radius, month, day, query })
}}>
  <Text style={{ fontSize: 20, margin: 5 }}>Matt's Lame {sport} Sesh</Text>
  <Text style={{ fontSize: 14 }}>4/12 Players</Text>
  <Text style={{ fontSize: 10, margin: 10 }}>Just a friendly {sport} sesh! Anyone is welcome! Don't forget your own stuff! We got balls tho ;)</Text>
</TouchableOpacity> */

{/* <TouchableOpacity style={styles.event}>
            <Text style={{fontSize: 20, margin: 5}}>Dustin's Trainee {sport} Tourney</Text>
            <Text style={{fontSize: 14}}>9/12 Players</Text>
            <Text style={{fontSize: 10, margin: 10}}>Hardcore {sport} tournament for friggin mega nubs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.event}>
            <Text style={{fontSize: 20, margin: 5}}>Ramin's {sport} with friends</Text>
            <Text style={{fontSize: 14}}>1/12 Players</Text>
            <Text style={{fontSize: 10, margin: 10}}>Me and all my friends like to play {sport} together!</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.event}>
            <Text style={{fontSize: 20, margin: 5}}>Just some games</Text>
            <Text style={{fontSize: 14}}>12/12 Players</Text>
            <Text style={{fontSize: 10, margin: 10}}>This isn't even a {sport} event. Pull up anyways tho</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.event}>
            <Text style={{fontSize: 20, margin: 5}}>Smoke Sesh disguised as a {sport} sesh</Text>
            <Text style={{fontSize: 14}}>4/20 Players</Text>
            <Text style={{fontSize: 10, margin: 10}}>Stoners unite. Come thruuuuu</Text>
          </TouchableOpacity> */}