import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, ImageBackground } from 'react-native';
import { Input, Button } from 'react-native-elements'
import { Dropdown } from 'react-native-material-dropdown';

export default class EditAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleEditSubmit = this.handleEditSubmit.bind(this);
  }

  handleEditSubmit() {
    const { handleProfileUpdate } = this.props.navigation.state.params;
    handleProfileUpdate();
    this.props.navigation.navigate('Account');
  }

  render() {
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
      allSports,
      handleChange
    } = this.props.navigation.state.params;

    const feet = [
      { value: 3 }, 
      { value: 4 }, 
      { value: 5 }, 
      { value: 6 }, 
      { value: 7 }, 
      { value: 8 }
    ]
    const inches = [
      { value: 0 }, 
      { value: 1 }, 
      { value: 2 },
      { value: 3 }, 
      { value: 4 }, 
      { value: 5 }, 
      { value: 6 }, 
      { value: 7 }, 
      { value: 8 }, 
      { value: 9 }, 
      { value: 10 }, 
      { value: 11 }, 
      { value: 12 }
    ]
    return (
      <ImageBackground source={require('../images/background/background.png')} style={{height: '100%', width: '100%'}}>

      <ScrollView style={styles.mainContainer}>
        <Text style={styles.title}>Edit Account Info</Text>
        <Text style={{...styles.attribute, ...styles.topContainer}}>Name: </Text>
        <View style={styles.attributeContainer}>
          <Input style={styles.attribute} onChangeText={(text) => handleChange(text, 'name')}>{name}</Input>
        </View>
        <Text style={styles.attribute}>Phone: </Text>
        <View style={styles.attributeContainer}>
          <Input style={styles.attribute} onChangeText={(text) => handleChange(text, 'phone')}>{phone}</Input>
        </View>
        <Text style={styles.attribute}>Height: </Text>
        <View style={styles.attributeContainer}>
          <Dropdown label={JSON.stringify(heightFeet)} data={feet} onChangeText={(text) => handleChange(text, 'heightFeet')}></Dropdown>
          <Dropdown label={JSON.stringify(heightInches)} data={inches} onChangeText={(text) => handleChange(text, 'heightInches')}></Dropdown>
        </View>
        <Text style={styles.attribute}>Weight In Pounds: </Text>
        <View style={styles.attributeContainer}>
          <Input style={styles.attribute} onChangeText={(text) => handleChange(text, 'weight')}>{weight}</Input>
        </View>
        <Text style={styles.attribute}>Age: </Text>
        <View style={styles.attributeContainer}>
          <Input style={styles.attribute} onChangeText={(text) => handleChange(text, 'age')}>{age}</Input>
        </View>
        <Text style={styles.attribute}>Favorite Sports: </Text>
        {[favoriteSports1, favoriteSports2, favoriteSports3].map((sport, index) => (
          <Dropdown style={{flex: 1}} key={index} data={allSports} label={`${index + 1}. ${sport}`} onChangeText={(text) => handleChange(text, `favoriteSports${index + 1}`)}></Dropdown>
        ))}
        <Button title="Confirm Edit" style={styles.button}onPress={this.handleEditSubmit}/>
      </ScrollView>
      </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    marginRight: 20,
    marginLeft: 20
  },
  title: {
    fontSize: 50,
  },
  attributeContainer: {
    marginTop: 8,
    marginBottom: 5,
  },
  topContainer: {
    marginTop: 30
  },
  attribute: {
    fontSize: 20,
  },
  button: {
    marginTop: 15
  }
});