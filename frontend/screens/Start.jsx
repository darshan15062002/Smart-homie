import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { defaultstyling } from '../styles/style'
import Header from '../components/Header'
import ideabg1 from '../assets/ideabg1.png'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const Start = () => {
    const navigate = useNavigation()
    const { user } = useSelector((state) => state.user)

    const handleStart = () => {
        if (user) {
            navigate.navigate('home')
        }
        else {
            navigate.navigate('login')
        }

    }
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Smart Home Automation HOMIE!</Text>
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={ideabg1} // Replace with the actual path to your image
                    style={styles.imageStyle}
                />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleStart}>


                <Text style={styles.buttonText}>Get Started</Text>

            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        ...defaultstyling,
    },
    headerContainer: {
        paddingTop: 40,
        width: '100%',
        height: 150,
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',

    },
    headerText: {
        fontSize: 25,
        textAlign: 'center',
        fontWeight: '900',
    },
    imageContainer: {

        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        width: 200, // Adjust the width of the image as needed
        height: 300, // Adjust the height of the image as needed
        marginRight: 10, // Add some spacing between the image and text
    },
    button: {
        backgroundColor: '#E9B430',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 100,
        padding: 5,
        paddingVertical: 20,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 28
    },
});

export default Start