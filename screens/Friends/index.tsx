import { array } from 'prop-types';
import * as React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text, ScrollView } from 'react-native';

export default class Friends extends React.Component<{}, {friends: Array<Object>, selected: ObjectId}> {
        constructor(props, { navigation }){
            super(props);
            console.log(global.race_length);
            this.state = {
                friends : [],
                selected: -1
            }
            this.startRace = this.startRace.bind(this);
        }
        componentDidMount(){
            fetch('https://ghost.ryandavis.tech:8080/friendly-ghost-list', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                km: global.race_length,
                
            })
        }).then((response) => response.json())
            .then((json) => {
                    this.setState({
                        friends: json
                    })
                    
            })
        }

        startRace(){
            global.race_on = true;
            global.opponent_oid = this.state.selected;
            this.props.navigation.navigate('Map');
        }
        render(){
            return(
                <ScrollView>
                    <View style={styles.container}>
                    {
                        this.state.friends.map((item, key) => (
                            <TouchableOpacity key={ item._id }style={styles.inputView} onPress={ () => this.setState({selected: item._id}, () => this.startRace())}>
                                <Text style={styles.login}> { item.username }</Text>
                            </TouchableOpacity>
                        ))
                    }
                    </View>
                </ScrollView>
                    )
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

    inputText: {
        height: 50,
        color: "white"
    },
});


