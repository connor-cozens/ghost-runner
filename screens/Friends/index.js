import { array } from 'prop-types';
import * as React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, ScrollView } from 'react-native';

export default class Friends extends React.Component {
    state = {
        email: "",
        password: ""
    }

    render() {

        var jsonData = route.params.paramKey;
        
        var friend_data = jsonData.services.map(function(item, race_length) {
            return{
                oid: item._id,
                name: item.username,
                distance: race_length,
                pace: ("item.best" + race_length + "k")
            };
        });


        function displayFriends(){
            return friend_data.map((item) => {
                return(
                    <TouchableOpacity style={styles.inputView}>
                        <Text style={styles.login}>{item.name} : {item.pace} km/hr</Text>
                    </TouchableOpacity>
                );
            });
        }

        console.log(friend_data);

        return (
            <View style={styles.container} >
                <Text style={styles.logo}>Choose a Friend</Text>

                    {displayFriends()}
                    
                    <TouchableOpacity style={styles.inputView}>
                        <Text style={styles.login}>Henry</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.inputView}>
                        <Text style={styles.login}>Krish</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.inputView}>
                        <Text style={styles.login}>Maya</Text>
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


