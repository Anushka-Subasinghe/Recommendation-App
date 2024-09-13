import React,{useState,useEffect} from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity, ImageBackground, ScrollView
} from "react-native";
import { ViewPropTypes } from 'deprecated-react-native-prop-types';
import { useNavigation } from '@react-navigation/native';
import { Storage } from 'expo-storage'
const HomeScreen = () => {
  const navigation = useNavigation();
  const [location,setLocation] = useState("")
  const [weather, setWeather] = useState({})
 
  const getValueFunction = async () => {
    const locationItem = JSON.parse(
      await Storage.getItem({ key: `current_location` })
    )
    const weatherItem = JSON.parse(
        await Storage.getItem({ key: `current_weather` })
    )
    setLocation(locationItem?.location)
    setWeather(weatherItem);
  };
  useEffect(()=>{
    getValueFunction()
  },[])

  const weatherIcons = {
    Clear: require("../assets/sunny.png"),
    Sunny: require("../assets/sunny.png"),
    Cloudy: require("../assets/cloudy.png"),
    Partly_cloudy: require("../assets/partly-cloudy.png"),
    // Add more weather conditions and images as needed
  };

  function getWeatherIcon(condition) {
    if (weatherIcons.hasOwnProperty(condition)) {
      return weatherIcons[condition];
    } else {
      // If the condition is not found in the icons, show the "rain.png" image
      return require("../assets/rain.png");
    }
  }

  function addUnderscoreBetweenWords(inputString) {
    // Split the input string into an array of words
    const words = inputString.split(' ');

    // Join the words with an underscore between them
    const resultString = words.join('_');

    return resultString;
  }

  return (
      <ImageBackground
          source={require("../assets/background.jpg")} // Add your background image
          style={s.container}
      >
        <View style={s.overlay}>
          <ScrollView>
            {/* Location */}
            <Text style={s.location}>{location ? location : ""}</Text>

            {/* Weather Status */}
            <View style={s.weatherStatus}>
              <View style={s.weatherInfo}>
                <Text style={s.weatherText}>{weather.condition ? weather.condition : "Rain"}</Text>
                <Image source={getWeatherIcon(addUnderscoreBetweenWords(weather.condition ? weather.condition : "Rain"))} style={s.weatherIcon} />
              </View>
              <Text style={s.temperature}>{weather.temperature ? weather.temperature : 25} °C</Text>
              <Text style={s.aqi}>AQI: {weather.aqi ? weather.aqi : 50}</Text>
              <Text
                  style={{
                    ...s.temperature,
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
          </ScrollView>


          {/* Recommendations Button */}
          <TouchableOpacity
              style={s.btnPersonalizeRecommendations}
              onPressIn={(e) => navigation.navigate("Profile")}
          >
            <Text style={s.btnText}>Get Personalized Recommendations</Text>
          </TouchableOpacity>

          {/* Navigation Buttons */}
          <View style={s.navigationButtons}>
            {/* Add your navigation buttons here */}
          </View>
        </View>
      </ImageBackground>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Add an overlay to the background
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    color: "white",
  },
  location: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
    textAlign: "center"
  },
  weatherStatus: {
    alignItems: "center",
    marginTop: 20,
  },
  weatherInfo: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
  },
  weatherText: {
    fontSize: 24,
    color: "white",
    marginRight: 10,
  },
  weatherIcon: {
    width: 120,
    height: 120,
  },
  temperature: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  aqi: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
  },
  btnPersonalizeRecommendations: {
    backgroundColor: "#1F5B3C",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  btnText: {
    color: "white",
    fontSize: 16,
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
});
export default HomeScreen;
