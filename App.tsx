// Import Packages
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack';
import Animated from 'react-native-reanimated';

import * as Location from 'expo-location'

// Import Individual pages as Objects
import MapScreen from './screens/Map';
import GhostPickerScreen from './screens/Ghost_Picker';
import LoginScreen from './screens/Login';
import ProfileScreen from './screens/Profile';
import { Alert } from 'react-native';
// import LandingScreen from './screens/Landing_Page';

// Stack Navigation Control
const RootStack = createStackNavigator();

// App Navigation Control
export default class App extends Component {
  //
  constructor(props) {
    super(props);
    this.state = {
      sliding_animation: new Animated.Value(0),
    }
    this.enableLocation();
  }

  async enableLocation() {
    let { status } = await Location.requestPermissionsAsync()
    if (status !== 'granted'){
      Alert.alert('Please Allow Location')
    }
  }
  //s
  render() {
    return (
      <NavigationContainer>
        <RootStack.Navigator>
          {/* <RootStack.Screen name = "Landing" component = {LandingScreen} /> */}
          <RootStack.Screen name = "Map"      component = {MapScreen} />
          <RootStack.Screen name = "Ghost"    component = {GhostPickerScreen} />
          <RootStack.Screen name = "Login"    component = {LoginScreen} />
          <RootStack.Screen name = "Profile"  component = {ProfileScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  };
}