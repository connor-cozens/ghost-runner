import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.heading}>Username: mbhatt26</Text> 
      <Text style={styles.heading}>Age: 22</Text>
      <Text style={styles.heading}>Best 2km Pace: </Text> 
      <Text style={styles.heading}>Best 5km Pace: </Text>
      <Text style={styles.heading}>Best 10km Pace: </Text>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: '200',
    fontStyle: 'italic',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
