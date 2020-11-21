import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Button } from 'react-native';

export default function MapScreen ({ navigation }) {
  // render() {
    return (
      <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 42.98491666389771,
          longitude: -81.24528725322716,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.mapStyle}
      />
      {/* <View style = {styles.container}> */}
        
        <Text 
          onPress = { () => navigation.navigate('Ghost')} 
          style={styles.ghost}
          >Ghost
        </Text>
        
        <Text 
          onPress = { () => navigation.navigate('Login')} 
          style={styles.login}
          >Login
        </Text>
        
        <Text 
          onPress = { () => navigation.navigate('Profile')} 
          style={styles.profile}
          >Profile
        </Text>
      
      {/* </View> */}
    </View>
    )
  // }  
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