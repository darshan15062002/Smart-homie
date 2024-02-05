import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { color, defaultstyling } from '../styles/style'
import Header from '../components/Header'
import { Avatar, Button, Card, IconButton, Modal, Paragraph, Portal, Provider, Switch, Title } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { useMessageAndError, useMessageAndErrorOther } from '../utils/hooks/useMessageAndError'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { deleteDevice, loadDevice, loadRoom, turnOnRoom, updateDevice } from '../redux/actions/otherAction'

import WeatherCard from '../components/WeatherCard'
import DeviceCard from '../components/DeviceCard'





const Home = () => {
    const [active, setActive] = useState(false)
    const [selectedDevice, setSelectedDevice] = useState(null); // To store the device selected for deletion
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const isFocused = useIsFocused()
    const { rooms } = useSelector((state) => state.otherState)
    const navigate = useNavigation()
    const { devices } = useSelector((state) => state.otherState)
    const dispatch = useDispatch()



    const handleUpdateDevice = (id, state) => {

        dispatch(updateDevice(id, state))
        dispatch(loadDevice())
    }

    const handleDeleteDevice = (device) => {
        setSelectedDevice(device);
        setDeleteModalVisible(true);
        dispatch(loadDevice())
    };

    const confirmDelete = () => {
        if (selectedDevice) {
            dispatch(deleteDevice(selectedDevice._id));
            setDeleteModalVisible(false);
            setSelectedDevice(null);
            dispatch(loadDevice());
        }
    };

    const handleUpdateRoom = (id, state) => {

        dispatch(turnOnRoom(id, state));
        dispatch(loadRoom())
        dispatch(loadDevice())
    };





    useEffect(() => {
        isFocused && dispatch(loadRoom());
        isFocused && dispatch(loadDevice())



    }, [dispatch, isFocused, useNavigation]);
    return (
        <Provider>
            <View style={defaultstyling}>

                <Header />

                <WeatherCard />


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

                <View style={{ ...styles.headingContainer2, justifyContent: 'space-around', marginVertical: 10 }}>
                    <Button onPress={() => setActive(false)} >
                        <Text style={{
                            fontSize: 18, color: `${!active ? '#E9B430' : 'black'}`, fontWeight: '900',
                        }}>Rooms</Text>
                    </Button>
                    <Button onPress={() => setActive(true)} >
                        <Text
                            onPress={() => setActive(true)}
                            style={{
                                fontSize: 18,
                                fontWeight: '900',
                                fontFamily: 'Roboto',
                                color: `${active ? '#E9B430' : 'black'}`,
                            }}>Devices</Text>
                    </Button>
                </View>
                <View style={{ flex: 1, width: '100%' }}>

                    {active ? (

                        <ScrollView showsVerticalScrollIndicator={false}>
                            <View style={styles.cardContainer}>
                                {devices?.map((device) => (
                                    <DeviceCard
                                        key={device._id}  // Assuming device._id is a unique identifier
                                        device={device}
                                        id={device._id}
                                        handleDeleteDevice={handleDeleteDevice}
                                        handleUpdateDevice={handleUpdateDevice}
                                    />
                                ))}
                                <View style={styles.card} key={"cnlbkhvmvdas"}>
                                    <TouchableOpacity onPress={() => navigate.navigate('adddevice')}>
                                        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: 'gray', fontWeight: '800', marginBottom: 10 }}>Add Devices</Text>
                                            <Avatar.Icon icon={'plus'} color={color.color3} size={50} style={{ backgroundColor: color.color4, borderWidth: 2, borderRadius: 100, borderColor: '#E9B430' }} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>


                    ) : (<ScrollView showsVerticalScrollIndicator={false} >
                        <View style={styles.cardContainer}>
                            {rooms?.map((device, index) => (
                                <>
                                    <DeviceCard device={device} key={device._id} id={device._id} handleDeleteDevice={() => { }} handleUpdateDevice={handleUpdateRoom} />

                                </>
                            ))}
                            <View style={styles.card} key={"adjkdbljbcflshds"}>

                                <TouchableOpacity onPress={() => navigate.navigate('addrooms')}  >
                                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'gray', fontWeight: '800', marginBottom: 10 }}>Add Places</Text>
                                        <Avatar.Icon icon={'plus'} color={color.color3} size={50} style={{ backgroundColor: color.color4, borderWidth: 2, borderRadius: 100, borderColor: '#E9B430' }} />
                                    </View>
                                </TouchableOpacity>

                            </View>
                        </View>

                    </ScrollView>

                    )}
                </View>


                <Portal>
                    <Modal
                        visible={deleteModalVisible}
                        onDismiss={() => setDeleteModalVisible(false)}
                        contentContainerStyle={styles.modalContainer}>
                        <Text style={styles.modalText}>Are you sure you want to delete this device?</Text>
                        <Button mode="contained" onPress={confirmDelete} style={styles.confirmButton}>
                            Confirm
                        </Button>
                        <Button mode="outlined" onPress={() => setDeleteModalVisible(false)} style={styles.cancelButton}>
                            Cancel
                        </Button>
                    </Modal>
                </Portal>



            </View >
        </Provider>
    )
}
const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginBottom: 10,
        paddingHorizontal: 5,
        paddingVertical: 10, // Add padding to the container
        marginTop: 10,
    },
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
    },

    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
    },
    confirmButton: {
        marginTop: 10,
        backgroundColor: '#E9B430',
    },
    cancelButton: {
        marginTop: 10,
        borderColor: '#E9B430',
        borderWidth: 1,
    },
    card: {
        margin: 0,
        padding: 0,
        height: 130,
        width: '47%', // Adjust width to leave some space between cards
        marginBottom: 10,
        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center', backgroundColor: '#F2F1EB',
        elevation: 3,
        borderRadius: 0
    }

})

export default Home