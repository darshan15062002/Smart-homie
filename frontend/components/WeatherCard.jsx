import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

const WeatherCard = ({ navigation }) => {
    const [userLocation, setUserLocation] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const [locationName, setLocationName] = useState('');

    useEffect(() => {
        Location.requestForegroundPermissionsAsync().then((permission) => {
            if (permission.granted) {
                Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High }).then(
                    (location) => {
                        setUserLocation(location);
                        fetchLocationName(location.coords.latitude, location.coords.longitude);
                        fetchWeatherData(location.coords.latitude, location.coords.longitude);
                    }
                );
            }
        });
    }, []);

    const fetchLocationName = async (latitude, longitude) => {
        const opencageApiKey = '01f1119ebd8540c0ae0e79d632c7f832';
        const opencageApiEndpoint = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${opencageApiKey}`;

        try {
            const response = await fetch(opencageApiEndpoint);
            const data = await response.json();

            if (data.results && data.results.length > 0) {
                const result = data.results[0];
                setLocationName(result.formatted);
            }
        } catch (error) {
            console.error('Error fetching location data:', error.message);
        }
    };

    const fetchWeatherData = async (latitude, longitude) => {
        const apiKey = 'dc99b3ce453067ba78956c8e01a2a44f'; // Replace with your OpenWeather API key
        const apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(apiEndpoint);
            const data = await response.json();

            setWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error.message);
        }
    };

    return (
        <View style={styles.headerContainer}>
            <Text style={{ fontWeight: '700', fontSize: 24 }} >My Location</Text>
            {locationName && (
                <Text >
                    {locationName.split(",")[1]} {locationName.split(",")[2]}
                </Text>
            )}

            {weatherData && weatherData.weather && weatherData.main && (
                <Text style={styles.headerText}>
                    Weather: {weatherData?.weather[0]?.description}, Temperature: {weatherData.main.temp}°C
                </Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#E9B430',
        height: 120,
        justifyContent: 'center',
        alignItems: 'start',
        paddingHorizontal: 20,
        marginTop: 50,
        borderRadius: 20,
    },
    headerText: {
        fontSize: 16,
        fontWeight: '500',
        marginVertical: 5,
    },
});

export default WeatherCard;
