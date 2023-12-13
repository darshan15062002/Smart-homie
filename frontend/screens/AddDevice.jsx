import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Button, Switch } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
// import { createOutput } from '../utils/api'; // Adjust the import based on your API structure
import { useMessageAndError, useMessageAndErrorOther } from '../utils/hooks/useMessageAndError';
import { defaultstyling } from '../styles/style';
import Header from '../components/Header';
import { createDevices } from '../redux/actions/otherAction';

const AddDevice = () => {
    const navigate = useNavigation();
    const dispatch = useDispatch();

    const [deviceName, setDeviceName] = useState('');
    const [board, setBoard] = useState('');
    const [gpio, setGpio] = useState('');
    const [state, setState] = useState(false);


    const handleAddDevice = async () => {
        console.log("add device");
        dispatch(createDevices(deviceName, board, gpio, state))
    };

    const loading = useMessageAndErrorOther(dispatch, navigate, 'home')
    console.log(loading);

    return (
        <View style={defaultstyling}>
            <Header />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.heading}>Add Device</Text>
                <TextInput
                    label="Device Name"
                    placeholder="Enter device name"
                    value={deviceName}
                    onChangeText={setDeviceName}
                    style={styles.input}
                />
                <TextInput
                    label="Board"
                    placeholder="Enter board"
                    value={board}
                    onChangeText={setBoard}
                    style={styles.input}
                />
                <TextInput
                    label="GPIO"
                    placeholder="Enter GPIO"
                    value={gpio}
                    onChangeText={setGpio}
                    style={styles.input}
                />
                <View style={styles.switchContainer}>
                    <Text style={styles.switchLabel}>State</Text>
                    <Switch
                        value={state}
                        onValueChange={(value) => setState(value)}
                        color="#E9B430"
                    />
                </View>
                <Button mode="contained" style={styles.addButton} onPress={handleAddDevice} disabled={!deviceName || !board || !gpio || !state}>
                    <Text style={{
                        fontWeight: '700',
                        fontSize: 20,
                        color: 'white'
                    }}>
                        Add Device
                    </Text>
                </Button>
            </ScrollView>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        left: 5,
        top: 40,
        zIndex: 100,
        backgroundColor: '#E9B430',
    },
    scrollContainer: {
        top: 60,
        gap: 10,
        marginHorizontal: 20,
    },
    heading: {
        fontSize: 24,
        marginBottom: 10,
        fontWeight: '900',
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'white',
        marginBottom: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
    },
    addButton: {
        backgroundColor: '#E9B430',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },

    switchLabel: {
        flex: 1,
        fontSize: 18,
        color: '#333',
    },

    switch: {
        transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }], // Increase the size of the switch
    },
});

export default AddDevice;
