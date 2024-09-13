import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import RecomendationCard from "../components/RecomendationCard";
import { Storage } from "expo-storage";

const RecommendationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState({});
  const [data, setData] = useState([]);

  const getValueFunction = async () => {
    const locationItem = JSON.parse(
        await Storage.getItem({ key: `current_location` })
    );
    const weatherItem = JSON.parse(
        await Storage.getItem({ key: `current_weather` })
    );
    setLocation(locationItem?.location);
    setWeather(weatherItem);
  };

  useEffect(() => {
    getValueFunction();
  }, []);

  const recommendations = [
      "Modify Travel Plans",
      "Wear Masks",
      "Stay Hydrated and Maintain a Healthy Lifestyle",
      "Seek Clean Air Spaces"
  ];

  const recommendationDescriptions = [
    "If possible, consider adjusting your travel plans or routes to minimize exposure to highly polluted areas. Choose alternative modes of transportation like walking, biking, or public transit, which can help reduce personal emissions.",
    "When venturing outdoors during times of high pollution, consider wearing masks that provide effective filtration against fine particles. Look for masks labeled as N95 or N99, which offer higher levels of filtration.",
      "Drink plenty of water to stay hydrated, as it can help flush out toxins from the body. Additionally, maintaining a healthy lifestyle through balanced nutrition, regular exercise, and sufficient sleep can support your overall respiratory health.",
      "Identify areas with better air quality in your vicinity, such as parks, gardens, or green spaces. Consider spending time in these locations when pollution levels are high, as they may offer relatively cleaner air."
  ];

  useEffect(() => {
    // Check if a new recommendation is available and add it to the data array
    const newRecommendation = route.params?.newRecommendation;
    if (newRecommendation) {
      console.log(`new Recommendation ${newRecommendation}`)
      setData((prevData) => [...prevData, newRecommendation]);
    }
  }, [route.params]);

  useEffect(() => {
      // Check if a new recommendation is available and add it to the data array
      const newRecommendation = route.params?.newRecommendation;
      if (newRecommendation) {
        console.log(`new Recommendation ${newRecommendation}`)
        setData((prevData) => [...prevData, newRecommendation]);
      }
    }, []);

  return (
      <View style={s.container}>
        <View style={s.header}>
          <Image source={require("../assets/logo.jpeg")} style={s.logo} />
          <Text style={s.location}>{location}</Text>
        </View>

        <Text style={s.weatherStatus}>{weather.status}</Text>
        <Text style={s.temperature}>{weather.temperature}°C</Text>

        <TouchableOpacity
            style={s.personalizeButton}
            onPress={() => navigation.navigate("Profile")}
        >
          <Text style={s.personalizeButtonText}>Personalize Recommendations</Text>
        </TouchableOpacity>

        <ScrollView style={s.recommendations}>
          {data.map((item, ind) => (
              <RecomendationCard key={ind} data={item} count={ind} title={recommendations[item]} description={recommendationDescriptions[item]} />
          ))}
        </ScrollView>
      </View>
  );
};

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  location: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  weatherStatus: {
    fontSize: 18,
    color: "#555",
    marginTop: 20,
  },
  temperature: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1f5b3c",
  },
  personalizeButton: {
    backgroundColor: "#1f5b3c",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  personalizeButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  recommendations: {
    marginTop: 20,
  },
});

export default RecommendationScreen;