import * as React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, Alert, Image } from 'react-native';


export default class LoginScreen extends React.Component<{}, {username: string, password: string}> {

    constructor(props, { navigation }){
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.signIn = this.signIn.bind(this);
    }
     
    signIn(){
        console.log(this.state);
        fetch('https://ghost.ryandavis.tech:8080/verify-user', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        }).then((response) => response.json())
            .then((json) => {
                if (json.signedIn == true){
                    global.signedIn = true;
                    global.oid = json._id;
                    global.navigation.navigate('Map');
                } else{
                    Alert.alert("Login Invalid, Please Try Again");
                    this.setState({
                        username: "",
                        password: ""
                    });

                }
            })
            .catch((error) => {
                console.error(error);
                Alert.alert("Login Invalid, Please Try Again");
                    this.setState({
                        username: "",
                        password: ""
                    });
            });
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
                        onChangeText={text => this.setState({ username: text })} />
                </View>
                <View style={styles.inputView} >
                    <TextInput secureTextEntry={true}
                        style={styles.inputText}
                        placeholder="Password"
                        placeholderTextColor="#003f5c"
                        onChangeText={text => this.setState({ password: text })} />
                </View>
                <TouchableOpacity onPress={this.signIn} style={styles.loginBtn}>
                    <Text style={styles.login}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.signup}>Signup</Text>
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
        backgroundColor: '#dadde5'
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

    login: {
        color: "white",
        fontSize: 11
    },

    signup: {
        color: "#465881",
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


