import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { color, defaultstyling } from '../styles/style'
import Header from '../components/Header'

import { Avatar, Button, Card, IconButton, Modal, Paragraph, Portal, Provider, Switch, Title } from 'react-native-paper'


import { useDispatch, useSelector } from 'react-redux'
import { useMessageAndError, useMessageAndErrorOther } from '../utils/hooks/useMessageAndError'
import { useNavigation } from '@react-navigation/native'
import { deleteDevice, loadDevice, updateDevice } from '../redux/actions/otherAction'




const Home = ({ navigation }) => {
    const [active, setActive] = useState(false)
    const [selectedDevice, setSelectedDevice] = useState(null); // To store the device selected for deletion
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);

    const navigate = useNavigation()

    const { user } = useSelector((state) => state.user)
    const { devices } = useSelector((state) => state.otherState)
    const dispatch = useDispatch()



    const handleUpdateDevice = async (id, state) => {
        console.log(id, state);
        await dispatch(updateDevice(id, state))
        await dispatch(loadDevice())
    }

    const handleDeleteDevice = (device) => {
        setSelectedDevice(device);
        setDeleteModalVisible(true);
    };

    const confirmDelete = () => {
        if (selectedDevice) {
            dispatch(deleteDevice(selectedDevice._id));
            setDeleteModalVisible(false);
            setSelectedDevice(null);
            dispatch(loadDevice());
        }
    };


    useEffect(() => {
        dispatch(loadDevice())
        setActive(false)
    }, [navigation])
    return (
        <Provider>
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
                    ) : (<ScrollView showsVerticalScrollIndicator={false} >
                        <View style={{
                            marginTop: 20,
                            paddingHorizontal: 20,
                            display: "flex",
                            gap: 5,
                            paddingVertical: 20
                        }}>

                            {devices?.map((device, index) => (
                                <Card key={index} style={styles.card}>
                                    <Card.Content>
                                        <Title>{device.name}</Title>
                                        <Paragraph>Connected at Pin: {device.gpio} | Board: {device.board}</Paragraph>
                                        {/* You can add more information here */}
                                    </Card.Content>
                                    <Card.Actions>
                                        <Text>Off</Text>
                                        <Switch
                                            value={device.state} // Assuming device.state represents the on/off state
                                            onValueChange={(value) => handleUpdateDevice(device._id, value)}
                                            color="#E9B430"
                                        />
                                        <Text>On</Text>


                                    </Card.Actions>
                                    <IconButton
                                        icon="delete"
                                        color="#E9B430"
                                        style={{ position: 'absolute', top: 0, right: 5 }}
                                        onPress={() => handleDeleteDevice(device)}
                                    />
                                </Card>
                            ))

                            }
                        </View>

                    </ScrollView>

                    )
                    }
                </View>
                {/* Confirmation modal */}

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
    card: {
        margin: 10,
        padding: 10,
        backgroundColor: '#fff', // Card background color
        borderRadius: 10,
        elevation: 3, // Card shadow
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

})

export default Home