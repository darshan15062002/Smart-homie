import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Avatar } from 'react-native-paper'
import { color } from '../styles/style'
import { useNavigation } from '@react-navigation/native'

const Header = ({ currentUser = false }) => {
    const [show, setShow] = useState(false)
    const navigate = useNavigation()
    const handleLogin = () => {
        currentUser ? setShow(true) : navigate.navigate('login')
    }
    return (
        <View style={{ height: 50 }}>
            <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', gap: 10, top: 30 }}>
                <Text style={{
                    fontSize: 24, color: '#E9B430', fontWeight: '900'
                }}>Smart</Text>
                <Text style={{
                    fontSize: 24,
                    fontWeight: '900',
                    fontFamily: 'Roboto'
                }}>Homie</Text>
            </View>
            <TouchableOpacity style={{ position: 'absolute', right: 5, top: 20, zIndex: 100, }} onPress={handleLogin} >
                <Avatar.Icon icon={currentUser ? "account" : "login"} color={color.color3} style={{ backgroundColor: color.color4 }} />
            </TouchableOpacity>
        </View>
    )
}

export default Header