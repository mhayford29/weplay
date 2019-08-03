import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, Picker, AsyncStorage, Dimensions, ImageBackground } from 'react-native';
import Calendar from 'react-native-day-picker';
import data from '../data/eventsExample.json';
import { Dropdown } from 'react-native-material-dropdown';
import { Input, Button } from 'react-native-elements';
import axios from 'axios';

export default class Find extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sport: 'All Sports',
      radius: '1',
      zip: '45678',
      month: '6',
      day: '30',
      monthEnd: '',
      dayEnd: '',
      query: {},
      querys: []
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('userData')
      .then(data => console.log('grabbed data from async storage', JSON.parse(data)))
      .catch(err => console.log('error getting data from async storage'))
  }

  render() {
    var from = new Date();
    var to = new Date();
    to.setDate(to.getDate() + 9);
    var startDate = new Date();
    let sports = [{ value: 'All Sports' }, { value: 'Basketball' }, { value: 'Football' }, { value: 'Baseball' },
    { value: 'Soccer' }, { value: 'Hockey' }, { value: 'Tennis' }, { value: 'Water Polo' },
    { value: 'Volleyball' }, { value: 'Ultimate Frisbee' }, { value: 'Softball' },
    { value: 'Dodgeball' }, { value: 'Lacrosse' }, { value: 'Ping Pong' },
    { value: 'Pickle Ball' }, { value: 'Hacky Sack' }, { value: 'Laser Tag' },
    { value: 'Golf' }, { value: 'Mini Golf' }, { value: 'Rugby' }, { value: 'Badminton' }];
    let miles = [{ value: '12345' }, { value: '23456' }, { value: '34567' }, { value: '45678' }, { value: '56789' }, { value: '67890' }];
    return (
      <ImageBackground source={require('../images/background/background.jpg')} style={{ height: '100%', width: '100%' }}>

        <View style={styles.outer}>

          <View style={[styles.body, { flex: .5 }]}>
            <Text style={{ fontSize: 40, top: 15 }}>Find an Event</Text>
          </View>

          <View style={[styles.body, styles.rows, { flex: 1.2, top: 0 }]}>
            <View style={[styles.row, { marginLeft: 30, marginRight: 30 }]}>
              <Dropdown label='Sport' data={sports} fontSize={20} onChangeText={(itemValue, itemIndex) => {
                this.setState({ sport: itemValue })
              }} />
            </View>
            <View style={[styles.row, { marginLeft: 17, marginRight: 17 }]}>
              <Input
                placeholder="Zipcode"
                onChangeText={(zip) => this.setState({ zip })}
              />
            </View>
          </View>

          <View style={[styles.body, styles.rows, { flex: 3 }]}>
            <View style={[styles.row, { flex: 2.4, opacity: .8 }]}>
              <Calendar
                monthsCount={2}
                startFormMonday={true}
                startDate={startDate}
                dayDisabledTextColor='gray'
                daySelectedBackColor='#ffa64d'
                dayInRangeBackColor='#ffd9b3'
                // rangeSelect={false}
                isFutureDate={true}
                width={Dimensions.get('window').width}
                onSelectionChange={(current, previous) => {

                  if (!previous) {
                    this.setState({ month: JSON.stringify(current.getMonth() + 1), day: JSON.stringify(current.getDate()) })
                  } else if (previous.getTime() > current.getTime()) {
                    console.log('date start: ', previous, 'date end: ', current)
                    this.setState({ month: JSON.stringify(current.getMonth() + 1), day: JSON.stringify(current.getDate()), monthEnd: '', dayEnd: '' })
                  } else {
                    console.log('date start: ', previous, 'date end: ', current)
                    this.setState({
                      month: JSON.stringify(previous.getMonth() + 1), day: JSON.stringify(previous.getDate()),
                      monthEnd: JSON.stringify(current.getMonth() + 1), dayEnd: JSON.stringify(current.getDate())
                    })
                  }
                }}
              />
            </View>
            <View style={[styles.row, { flex: .8, alignItems: 'center' }]}>
              <Text style={{ top: 10, fontSize: 15, textAlign: 'center', fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>Look for {this.state.sport} events in zip code: {this.state.zip}</Text>

              {/* 
                between: monthend exists && monthend >= month && ((dayend > day && month === monthend) || monthend > month)

                on: monthend doesnt exist || monthend < month || (dayend < day && month === monthend)
              */}

              {(this.state.monthEnd && (Number(this.state.monthEnd) >= Number(this.state.month)) && ((Number(this.state.dayEnd) > Number(this.state.day) && this.state.month === this.state.monthEnd) || Number(this.state.monthEnd) > Number(this.state.month))) ?
                <Text style={{ top: 10, fontSize: 15, textAlign: 'center', marginBottom: 30, fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>Between {this.state.month}/{this.state.day} and {this.state.monthEnd}/{this.state.dayEnd}</Text>
                :
                <Text style={{ top: 10, fontSize: 15, textAlign: 'center', marginBottom: 30, fontWeight: 'bold', color: 'white', textShadowColor: 'black', textShadowRadius: 5 }}>On {this.state.month}/{this.state.day}</Text>
              }

              <Button
                title="Search"
                titleStyle={{ color: '#004885' }}
                buttonStyle={{ backgroundColor: 'rgba(66, 164, 245,.9)', width: 200 }}
                containerStyle={{ shadowColor: 'black', shadowRadius: 5, shadowOpacity: 1, shadowOffset: { width: 2, height: 2 } }}
                onPress={() => {
                  let { sport, zip, month, day, monthEnd, dayEnd } = this.state;
                  console.log('Start date: ', month, day, '\n', 'End date: ', monthEnd, dayEnd);
                  sport === 'All Sports' ?
                    axios.get('http://localhost:3000/weplay/event', { params: { zip, month, day, monthEnd, dayEnd } })
                      .then(output => {
                        this.setState({ querys: output.data }, () => {
                          this.props.navigation.navigate('Find2', { sport, zip, month, day, query: this.state.querys, monthEnd, dayEnd });
                        })
                      })
                    :
                    axios.get('http://localhost:3000/weplay/event', { params: { sport, zip, month, day, monthEnd, dayEnd } })
                      .then(output => {
                        this.setState({ querys: output.data }, () => {
                          this.props.navigation.navigate('Find2', { sport, zip, month, day, query: this.state.querys, monthEnd, dayEnd });
                        })
                      })
                }} />
            </View>
          </View>

          <View style={styles.footer}>
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
    flex: .4,
    // borderWidth: 2,
    // borderColor: 'yellow'
  },
  columns: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
  },
  rows: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch'
  },


  column: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'black',
    // alignItems: 'center'
  },
  row: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: 'black',
    // alignItems: 'center'
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


/*

            <Text style={{ top: 0, fontSize: 20 }}>Sport</Text>
            <Picker itemStyle={{ height: 140, width: 180 }} selectedValue={this.state.sport} style={styles.input} onValueChange={(itemValue, itemIndex) => {
              this.setState({ sport: itemValue }, () => this.updateQuery())
            }
            }>
              <Picker.Item label="Ping Pong" value="Ping Pong" />
              <Picker.Item label="Pickle Ball" value="Pickle Ball" />
              <Picker.Item label="Basketball" value="Basketball" />
              <Picker.Item label="Volleyball" value="Volleyball" />
              <Picker.Item label="Hacky Sack" value="Hacky Sack" />
              <Picker.Item label="Laser Tag" value="Laser Tag" />
              <Picker.Item label="Mini Golf" value="Mini Golf" />
            </Picker>

            <Text style={{ top: 0, fontSize: 20 }}>Radius (Miles)</Text>
                        <Picker itemStyle={{ height: 140, width: 100 }} selectedValue={this.state.radius} style={styles.input} onValueChange={(itemValue, itemIndex) => {
              this.setState({ radius: itemValue })
            }
            }>
              <Picker.Item label="1" value={1} />
              <Picker.Item label="5" value={5} />
              <Picker.Item label="10" value={10} />
              <Picker.Item label="20" value={20} />
              <Picker.Item label="30" value={30} />
              <Picker.Item label="40" value={40} />
              <Picker.Item label="50" value={50} />
            </Picker>

            */