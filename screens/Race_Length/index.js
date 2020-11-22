import * as React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';

export default class RaceLength extends React.Component {
    constructor(props, { navigation }){
        super(props);
        this.state = {
            race_len: '2'
        }
        this.chooseLen = this.chooseLen.bind(this);
    }

    chooseLen(){
        console.log(this.state);

        fetch('https://ghost.ryandavis.tech:8080/friendly-ghost-list', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                km: this.state.race_len,
                
            })
        }).then((response) => response.json())
            .then((json) => {
                    global.friends_avgs = json;
                    console.log(JSON.stringify(json));
                    global.race_length = this.state.race_len;
                    global.navigation.navigate('Friends', {paramKey: json,});
                    
            })
            .catch((error) => {
                console.error(error);
                Alert.alert("Error fetching opponent data.");
                    this.setState({
                        race_len: '0'
                    });
            });
    }

    render() {
        return (
            <View style={styles.container} >
                <Text style={styles.logo}>Race Length</Text>
                
                <TouchableOpacity style={styles.inputView} onPress = { () => {this.setState({race_len: '2'}); this.chooseLen(); }}>
                    <Text style={styles.login}>2 KM</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.inputView} onPress = { () => {this.setState({race_len: '5'}); this.chooseLen()}}>
                    <Text style={styles.login}>5 KM</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.inputView} onPress = { () => {this.setState({race_len: '10'}); this.chooseLen()}}>
                    <Text style={styles.login}>10 KM</Text>
                </TouchableOpacity>

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },

    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#fb5b5a",
        marginBottom: 40
    },

    inputView: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 35,
        height: 70,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },

    login: {
        color: "white",
        fontSize: 17
    },
});


