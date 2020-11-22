import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button} from 'react-native';
import { GoogleMap, DistanceMatrixService } from "@react-google-maps/api";

import Marker from 'react-native-maps';

import Pin from '../../assets/images/pin.png';
import * as Location from 'expo-location'
import ProgressBar from './../../components/ProgressBar.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
      RACE_LENGTH: 2000,
      PLAYER_HIGHEST_2K: 0,
      PLAYER_HIGHEST_5K: 0,
      PLAYER_HIGHEST_10K: 0,
      GHOST_ID: "5fb94e5945f3e966b61e515d",
      PLAYER_ID: global.oid
    }
  }
  handleOnNavigationBack(){
    this.forceUpdate();
  }
  componentDidMount(){
    Location.getCurrentPositionAsync({accuracy: Location.Accuracy.BestForNavigation})
        .then((location) => {
          this.setState({
            lat: location["coords"]["latitude"],
            long: location["coords"]["longitude"],
          })
        }),
    //
    this.state.flag_interval = setInterval(() => {
      // console.log(global.race_on)
      if (global.race_on == true) {
        clearInterval(this.state.flag_interval)
        this.startRace()
      }
    })
  }

  startRace() {
    // Center map on user at app startup
    Location.getCurrentPositionAsync({accuracy: Location.Accuracy.BestForNavigation})
        .then((location) => {
          this.setState({
            lat: location["coords"]["latitude"],
            long: location["coords"]["longitude"],
          })
        }),
    // Get Profile Data
    fetch("https://ghost.ryandavis.tech:8080/get-profile-data", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "oid": this.state.GHOST_ID
            })
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              console.log("Data" + data)
              this.setState({
                PLAYER_HIGHEST_2K: (data.best_2k),
                PLAYER_HIGHEST_5K: data.best_5k,
                PLAYER_HIGHEST_10K: data.best_10k,
                PLAYER_ID: data._id
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
              "oid": this.state.GHOST_ID
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
          })
        })
      // Create URL to push based on origin and destination times
      this.state.url = "https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins="+
      this.state.PLAYER_ORIGIN_LAT        + ", " +
      this.state.PLAYER_ORIGIN_LONG       + "&destinations=" +
      this.state.PLAYER_DESTINATION_LAT   + ", "+
      this.state.PLAYER_DESTINATION_LONG  + "&mode=walking&key=AIzaSyD8LiaQi4w3UySiDfi_38xpGvJ2iqFv7Hk";
      // console.log("URL is: ", url)
      // Retrieve the distance from the google servers
      fetch(this.state.url)
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
        })
          
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
      // console.log("Player Progress Value is now: ", this.state.PLAYER_PROGRESS)
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
      // Ghost Win Condition
      if (this.state.GHOST_DISTANCE >= this.state.RACE_LENGTH) {
        clearInterval(this.state.interval)
        console.log("The ghost beat you! Try again next time!")
      }
      // Player Win Condition
      else if (this.state.PLAYER_DISTANCE >= this.state.RACE_LENGTH) {
        clearInterval(this.state.interval)
        console.log("You finished your run, good job!!")
        // 
        this.state.average_speed = (this.state.PLAYER_DISTANCES[this.state.PLAYER_DISTANCES.length - 1] / this.state.TIME_ELAPSED)
        if (this.state.RACE_LENGTH == 2000 && this.state.average_speed > this.state.PLAYER_HIGHEST_2K) {
            this.state.PLAYER_HIGHEST_2K = this.state.average_speed
        }
        // 
        else if (this.state.RACE_LENGTH == 5000 && this.state.average_speed > this.state.PLAYER_HIGHEST_5K) {
          this.state.PLAYER_HIGHEST_5K = this.state.average_speed
        }
        // 
        else if (this.state.RACE_LENGTH == 10000 && this.state.average_speed > this.state.PLAYER_HIGHEST_10K) {
          this.state.PLAYER_HIGHEST_10K = this.state.average_speed
        }
        // POST ALL USER INFO HERE BACK TO THE DATABASE
        this.state.race = 0
        if (this.state.RACE_LENGTH == 2000) {
          this.state.race = 2
        }
        else if (this.state.RACE_LENGTH == 5000) {
          this.state.race = 5
        }
        else if (this.state.RACE_LENGTH == 10000) {
          this.state.race = 10
        }
        fetch("https://ghost.ryandavis.tech:8080/upload-run", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "oid": this.state.PLAYER_ID,
              "field_name": ("best_" + this.state.race + "k"),
              "avg": this.state.average_speed,
              "run": this.state.PLAYER_DISTANCES
            })
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              console.log("Data" + data)
            })
      }
    }, 2000);
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
        style={styles.mapStyle}>

      <MapView.Marker
        coordinate={{
          latitude: this.state.lat,
          longitude: this.state.long,
        }}
        title={"title"}
        description={"Desc"}
        image = { Pin }
      />  
        </MapView>  

      {/* Menu Item 1 */}
        <Text 
           style={styles.ghost}
           onPress = { () => this.navigation.navigate('Ghost')}
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
      { global.race_on ? 
      (<View style={styles.progress1}>
        <ProgressBar icon="run" progress={this.state.PLAYER_PROGRESS}/>
      </View>) : (null)}
      {/* Ghost Progress Bar */}
      {global.race_on ? 
      (<View style={styles.progress2}>
        <ProgressBar icon="ghost" progress={this.state.GHOST_PROGRESS}/>
      </View>) : (null)}
      {global.race_on ?
      (<Text 
        style={styles.distanceDisplay}
        > Distance Travelled: { this.state.PLAYER_DISTANCE }
      </Text>) : (null)}
      {global.race_on ? (
      <Text 
        style={styles.timeDisplay}
        > Time Elapsed { this.state.TIME_ELAPSED }
      </Text> ) : (null)}
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    left: 320,
    flexDirection: 'row',
    padding: 5,
    backgroundColor: "#fb5b5a",
    borderRadius: 5,
    color: 'white'
  },
  login: {
    position: "absolute",
    bottom: 100,
    fontWeight: 'bold',
    left: 320,
    flexDirection: 'row',
    padding: 5,
    backgroundColor: "#fb5b5a",
    borderRadius: 5,
    color: 'white'
  },
  profile: {
    position: "absolute",
    bottom: 150,
    fontWeight: 'bold',
    left: 320,
    flexDirection: 'row',
    padding: 5,
    backgroundColor: "#fb5b5a",
    borderRadius: 5,
    color: 'white'
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
    bottom: 100,
    left: 5,
    fontWeight: 'bold'
  },
  timeDisplay: {
    position: "absolute",
    bottom: 75,
    left: 5,
    fontWeight: 'bold'
  }

});