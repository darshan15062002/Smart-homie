import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Avatar, Button, Switch } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
// import { createOutput } from '../utils/api'; // Adjust the import based on your API structure
import { useMessageAndErrorOther } from '../utils/hooks/useMessageAndError';
import { color, defaultstyling } from '../styles/style';
import Header from '../components/Header';
import { createDevices } from '../redux/actions/otherAction';
import * as ImagePicker from 'expo-image-picker'
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import mime from 'mime'
const AddDevice = () => {
    const navigate = useNavigation();
    const dispatch = useDispatch();
    const [image, setImage] = useState()
    const [deviceName, setDeviceName] = useState('');
    const [board, setBoard] = useState('');
    const [gpio, setGpio] = useState('');
    const [state, setState] = useState(false);

    const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwaGDpoZoEXXKCsAZ2E1AbPaBIz9_qK5CCp9liXx1nv7eEMDu9Na8WiaR1tg&s'

    const handleAddDevice = async () => {

        const myForm = new FormData();
        myForm.append("name", deviceName)
        myForm.append("board", board)
        myForm.append("gpio", gpio)
        myForm.append("state", state)

        if (image !== "") {
            myForm.append("file", {
                uri: image,
                type: mime.getType(image),
                name: image?.split("/").pop(),
            })
            dispatch(createDevices(myForm))
        } else {
            Toast.show({
                type: "error",
                text1: "Please select the Image of your device"
            })
        }

    };

    const loading = useMessageAndErrorOther(dispatch, navigate, 'home')


    const openImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (!permissionResult) return alert("Permission to access gallery is require")

        const data = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        })
        setImage(data.assets[0].uri)
    }

    return (
        <View style={defaultstyling}>
            <Header />
            <View style={styles.scrollContainer}>
                <Text style={styles.heading}>Add Device</Text>

                <View style={{ backgroundColor: "#E9B430", paddingTop: 10 }} >
                    <Avatar.Image icon={'image'} style={{
                        alignSelf: 'center', backgroundColor: color.color2
                    }} size={80} source={{ uri: image || defaultImage }} />

                    <TouchableOpacity activeOpacity={0.8} onPress={openImagePicker}>
                        <Button textColor={color.color2}>Change Photo</Button>
                    </TouchableOpacity>
                </View>
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
                <Button loading={loading} mode="contained" style={styles.addButton} onPress={handleAddDevice} disabled={!deviceName || !board || !gpio || !state}>
                    <Text style={{
                        fontWeight: '700',
                        fontSize: 20,
                        color: 'white'
                    }}>
                        Add Device
                    </Text>
                </Button>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container2: {
        position: 'relative',
        elevation: 7,
        marginTop: 20,
        backgroundColor: color.color3,
        padding: 30,
        alignItems: 'center',
        borderRadius: 10,
    },
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
        top: 30,
        gap: 10,
        shadowColor: 'black',
        width: '100%',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 30
    },
    heading: {
        fontSize: 24,

        fontWeight: '900',
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#EEF5FF',
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
