import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
// import { createOutput } from '../utils/api'; // Adjust the import based on your API structure
import { useMessageAndError } from '../utils/hooks/useMessageAndError';
import { defaultstyling } from '../styles/style';
import Header from '../components/Header';

const AddDevice = () => {
    const navigate = useNavigation();
    const dispatch = useDispatch();

    const [deviceName, setDeviceName] = useState('');
    const [board, setBoard] = useState('');
    const [gpio, setGpio] = useState('');
    const [state, setState] = useState('');

    const handleBack = () => {
        navigate.goBack();
    };

    const handleAddDevice = async () => {
        // try {
        //     // Call your API function to create a new output/device
        //     await createOutput(deviceName, board, gpio, state);
        //     // Handle success, e.g., show a success message or navigate to another screen
        //     console.log('Device added successfully');
        // } catch (error) {
        //     // Handle error, e.g., show an error message
        //     console.error('Error adding device:', error.message);
        // }
    };

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
                <TextInput
                    label="State"
                    placeholder="Enter state"
                    value={state}
                    onChangeText={setState}
                    style={styles.input}
                />
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
});

export default AddDevice;
