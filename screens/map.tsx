import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { constructor } from 'react';

export default class App extends React.Component {
  render() {
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
      </View>
    );
  }
}


const getMapDetails = () => {
  // Get the current location of the user on the map

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
});
