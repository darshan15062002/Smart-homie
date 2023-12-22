import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import React from 'react'
import { color, defaultstyling } from '../styles/style'
import { Avatar } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import {

    BarChart,

} from "react-native-chart-kit";
import { useNavigation } from '@react-navigation/native'
import { logout } from '../redux/actions/userAction'
import { useMessageAndError } from '../utils/hooks/useMessageAndError'
const screenWidth = Dimensions.get("screen").width - 60
const Profile = () => {
    const dispatch = useDispatch()
    const navigate = useNavigation()
    const { user } = useSelector((state) => state.user)
    const handleBack = () => {

        navigate.navigate('home')
    }
    const chartConfig = {
        backgroundGradientFrom: '#ffffff', // Set the background gradient color
        backgroundGradientTo: '#ffffff', // Set the background gradient color
        color: (opacity = 1) => `black`, // Set the bar color
        labelColor: (opacity = 1) => `black`, // Set the label color
        yAxisLabel: 'kWh',
    }


    const data = {
        labels: [
            "January", "February", "March",
            "April", "May", "June",
            "July", "August", "September",
            "October", "November", "December"
        ],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43, 60, 75, 90, 40, 30, 55],
                color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`,
            },
        ],
    };
    const loading = useMessageAndError(dispatch, navigate,)


    const logoutHandler = () => {
        dispatch(logout())

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
            {/*--------------------------- */}
            <View style={styles.headingContainer2}>
                <Text style={{
                    fontSize: 24, color: '#E9B430', fontWeight: '900'
                }}>My</Text>
                <Text style={{
                    fontSize: 24,
                    fontWeight: '900',
                    fontFamily: 'Roboto'
                }}>Profile</Text>
            </View>

            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>
                    {user?.name}
                </Text>
                <Text style={styles.headerText2}>
                    {user?.email}
                </Text>
                <TouchableOpacity style={{ position: 'absolute', right: 5 }} onPress={logoutHandler}   >
                    <Avatar.Icon icon={'logout'} color={color.color3} style={{ backgroundColor: color.color4, borderWidth: 2, borderRadius: 100, borderColor: '#E9B430' }} />
                </TouchableOpacity>
            </View>
            <View style={styles.headingContainer2}>
                <Text style={{
                    fontSize: 24, color: '#E9B430', fontWeight: '900'
                }}>Energy</Text>
                <Text style={{
                    fontSize: 24,
                    fontWeight: '900',
                    fontFamily: 'Roboto'
                }}>Usage</Text>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View style={styles.chartContainer}>
                    <BarChart
                        style={{ borderRadius: 20, padding: 20, backgroundColor: '#ffffff', color: 'black' }}
                        data={data}
                        width={screenWidth + 200} // Ensure that the width is greater than the combined width of all bars
                        height={250}

                        chartConfig={chartConfig}
                        verticalLabelRotation={30}
                        barPercentage={0.7} // Adjust this value to prevent overlap
                        barRadius={5} // Adjust this value to prevent overlap


                    />
                </View>

            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    chartContainer: {
        top: 20,
        flex: 1,
        justifyContent: 'center',


    },

    headerContainer: {

        backgroundColor: '#E9B430',
        height: 100,
        top: 40,
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
        top: 70,
        justifyContent: 'center',
    }
})

export default Profile