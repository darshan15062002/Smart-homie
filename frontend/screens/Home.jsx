import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { color, defaultstyling } from '../styles/style'
import Header from '../components/Header'

import { Avatar, Button } from 'react-native-paper'


import { useDispatch, useSelector } from 'react-redux'
import { useMessageAndError } from '../utils/hooks/useMessageAndError'
import { useNavigation } from '@react-navigation/native'




const Home = ({ navigation }) => {
    const [active, setActive] = useState(false)
    const navigate = useNavigation()
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const loading = useMessageAndError(navigation, dispatch, "login")

    return (
        <View style={defaultstyling}>
            <Header />
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                    {user?.name}
                </Text>
                <Text style={styles.headerText2}>
                    {user?.email}
                </Text>

            </View>

            <View style={styles.headingContainer2}>
                <Text style={{
                    fontSize: 24, color: '#E9B430', fontWeight: '900'
                }}>My</Text>
                <Text style={{
                    fontSize: 24,
                    fontWeight: '900',
                    fontFamily: 'Roboto'
                }}>Home</Text>
            </View>

            <View style={{ ...styles.headingContainer2, justifyContent: 'space-around', marginTop: 10 }}>
                <Button onPress={() => setActive(false)}>
                    <Text style={{
                        fontSize: 18, color: '#E9B430', fontWeight: '900', borderBottomWidth: 2, borderBottomColor: '#E9B430'
                    }}>Devices</Text>
                </Button>
                <Button onPress={() => setActive(true)} >
                    <Text
                        onPress={() => setActive(true)}
                        style={{
                            fontSize: 18,
                            fontWeight: '900',
                            fontFamily: 'Roboto',
                            color: 'black',
                        }}>Add More</Text>
                </Button>
            </View>
            <View style={{ flex: 1, width: '100%' }}>

                {active ? (
                    <View style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => navigate.navigate('adddevice')}   >
                            <Avatar.Icon icon={'plus'} color={color.color3} size={200} style={{ backgroundColor: color.color4, borderWidth: 2, borderRadius: 100, borderColor: '#E9B430' }} />
                        </TouchableOpacity>
                    </View>
                ) : (<ScrollView showsVerticalScrollIndicator={false}>


                </ScrollView>)
                }
            </View>




        </View>
    )
}
const styles = StyleSheet.create({
    headerContainer: {

        backgroundColor: '#E9B430',
        height: 100,
        justifyContent: 'center',
        alignItems: 'start',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 50,
        borderRadius: 30,
    },
    headerText: {
        fontSize: 20,
        fontWeight: '700'

    },
    headerText2: {
        fontSize: 20,
        fontWeight: '400'

    },
    headingContainer2: {
        flexDirection: 'row',

        gap: 10,
        top: 20,
        justifyContent: 'center',
    }
})

export default Home