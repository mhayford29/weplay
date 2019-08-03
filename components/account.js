import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage, ImageBackground } from 'react-native';
import { Button } from 'react-native-elements'
import axios from 'axios';


export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      heightFeet: 0,
      heightInches: 0,
      weight: 0,
      age: 0,
      favoriteSports1: '--',
      favoriteSports2: '--',
      favoriteSports3: '--',
      facebookID: '0',
      allSports: [{ value: '--' }, { value: 'Basketball' }, { value: 'Football' }, { value: 'Baseball' },
      { value: 'Soccer' }, { value: 'Hockey' }, { value: 'Tennis' }, { value: 'Water Polo' },
      { value: 'Volleyball' }, { value: 'Ultimate Frisbee' }, { value: 'Softball' },
      { value: 'Dodgeball' }, { value: 'Lacrosse' }, { value: 'Ping Pong' },
      { value: 'Pickle Ball' }, { value: 'Hacky Sack' }, { value: 'Laser Tag' },
      { value: 'Golf' }, { value: 'Mini Golf' }, { value: 'Rugby' }, { value: 'Badminton' }]
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleEditSwitch = this.handleEditSwitch.bind(this);
    this.handleProfileUpdate = this.handleProfileUpdate.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem('userData')
      .then(data => JSON.parse(data))
      .then(data => {
        const {
          name,
          phone,
          heightFeet,
          heightInches,
          weight,
          age,
          favoriteSports1,
          favoriteSports2,
          favoriteSports3,
          events,
          facebookID
        } = data;

        this.setState({
          name,
          phone: phone || '--',
          heightFeet: heightFeet || '--',
          heightInches: heightInches || '--',
          weight: weight || '--',
          age: age || '--',
          favoriteSports1: favoriteSports1 || '--',
          favoriteSports2: favoriteSports2 || '--',
          favoriteSports3: favoriteSports3 || '--',
          facebookID,
          events,
        })
      })
      .catch(err => console.log('error getting data from async storage'))
  }

  handleProfileUpdate() {
    axios.put('http://localhost:3000/weplay/profile/', {
      name: this.state.name,
      phone: this.state.phone === '--' ? null : this.state.phone,
      heightFeet: this.state.heightFeet === '--' ? null : this.state.heightFeet,
      heightInches: this.state.heightInches === '--' ? null : this.state.heightInches,
      weight: this.state.weight === '--' ? null : this.state.weight,
      age: this.state.age === '--' ? null : this.state.age,
      favoriteSports1: this.state.favoriteSports1 === '--' ? null : this.state.favoriteSports1,
      favoriteSports2: this.state.favoriteSports2 === '--' ? null : this.state.favoriteSports2,
      favoriteSports3: this.state.favoriteSports3 === '--' ? null : this.state.favoriteSports3,
      facebookID: this.state.facebookID
    })
      .catch(err => console.log('Error in update :', err))
  }

  handleChange(text, key) {
    this.setState({ [key]: text })
  }

  handleEditSwitch() {
    this.props.navigation.navigate('EditAccount', {
      name: this.state.name,
      phone: this.state.phone,
      heightFeet: this.state.heightFeet,
      heightInches: this.state.heightInches,
      weight: this.state.weight,
      age: this.state.age,
      favoriteSports1: this.state.favoriteSports1,
      favoriteSports2: this.state.favoriteSports2,
      favoriteSports3: this.state.favoriteSports3,
      allSports: this.state.allSports,
      handleChange: this.handleChange,
      handleProfileUpdate: this.handleProfileUpdate
    })
  }

  render() {
    return (
      <ImageBackground source={require('../images/background/background.png')} style={{ height: '100%', width: '100%', top: 0 }}>

        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Account Info</Text>
          </View>
          <Text style={{ ...styles.attribute, ...styles.topContainer }}>Name: </Text>
          <View style={styles.attributeContainer}>
            <Text style={styles.attribute}>{this.state.name}</Text>
          </View>
          <Text style={styles.attribute}>Phone: </Text>
          <View style={styles.attributeContainer}>
            <Text style={styles.attribute}>{this.state.phone}</Text>
          </View>
          <Text style={styles.attribute}>Height: </Text>
          <View style={styles.attributeContainer}>
            <Text style={styles.attribute}>{this.state.heightFeet} Feet {this.state.heightInches} Inches</Text>
          </View>
          <Text style={styles.attribute}>Weight: </Text>
          <View style={styles.attributeContainer}>
            <Text style={styles.attribute}>{this.state.weight}</Text>
          </View>
          <Text style={styles.attribute}>Age: </Text>
          <View style={styles.attributeContainer}>
            <Text style={styles.attribute}>{this.state.age}</Text>
          </View>
          <Text style={styles.attribute}>Favorite Sports: </Text>
          <View style={{ ...styles.attributeContainer, ...styles.sportsList }}>
            {[this.state.favoriteSports1, this.state.favoriteSports2, this.state.favoriteSports3].map((sport, index) => (
              <Text key={index} style={styles.attribute}>{index + 1}. {sport}</Text>
            ))}
          </View>
          <Button title="Edit Profile Info" onPress={this.handleEditSwitch} />
        </View>
      </ImageBackground>
    )
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    marginLeft: 20,
    marginRight: 20,
    flex: 1
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 50,
  },
  attribute: {
    fontSize: 20,
  },
  attributeContainer: {
    paddingBottom: 7,
    marginTop: 8,
    marginLeft: 10,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#989898'
  },
  topContainer: {
    marginTop: 30
  },
  sportsList: {
    marginBottom: 50,
    borderBottomWidth: 0,
  },
});