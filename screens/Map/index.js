import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';

import * as Location from 'expo-location'
import ProgressBar from './../../components/ProgressBar.js';

export default class MapScreen extends React.Component {
  constructor({ navigation }){
    super()
    this.navigation = navigation;

    this.state = {
      lat: -49.98491666389771,
      long: -81.24528725322716,
      PLAYER_ORIGIN: 0,
      PLAYER_DESTINATION: 0,
      GHOST_ORIGIN: 0,
      GHOST_DESTINATION: 0,
      PLAYER_PROGRESS: 0,
      GHOST_PROGRESS: 0,
      PLAYER_DISTANCES: [],
      GHOST_DISTANCES: []
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
      {/* Map Object */}
      <MapView
        region={{
          latitude: this.state.lat,
          longitude: this.state.long,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.mapStyle}
      />        
      {/* Menu Item 1 */}
      <Text 
        onPress = { () => navigation.navigate('Ghost')} 
        style={styles.ghost}
        >Ghost
      </Text>
      {/* Menu Item 2 */}
      <Text 
        onPress = { () => navigation.navigate('Login')} 
        style={styles.login}
        >Login
      </Text>
      {/* Menu Item 3 */}
      <Text 
        onPress = { () => navigation.navigate('Profile')} 
        style={styles.profile}
        >Profile
      </Text>
      {/* Player Progress Bar */}
      <View style={styles.progress1}>
        <ProgressBar progress={this.PLAYER_PROGRESS}/>
      </View>
      {/* Ghost Progress Bar */}
      <View style={styles.progress2}>
        <ProgressBar progress={this.GHOST_PROGRESS}/>
      </View>
    </View>
    )
  }

  componentDidMount() {
    this.interval = setInterval(() => 
      // Calculate player's distance travelled
      player_distance = require('google-distance'),
      player_distance.get(
        {
          origin:       this.PLAYER_ORIGIN,
          destination:  this.PLAYER_DESTINATION
        },
        function(err, data) {
          if (err) return console.log(err);
          console.log(data);
        }
      ),
      this.PLAYER_DISTANCES.push(player_distance),
      // Calculate ghost's distance travelled
      ghost_distance = require('google-distance'),
      ghost_distance.get(
        {
          origin:       this.GHOST_ORIGIN,
          destination:  this.GHOST_DESTINATION
        },
        function(err, data) {
          if (err) return console.log(err);
          console.log(data);
        }
      ),
      this.GHOST_DISTANCES.push(ghost_distance),
      this.setState({PLAYER_PROGRESS: (PLAYER_PROGRESS + 1)}),
      this.updatePlayerBar(this.PLAYER_PROGRESS, 500), 20000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updatePlayerBar = (player_distance, race_distance) => {
    PLAYER_PROGRESS = (player_distance - race_distance) * 100;
    GHOST_PROGRESS = (player_distance - race_distance) * 100;
  }

  updateGhostBar = (ghost_distance, race_distance) => {
    PLAYER_PROGRESS = (ghost_distance - race_distance) * 100;
    GHOST_PROGRESS = (ghost_distance - race_distance) * 100;
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
  progress1: {
    position: "absolute",
    top: 10,
    // color: "black"
  },
  progress2: {
    position: "absolute",
    top: 40,
    // color: "black"
  }
});