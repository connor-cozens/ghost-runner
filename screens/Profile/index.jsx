import * as React from 'react';
import { StyleSheet } from 'react-native';
import { isJSDocUnknownType } from 'typescript';

import { Text, View } from '../../components/Themed';

export default class ProfileScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: 'Mauli',
            age: 22,
            best2k: 10,
            best5k: 8,
            best10k: 5
        }
    }

    componentDidMount() {
        fetch('https://ghost.ryandavis.tech:8080/get-profile-data', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                objectId: "5fb94e5945f3e966b61e515d",
            })
        }).then((response) => response.json())
            .then((json) => {
                this.setState({ username: json.username, age: json.age, best2k: json.best_2k, best5k: json.best_5k, best10k: json.best_10k })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.container}>
                    <Text style={styles.title}>User Profile</Text>

                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

                    <Text style={styles.heading}>Username: {this.state.username}</Text>
                    <Text style={styles.heading}>Age: {this.state.age}</Text>
                    <Text style={styles.heading}>Best 2km Pace: {this.state.best2k} km/hr </Text>
                    <Text style={styles.heading}>Best 5km Pace: {this.state.best5k} km/hr </Text>
                    <Text style={styles.heading}>Best 10km Pace: {this.state.best10k} km/hr </Text>
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