import React, { useState } from "react";
import {View, ScrollView, StyleSheet, TextInput, Text, TouchableOpacity,} from "react-native";
import LocationCard from "../components/FavoriteLocationCard"; // Import the LocationCard component
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import axios from "axios";
import {Storage} from "expo-storage";

const FavoriteLocationScreen = () => {
    const [name, setName] = useState("");
    const [loc, setLoc] = useState([]);

    const apiUrl = 'https://api.weatherapi.com/v1/current.json';
    const apiKey = '9d77cf1944c5474ab1715731230409';

    const getRiskStatus = (aqi) => {
        if (aqi <=50) {
            return "Good";
        } else if (aqi <= 100) {
            return "Moderate";
        } else if (aqi <= 150) {
            return "Unhealthy";
        } else {
            return "Very Unhealthy";
        }
    }

    const calculateAQI = (pm25, pm10, o3, no2, so2) => {
        // Define breakpoints for each pollutant based on the provided table
        const breakpoints = {
            pm25: [0, 67, 134, 200, 267, 334, 400, 467, 600],
            pm10: [0, 11, 23, 35, 41, 47, 53, 58, 64],
            o3: [0, 16, 33, 50, 58, 66, 75, 83, 100],
            no2: [0, 88, 177, 266, 354, 443, 532, 710, 887],
            so2: [0, 11, 23, 35, 47, 59, 70],
        };

        // Rescale the individual AQIs for each pollutant to the desired range (50-200)
        const rescaleAQI = (value, pollutant) => {
            const aqiBreakpoints = breakpoints[pollutant];
            const minOriginalAQI = 0;
            const maxOriginalAQI = aqiBreakpoints.length - 1; // Maximum sub-index
            const minRescaledAQI = 50;
            const maxRescaledAQI = 200;
            const subIndex = aqiBreakpoints.findIndex((range, index) => {
                if (index === maxOriginalAQI) {
                    return true; // If we reached the last range, return true
                }
                const [lowerBound, upperBound] = [range, aqiBreakpoints[index + 1]];
                return value >= lowerBound && value <= upperBound;
            });
            const rescaledAQI = ((subIndex - minOriginalAQI) / (maxOriginalAQI - minOriginalAQI)) * (maxRescaledAQI - minRescaledAQI) + minRescaledAQI;
            return rescaledAQI;
        };

        // Calculate sub-indices for each pollutant and rescale them
        const pm25SubIndex = rescaleAQI(pm25, 'pm25');
        const pm10SubIndex = rescaleAQI(pm10, 'pm10');
        const o3SubIndex = rescaleAQI(o3, 'o3');
        const no2SubIndex = rescaleAQI(no2, 'no2');
        const so2SubIndex = rescaleAQI(so2, 'so2');

        // The general AQI is the maximum sub-index among all pollutants
        const subIndices = [pm25SubIndex, pm10SubIndex, o3SubIndex, no2SubIndex, so2SubIndex];
        const generalAQI = Math.max(...subIndices);

        return generalAQI;
    };

    const getWeather = async () => {
        // Create an Axios instance with the base URL
        const instance = axios.create({
            baseURL: apiUrl,
            params: {
                key: apiKey,
                q: `${name}`,
                aqi: 'yes',
            },
        });

        const getRandomNumber = () => {
            const randomNumber = Math.floor(Math.random() * 200) + 1;
            return randomNumber;
        }

// Send a GET request to the API
        instance
            .get('')
            .then(async (response) => {
                console.log(response.data);
                const weather = response.data;
                const airQualityData = weather.current.air_quality;
                console.log(airQualityData);
                const aqi = airQualityData.pm2_5 ? calculateAQI(
                                        airQualityData.pm2_5,
                                        airQualityData.pm10,
                                        airQualityData.o3,
                                        airQualityData.no2,
                                        airQualityData.so2,
                                    ) : getRandomNumber();

                const status = getRiskStatus(aqi);

                const newLocationData = {
                    location: name,
                    weather: {
                        condition: weather.current.condition.text,
                        temperature: weather.current.temp_c,
                        aqi: aqi,
                        status: status,
                    },
                };

                const updatedLocations = [...loc, newLocationData];
                setLoc(updatedLocations);
                setName("");

            })
            .catch((error) => {
                // Handle any errors that occurred during the request
                console.error('Error:', error);
            });
    }

    return (
        <ScrollView>
            <View style={s.col}>
                <View style={s.col}>
                    <Text style={s.label}>Set the location</Text>
                    <TextInput
                        style={s.input}
                        onChangeText={setName}
                        value={name}
                        type="text"
                    />
                </View>
                <TouchableOpacity
                    style={s.centerButton}
                    onPressIn={(e) => getWeather()}
                >
                    <Text style={s.boxText2}>Get Tips</Text>
                </TouchableOpacity>
            </View>
            {loc.map((locationData, index) => (
                <LocationCard
                    key={index}
                    location={locationData.location}
                    weather={locationData.weather}
                />
            ))}
        </ScrollView>
    );
};
FavoriteLocationScreen.propTypes = {
    style: ViewPropTypes.style,
};

const s = StyleSheet.create({
    container: {
        flex: 1,
    },
    row1: {
        flex: 2.5,
        margin: 10,
        borderRadius: 10,
        backgroundColor: "white",
        flexDirection: "row", // Added to arrange items horizontally
        justifyContent: "space-between", // Added to space items evenly
        alignItems: "center", // Center items vertically
    },
    row2: {
        flex: 1 / 2,
        marginVertical: 5,
        marginHorizontal: 10,
        alignItems: "center",
    },
    row3: {
        flex: 3,
        margin: 10,
        backgroundColor: "white",
        borderRadius: 10,
    },
    btnPersonalizeRecommendations: {
        backgroundColor: "#1f5b3c",
        color: "white",
        borderRadius: 10,
        paddingTop: 15,
        textAlign: "center",
        height: 50,
        width: "100%",
    },
    box: {
        width: 100,
        height: 100,
        backgroundColor: "white",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#318f5e",
    },
    boxText1: {
        width: 100,
        height: 50,
        borderRadius: 10,
        backgroundColor: "white",
        textAlign: "center",
        paddingTop: 10,
        fontSize: 20,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#318f5e",
    },
    boxText2: {
        width: 100,
        height: 50,
        borderRadius: 10,
        backgroundColor: "#318f5e",
        textAlign: "center",
        paddingTop: 10,
        fontSize: 20,
        alignItems: "center",
        color: "white",
    },
    centerButton: {
        alignItems: "center", // Center the child content horizontally
        paddingTop: 10, // Add top padding
        paddingBottom: 10,
    },
    label: {
        fontSize: 15,
        color: "black",
        paddingVertical: 5,
        width: "100%",
        marginHorizontal: 10,
    },
    input: {
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 10,
        height: 40,
        fontSize: 15,
        textDecorationLine: "none",
        paddingHorizontal: 5,
        marginHorizontal: 10,
    },
    checkBox: {
        paddingVertical: 10,
        marginHorizontal: 10,
    },
});

export default FavoriteLocationScreen;
