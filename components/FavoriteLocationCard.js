import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const LocationCard = ({ location, weather }) => {
    return (
        <LinearGradient
            colors={['#0099FF', '#66CCFF']} // Define your gradient colors
            style={styles.card}
        >
            <View>
                <Text style={styles.location}>{location}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Temperature: {weather.temperature} °C</Text>
                <Text style={styles.infoText}>AQI: {weather.aqi}</Text>
                <Text
                    style={{
                        ...styles.status,
                        color:
                            weather.status === "Good"
                                ? "#92d050"
                                : weather.status === "Moderate"
                                    ? "yellow"
                                    : weather.status === "Unhealthy"
                                        ? "orange"
                                        : "red",
                    }}
                >
                    {weather.status}
                </Text>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
        marginHorizontal: 10, // Add horizontal margins
    },
    location: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
    },
    infoContainer: {
        marginTop: 10,
    },
    infoText: {
        fontSize: 16,
        color: "white",
        marginBottom: 5,
    },
    status: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
});

export default LocationCard;
