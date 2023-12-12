
import React, { useEffect } from 'react'

import Toast from 'react-native-toast-message'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './screens/Home'
import Login from './screens/Login'
import Register from './screens/Register'
import Start from './screens/Start'
import { useDispatch } from 'react-redux'
import { loadUser } from './redux/actions/userAction'
import Profile from './screens/Profile'
import AddDevice from './screens/AddDevice'


const main = () => {
    const dispatch = useDispatch()



    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch])


    const Stack = createNativeStackNavigator()
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='start' screenOptions={{ headerShown: false }}>
                <Stack.Group >
                    <Stack.Screen name='start' component={Start} />
                    <Stack.Screen name='home' component={Home} />
                    <Stack.Screen name='login' component={Login} />
                    <Stack.Screen name='register' component={Register} />
                    <Stack.Screen name='profile' component={Profile} />
                    <Stack.Screen name='adddevice' component={AddDevice} />



                </Stack.Group>


            </Stack.Navigator>
            <Toast position='top' topOffset={80} />

        </NavigationContainer>
    )
}

export default main