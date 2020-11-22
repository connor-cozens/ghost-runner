import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';
import { GoogleMap, DistanceMatrixService } from "@react-google-maps/api";

import * as Location from 'expo-location'
import ProgressBar from './../../components/ProgressBar.js';

export default class MapScreen extends React.Component {
  constructor({ navigation }){
    super()
    this.navigation = navigation;
    global.navigation = navigation;
    this.navigation.addListener('willFocus', () => {
      console.log('activated');
      this.forceUpdate();
    });
    this.handleOnNavigationBack = this.handleOnNavigationBack.bind(this);
    global.handleOnNavigationBack = this.handleOnNavigationBack

    this.state = {
      lat: -49.98491666389771,
      long: -81.24528725322716,
      TIME_ELAPSED: 0,
      PLAYER_ORIGIN_LONG: 0,
      PLAYER_ORIGIN_LAT: 0,
      PLAYER_DESTINATION_LONG: 0,
      PLAYER_DESTINATION_LAT: 0,
      PLAYER_DISTANCE: 0,
      PLAYER_CURRENT_DISTANCE: 0,
      GHOST_ORIGIN: 0,
      GHOST_DESTINATION: 0,
      GHOST_DISTANCE: 0,
      PLAYER_PROGRESS: 0,
      GHOST_PROGRESS: 0,
      PLAYER_DISTANCES: [],
      GHOST_DISTANCES: [],
      RACE_LENGTH: 2000

    }
  }
  handleOnNavigationBack(){
    this.forceUpdate();
  }
  componentDidMount(){
    // Center map on user at app startup
    Location.getCurrentPositionAsync({accuracy: Location.Accuracy.BestForNavigation})
        .then((location) => {
          this.setState({
            lat: location["coords"]["latitude"],
            long: location["coords"]["longitude"],
          })
        }),
    // Get the ghost data for the ghost you're racing
    fetch("https://ghost.ryandavis.tech:8080/get-ghost-run", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "oid": "5fb94e5945f3e966b61e515d"
            })
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              this.setState({
                GHOST_DISTANCES: data.latest_run
              })
              // console.log(data)
            }),
    // Set how often to check for user's new location (default 20 seconds)
    this.state.interval = setInterval(() => {
      this.setState({
        // Update the elapsed time & set previous coordinates to origin
        TIME_ELAPSED: (this.state.TIME_ELAPSED + 20),
        PLAYER_ORIGIN_LONG: (this.state.PLAYER_DESTINATION_LONG),
        PLAYER_ORIGIN_LAT: (this.state.PLAYER_DESTINATION_LAT),
      })
      // Test to print how long tracking has been going for
      console.log("Running for: ", this.state.TIME_ELAPSED, " seconds.")
      // Get the current location and set map to center on current location
      Location.getCurrentPositionAsync({accuracy: Location.Accuracy.BestForNavigation})
        .then((location) => {
          this.setState({
            lat: location["coords"]["latitude"],
            long: location["coords"]["longitude"],
            PLAYER_DESTINATION_LONG: location["coords"]["longitude"],
            PLAYER_DESTINATION_LAT: location["coords"]["latitude"]
          });
          // Create URL to push based on origin and destination times
          url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins="+
            this.state.PLAYER_ORIGIN_LAT        + ", " +
            this.state.PLAYER_ORIGIN_LONG       + "&destinations=" +
            this.state.PLAYER_DESTINATION_LAT   + ", "+
            this.state.PLAYER_DESTINATION_LONG  + "&mode=walking&key=AIzaSyD8LiaQi4w3UySiDfi_38xpGvJ2iqFv7Hk";
          // console.log("URL is: ", url)
          // Retrieve the distance from the google servers
          fetch(url)
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              if (this.state.TIME_ELAPSED == 20) {
                const distance = 0
              }
              else {
                const distance = data.rows[0].elements[0].distance.text.split(' ')[0]
                this.setState({
                  PLAYER_CURRENT_DISTANCE: distance,
                })
              }
            });
          
          // Calculate the player's new travelled distance at the current point
          this.setState({
            PLAYER_DISTANCE: parseInt(parseInt(this.state.PLAYER_DISTANCE) + parseInt(this.state.PLAYER_CURRENT_DISTANCE) + 500),
          })
          // console.log("Player Distance is now: ", this.state.PLAYER_DISTANCE)
          this.state.PLAYER_DISTANCES.push(this.state.PLAYER_DISTANCE)
          // console.log("Player Distances is now: ", this.state.PLAYER_DISTANCES)
          
          const ghost_index = this.state.TIME_ELAPSED / 20
          this.state.GHOST_DISTANCE = this.state.GHOST_DISTANCES[ghost_index]

          this.state.PLAYER_PROGRESS = parseInt((this.state.PLAYER_DISTANCE / this.state.RACE_LENGTH) * 100)
          this.state.GHOST_PROGRESS = parseInt((this.state.GHOST_DISTANCE / this.state.RACE_LENGTH) * 100)

          if (this.state.GHOST_DISTANCE < this.state.PLAYER_DISTANCE) {
            console.log("You're ahead of the ghost, keep up the pace!")
          }
          //
          else if (this.state.GHOST_DISTANCE == this.state.PLAYER_DISTANCE) {
            console.log("You're tied with the ghost, time to pick up the pace!")
          }
          //
          else {
            console.log("You're behind the ghost, what a spooooooky place to be!")
          }

        });
      if (this.state.PLAYER_DISTANCE >= this.state.RACE_LENGTH) {
        clearInterval(this.state.interval)
        console.log("You finished your run, good job!!")
      }
    }, 20000);
  }
  
  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    return (
    <View style={styles.container}>
      {/* Map Object */}
      <MapView
        region={{
          latitude: this.state.lat,
          longitude: this.state.long,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        style={styles.mapStyle}
      />        
      {/* Menu Item 1 */}
      <Text 
        onPress = { () => this.navigation.navigate('Ghost')} 
        style={styles.ghost}
        >Ghost
      </Text>
      {/* Menu Item 2 */}
      {global.signedIn ? (null) : 
      (<Text 
        onPress = { () => this.navigation.navigate('Login')} 
        style={styles.login}
        >Login
      </Text>)}
      {/* Menu Item 3 */}
      { global.signedIn ?
      (<Text 
        onPress = { () => this.navigation.navigate('Profile')} 
        style={styles.profile}
        >Profile
      </Text>
      ) : (null)}
      {/* Player Progress Bar */}
      <View style={styles.progress1}>
        <ProgressBar icon="run" progress={this.state.PLAYER_PROGRESS}/>
      </View>
      {/* Ghost Progress Bar */}
      <View style={styles.progress2}>
        <ProgressBar icon="ghost" progress={this.state.GHOST_PROGRESS}/>
      </View>
      <Text 
        style={styles.distanceDisplay}
        > Distance Travelled: { this.state.PLAYER_DISTANCE }
      </Text>
      <Text 
        style={styles.timeDisplay}
        > Time Elapsed { this.state.TIME_ELAPSED }
      </Text>
    </View>
    )
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
    top: 0,
    // color: "black"
  },
  progress2: {
    position: "absolute",
    top: 40,
    // color: "black"
  },
  distanceDisplay: {
    position: "absolute",
    bottom: 150,
    left: 5,
    fontWeight: 'bold'
  },
  timeDisplay: {
    position: "absolute",
    bottom: 165,
    left: 5,
    fontWeight: 'bold'
  }

});