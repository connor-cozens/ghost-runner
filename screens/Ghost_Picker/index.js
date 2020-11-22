import * as React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';

export default class LoginScreen extends React.Component {
    state = {
        email: "",
        password: ""
    }
    render() {
        return (
            <View style={styles.container} >
                <Text style={styles.logo}>Ghost Runner</Text>


                <TouchableOpacity style={styles.inputView}>
                    <Text style={styles.login}>Race Your Ghost</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.inputView}>
                    <Text style={styles.login}>Race A Friendly Ghost</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.inputView}>
                    <Text style={styles.login}>Race A Stranger Ghost</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.inputView}>
                    <Text style={styles.login}>Free Run</Text>
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


