import { Text, StyleSheet, View, TouchableOpacity, Alert, ImageBackground } from "react-native";
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import React, { useState, useEffect } from "react";
import CheckBox from "react-native-check-box";
import { Storage } from 'expo-storage';
import { useNavigation } from '@react-navigation/native';

const HealthTab = () => {
    const navigation = useNavigation();
    const [selectedHealthIssue, setSelectedHealthIssue] = useState("");
    const [isChecked5, setIsChecked5] = useState(false);
    const [personalData, setPersonalData] = useState(null);
    const [predictionData, setPredictionData] = useState(null);
    const [aqiData, setAqiData] = useState(null);

    useEffect(() => {
        (async () => {
            await retrievePersonalData();
        })();
    }, []);

    const healthIssues = [
        "respiratory",
        "cardiovascular",
        "cerebrovascular",
        "diabetes",
        "other"
    ];

    const handleHealthIssueSelect = (issue) => {
        setSelectedHealthIssue(issue);
    };

    const handlePrivacyCheck = () => {
        setIsChecked5(!isChecked5);
    };

    const retrievePersonalData = async () => {
        try {
            const data = await Storage.getItem({ key: "personal_data" });
            const aqi = JSON.parse(await Storage.getItem({key: "current_weather"})).aqi;
            if (data) {
                setPersonalData(JSON.parse(data));
            }
            if (aqi) {
                setAqiData(aqi);
            }
        } catch (error) {
            console.error("Error retrieving personal data:", error);
        }
    };

    const getRandomPrediction = () => {
                const randomNumber = Math.floor(Math.random() * 4);
                return randomNumber;
            }

    const handleSave = async () => {
        if (!selectedHealthIssue) {
            Alert.alert('Validation Error', 'Please select a health issue.');
        } else if (!isChecked5) {
            Alert.alert('Validation Error', 'Please agree to the Privacy Agreement.');
        } else {
            setPredictionData({
                "AQI": aqiData,
                "AGE": personalData.age,
                "GENDER": personalData.gender,
                "PREGNANT": personalData.pregnant,
                "HEALTH ISSUE": healthIssues.indexOf(selectedHealthIssue),
                "SMOKING STATUS": personalData.smoking,
                "TRANSPORTATION": personalData.transportation
            });
            // Check if personal data is available
            if (predictionData) {
                // Combine personal data and health issue
                console.log(predictionData);
                try {
                    console.log('sending response');
                    // Send data to the Flask server (you can use fetch or axios)
                    const response = await fetch("http://10.0.2.2:5000/predict", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(predictionData),
                    });

                    if (response.ok) {
                    console.log('response ok');
                        const prediction = await response.json();
                        // Handle the prediction as needed
                        console.log("Prediction:", prediction.prediction);

                        // Redirect to the RecommendationScreen and pass the prediction as a parameter
                        navigation.navigate('Recommendation', { newRecommendation: prediction.prediction });
                    } else {
                        console.log('response failed')
                        // Handle server errors
                        navigation.navigate('Recommendation', { newRecommendation: getRandomPrediction() });
                    }
                } catch (error) {
                    console.error("Error sending data to server:", error);
                    // Handle network errors
                    navigation.navigate('Recommendation', { newRecommendation: getRandomPrediction() });
                }
            } else {
                Alert.alert("Personal Data Error", "Personal data not found.");
            }
        }
    };

    return (
        <ImageBackground style={s.container} source={require("../../assets/unsplash.jpg")}>
            <View>
                <Text style={s.label}>Select one health issue:</Text>
                {healthIssues.map((issue) => (
                    <CheckBox
                        key={issue}
                        isChecked={selectedHealthIssue === issue}
                        onClick={() => handleHealthIssueSelect(issue)}
                        style={s.checkBox}
                        rightText={issue}
                        rightTextStyle={s.checkBoxText}
                    />
                ))}
            </View>
            <View>
                <Text style={s.label}>
                    *If you give correct details, you will get suitable personalized recommendations.
                </Text>
                <CheckBox
                    style={s.checkBox}
                    onClick={() => handlePrivacyCheck()}
                    isChecked={isChecked5}
                    rightText={"I agree with the Privacy Agreement"}
                    rightTextStyle={s.checkBoxText}
                />
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPressIn={() => handleSave()}>
                    <Text style={s.boxText}>Save</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

HealthTab.propTypes = {
    style: ViewPropTypes.style,
};

const s = StyleSheet.create({
    container: {
        flex: 1,
        borderRadius: 5,
        backgroundColor: "white",
        padding: 10,
        marginVertical: 2,
        marginHorizontal: 2,
    },
    row: {
        flexDirection: 'row',
        paddingVertical: 5,
    },
    col: {
        flexDirection: "column",
    },
    label: {
        fontSize: 15,
        color: 'white',
        paddingVertical: 5,
    },
    checkBox: {
        paddingVertical: 10,
    },
    checkBoxText: {
        color: 'white',
    },
    boxText: {
        width: 100,
        height: 50,
        borderRadius: 10,
        backgroundColor: "#D6EFFF",
        textAlign: 'center',
        paddingTop: 10,
        fontSize: 20,
        alignItems: 'center',
    },
});

export default HealthTab;
