import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Avatar, Button, TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { color, defaultstyling } from '../styles/style';
import ideabg3 from '../assets/ideabg3.png'
import { useDispatch } from 'react-redux'
import { register } from '../redux/actions/userAction';
const Register = () => {
    const navigate = useNavigation()
    const dispatch = useDispatch()
    const [text, setText] = useState("");
    const [name, setName] = useState("")
    const [password, setPassword] = useState("");


    const disabledBtn = !name || !text || !password
    const handleBack = () => {
        navigate.navigate('login')
    }

    const handleSignUp = () => {
        // const myForm = new FormData();
        // myForm.append("name", name)
        // myForm.append("email", text)
        // myForm.append("password", password)
        dispatch(register({ name, email: text, password }));
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
            <View style={{ alignItems: 'center', justifyContent: 'center', top: 60 }}>
                <Text style={{ fontSize: 24, marginBottom: 10, fontWeight: '900', }}>Welcome Onboard!</Text>
                <View style={styles.imageContainer}>
                    <Image
                        source={ideabg3} // Replace with the actual path to your image
                        style={styles.imageStyle}
                    />
                </View>
            </View>


            <ScrollView vertical showsVerticalScrollIndicator={false} contentContainerStyle={{
                top: 70, gap: 10, marginHorizontal: 20
            }} >
                <TextInput
                    label="Name"
                    value={name}
                    onChangeText={name => setName(name)}

                />
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
                <Button style={styles.button} onPress={handleSignUp} uppercase textColor='white'>
                    <Text style={{
                        fontWeight: '700',
                        fontSize: 20
                    }}>Register</Text>
                </Button>
                <View style={{ alignItems: 'flex-start' }}>
                    <Button onPress={() => navigate.navigate('login')}> I am already Registered</Button>
                </View>
            </ScrollView>



        </View>
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


export default Register