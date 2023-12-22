import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { Card, IconButton, Paragraph, Switch, Title } from 'react-native-paper'

const DeviceCard = ({ device, id, handleUpdateDevice, handleDeleteDevice }) => {



    return (

        <Card key={id} style={styles.card}>
            {/* Add Image component here */}
            <Image source={{ uri: device?.image?.imgUrl }} style={styles.deviceImage} />

            <View style={{ height: 35, display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, justifyContent: 'space-between' }}>
                <Title style={{ fontSize: 16, fontWeight: '700', color: 'gray' }} >{device.name}</Title>



                <Switch
                    style={{ width: '40%' }}
                    value={device.state} // Assuming device.state represents the on/off state
                    onValueChange={(value) => handleUpdateDevice(device._id, value)}
                    color="#E9B430"
                    size={4}
                />

            </View>

            <IconButton
                icon="delete"
                color={'#E9B430'}
                style={{ position: 'absolute', top: 0, right: 5, color: '#E9B430' }}
                onPress={() => handleDeleteDevice(device)}
            />
        </Card>

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
        margin: 0,
        padding: 0,
        width: '47%', // Adjust width to leave some space between cards
        marginBottom: 10,
        backgroundColor: '#F2F1EB',

        borderRadius: 0

    },
    deviceImage: {
        width: '100%',
        height: 90,
        resizeMode: 'cover',


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
});

export default DeviceCard