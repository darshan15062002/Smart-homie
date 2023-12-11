import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { color, defaultstyling } from '../styles/style'
import { useNavigation } from '@react-navigation/native'
import { Avatar, Button, TextInput } from 'react-native-paper'
import ideabg2 from '../assets/ideabg2.png'
const Login = () => {
    const navigate = useNavigation()
    const [text, setText] = useState("");
    const [password, setPassword] = useState("");

    const handleBack = () => {
        navigate.navigate('home')
    }
    return (


        <View style={defaultstyling}>
            <TouchableOpacity style={{ position: 'absolute', left: 5, top: 40, zIndex: 100, }} onPress={handleBack}>
                <Avatar.Icon icon={'arrow-left'} color={color.color3} style={{ backgroundColor: color.color4 }} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', gap: 10, top: 30, justifyContent: 'flex-end', right: 15 }}>
                <Text style={{
                    fontSize: 24, color: '#E9B430', fontWeight: '900'
                }}>Smart</Text>
                <Text style={{
                    fontSize: 24,
                    fontWeight: '900',
                    fontFamily: 'Roboto'
                }}>Homie</Text>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'center', top: 70 }}>
                <Text style={{ fontSize: 24, marginBottom: 10, fontWeight: '900', }}>Welcome Back</Text>
                <View style={styles.imageContainer}>
                    <Image
                        source={ideabg2} // Replace with the actual path to your image
                        style={styles.imageStyle}
                    />
                </View>
            </View>



            <View style={{
                top: 100, gap: 10, marginHorizontal: 15
            }} >
                <TextInput
                    label="Email"
                    value={text}
                    onChangeText={text => setText(text)}

                />
                <TextInput
                    label="Password"
                    value={password}
                    onChangeText={password => setPassword(password)}
                />
                <Button style={styles.button} uppercase textColor='white'>
                    <Text style={{
                        fontWeight: '700',
                        fontSize: 20
                    }}>
                        Login</Text>
                </Button>
                <View style={{ alignItems: 'flex-start' }}>
                    <Button onPress={() => navigate.navigate('register')}> I Don't have an Account</Button>
                </View>
            </View>

        </View >



    )


}


const styles = StyleSheet.create({
    button: {
        backgroundColor: '#E9B430',
        paddingHorizontal: 10,
        paddingVertical: 5,

    },
    imageContainer: {

        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        width: 270,
        height: 200,
    },

})

export default Login