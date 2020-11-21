import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';

import * as Location from 'expo-location'

export default class MapScreen extends React.Component {

  constructor({ navigation }){
    super()
    this.navigation = navigation;

    this.state = {
      lat: -49.98491666389771,
      long: -81.24528725322716,
    }
  }

  componentDidMount(){
    Location.getCurrentPositionAsync()
    .then((location) => {
      this.setState({
        lat: location["coords"]["latitude"],
        long: location["coords"]["longitude"]
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
      <MapView
        region={{
          latitude: this.state.lat,
          longitude: this.state.long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.mapStyle}
      />
      {/* <View style = {styles.container}> */}
        
        <Text 
          onPress = { () => this.navigation.navigate('Ghost')} 
          style={styles.ghost}
          >Ghost
        </Text>
        
        <Text 
          onPress = { () => this.navigation.navigate('Login')} 
          style={styles.login}
          >Login
        </Text>
        
        <Text 
          onPress = { () => this.navigation.navigate('Profile')} 
          style={styles.profile}
          >Profile
        </Text>
      
      {/* </View> */}
    </View>
    );
  }  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  ghost: {
    position: "absolute",
    bottom: 50,
    fontWeight: 'bold',
    paddingLeft: 300,
  },
  login: {
    position: "absolute",
    bottom: 100,
    fontWeight: 'bold',
    paddingLeft: 300,
  },
  profile: {
    position: "absolute",
    bottom: 150,
    fontWeight: 'bold',
    paddingLeft: 300,
  },
  GhostPickerButton: {
    position: "absolute",
  },
});