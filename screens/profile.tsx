import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.title}>Username: </Text>
      <Text style={styles.title}>Age: </Text>
      <Text style={styles.title}>Best 2km Pace: </Text>
      <Text style={styles.title}>Best 5km Pace: </Text>
      <Text style={styles.title}>Best 10km Pace: </Text>

      <EditScreenInfo path="/screens/profile.js" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});