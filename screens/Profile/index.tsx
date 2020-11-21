import * as React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';

export default class ProfileScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.title}>User Profile</Text>

                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                    <Text style={styles.heading}>Username:</Text>
                    <Text style={styles.heading}>Age:</Text>
                    <Text style={styles.heading}>Best 2km Pace:</Text>
                    <Text style={styles.heading}>Best 5km Pace:</Text>
                    <Text style={styles.heading}>Best 10km Pace:</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',

    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 40,
    },
    heading: {
        flexDirection: "row",
        fontSize: 20,
        fontWeight: '200',
        margin: 10,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});