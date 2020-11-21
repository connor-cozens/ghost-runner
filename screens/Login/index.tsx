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

                <View style={styles.inputView} >
                    <TextInput
                        style={styles.inputText}
                        placeholder="Username"
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ email: text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput secureTextEntry={true}
                        style={styles.inputText}
                        placeholder="Password"
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ password: text })} />
                </View>
                <TouchableOpacity style={styles.loginBtn}>
                    <Text style={styles.forgot}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.forgot}>Signup</Text>
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
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20
    },

    inputText: {
        height: 50,
        color: "white"
    },

    forgot: {
        color: "white",
        fontSize: 11
    },

    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
});


