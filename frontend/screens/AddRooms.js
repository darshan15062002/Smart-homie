import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
} from 'react-native';
import { defaultstyling } from '../styles/style';
import Header from '../components/Header';
import * as ImagePicker from 'expo-image-picker';



import { Button, Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { createDevices, createRoom, loadDevice } from '../redux/actions/otherAction';

import DropDownPicker from 'react-native-dropdown-picker';
import { useMessageAndErrorOther } from '../utils/hooks/useMessageAndError';
import { useNavigation } from '@react-navigation/native';
import { Mime } from 'mime';
import mime from 'mime';

const dummyImage = 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/featured-image-kitchen-layouts.jpg'
const AddRooms = () => {
    const [roomImage, setRoomImage] = useState(null);
    const [roomName, setRoomName] = useState('');
    const [boardName, setBoardName] = useState('');
    const [devicess, setDevicess] = useState([]);
    const [deviceName, setDeviceName] = useState('');
    const [deviceGPIO, setDeviceGPIO] = useState('');
    const { devices } = useSelector((state) => state.otherState)
    const [open, setOpen] = useState(false);
    const [selectedDevice, setSelectedDevice] = useState(null);
    const dispatch = useDispatch()
    const navigate = useNavigation()

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        })();
    }, []);

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (!permissionResult) return alert("Permission to access gallery is require")
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        setRoomImage(result.assets[0].uri);

    };

    useEffect(() => {
        const addDeviceToRoom = () => {

            if (selectedDevice) {
                const dev = devices.find((device) => device._id === selectedDevice)

                setDevicess([...devicess, dev]);
                setSelectedDevice(null);

            }
        };
        addDeviceToRoom()
    }, [selectedDevice])

    const loading = useMessageAndErrorOther(dispatch, navigate, 'home')

    const removeDeviceFromRoom = (index) => {
        const updatedDevices = [...devicess];
        updatedDevices.splice(index, 1);
        setDevicess(updatedDevices);
    };

    const submitForm = () => {
        console.log("click");
        const myForm = new FormData();

        // Append the roomName
        myForm.append("name", roomName);

        // Append each device ID to the devices array
        devices.forEach(device => {
            myForm.append("devices[]", device._id);
        });

        // Append the image if it exists
        if (roomImage !== "") {
            myForm.append("file", {
                uri: roomImage,
                type: mime.getType(roomImage),
                name: roomImage?.split("/").pop(),
            });

            // Dispatch the action to create the device
            dispatch(createRoom(myForm));
        } else {
            Toast.show({
                type: "error",
                text1: "Please select the Image of your device",
            });
        }
    };






    useEffect(() => {

        dispatch(loadDevice())



    }, []);

    return (
        <View style={defaultstyling}>
            <Header />
            <View style={styles.container}>
                <Card style={styles.imagePickerCard}>
                    <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>

                        <Image
                            source={{ uri: roomImage || dummyImage }}
                            style={styles.roomImage}
                        />

                    </TouchableOpacity>
                </Card>

                <Text style={styles.label}>Place Name:</Text>
                <TextInput
                    style={styles.input}
                    value={roomName}
                    onChangeText={(text) => setRoomName(text)}
                    placeholder="Enter room name"
                />

                {/* <Text style={styles.label}>Board:</Text>
                <TextInput
                    style={styles.input}
                    value={boardName}
                    onChangeText={(text) => setBoardName(text)}
                    placeholder="Enter board name"
                /> */}
                <ScrollView style={styles.deviceList}>
                    <Text style={styles.label}>Added Devices:</Text>
                    {devicess?.map((device, index) => (
                        <View key={index} style={styles.deviceItem}>
                            <Text style={styles.deviceItemText}>{device?.name}</Text>
                            <TouchableOpacity
                                style={styles.removeButton}
                                onPress={() => removeDeviceFromRoom(index)}>
                                <Text style={styles.removeButtonText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
                <Text style={styles.label}>Add Device:</Text>
                <View
                    style={{

                        alignItems: 'center',
                        justifyContent: 'center',

                    }}>
                    <DropDownPicker
                        onOpen={() => setOpen(true)}
                        items={devices.map((device, index) => ({
                            label: device.name,
                            value: device._id,
                        }))}
                        placeholder={'Select device'}
                        open={open}
                        setOpen={setOpen}
                        defaultValue={selectedDevice}
                        containerStyle={{ height: 40 }}

                        value={selectedDevice}
                        setValue={setSelectedDevice}

                    />


                </View>
                <Button loading={loading} style={styles.addButton} onPress={submitForm} disabled={loading}>
                    <Text style={{
                        fontWeight: '700',
                        fontSize: 20,
                        color: 'white'
                    }}>
                        Submit
                    </Text>
                </Button>

            </View>
        </View >
    );
};

const styles = StyleSheet.create({

    pickerItemText: {
        color: 'red', // or any color you prefer
    },
    pickerStyles: {
        width: '100%',
        color: 'red', // or any color you prefer
    },

    imagePickerCard: {
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 20,
    },
    roomImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    roomImagePlaceholder: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },

    imagePickerCard: {

        height: 150,
        borderRadius: 10,
        overflow: 'hidden',
        marginTop: 10,

    },
    roomImagePlaceholder: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    container: {
        marginTop: 30,
        padding: 20,
    },
    imagePicker: {
        alignItems: 'center',
        marginBottom: 20,
    },
    roomImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
    },
    imagePickerText: {
        fontSize: 16,
        color: '#E9B430',
    },
    label: {
        fontSize: 18,
        fontWeight: '700',
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E9B430',
        borderRadius: 8,
        padding: 10,
        marginTop: 2,
    },
    deviceList: {
        height: 100,
        maxHeight: 100,
        marginTop: 10,
    },
    deviceItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    deviceItemText: {
        fontSize: 16,
        color: 'black',
    },
    removeButton: {
        backgroundColor: 'red',
        borderRadius: 8,
        padding: 5,
    },
    removeButtonText: {
        color: 'white',
        fontWeight: '700',
    },
    deviceInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    deviceInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#E9B430',
        borderRadius: 8,
        padding: 10,
        marginTop: 5,
    },
    addButton: {
        backgroundColor: '#E9B430',
        borderRadius: 8,
        marginTop: 30,
        padding: 10,
    },
    addButtonText: {
        color: 'white',
        fontWeight: '700',
    },
    submitButton: {
        backgroundColor: '#E9B430',
        borderRadius: 8,
        marginTop: 20,
        padding: 15,
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 18,
    },
});

export default AddRooms;
