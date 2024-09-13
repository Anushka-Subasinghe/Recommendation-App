import {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Storage } from 'expo-storage';
import RootReducer from './redux/reducers/RootReducer';
import * as Notifications from "expo-notifications";
import HomeScreen from './screens/HomeScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import RecommendationScreen from './screens/RecommendationScreen';
import FavoriteLocationScreen from './screens/FavoriteLocationScreen';
import NotificationScreen from './screens/NotificationScreen';
import axios from 'axios';

// Define the API endpoint
const apiUrl = 'https://api.weatherapi.com/v1/current.json';
const apiKey = '9d77cf1944c5474ab1715731230409';
const coordinates = '5.9533,80.5385';

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

const getWeather = async (latitude, longitude) => {
  // Create an Axios instance with the base URL
  const instance = axios.create({
    baseURL: apiUrl,
    params: {
      key: apiKey,
      q: `${latitude},${longitude}`,
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
        console.log("air Quality Data", airQualityData);
        const aqi = airQualityData.pm2_5 ? calculateAQI(
            airQualityData.pm2_5,
            airQualityData.pm10,
            airQualityData.o3,
            airQualityData.no2,
            airQualityData.so2,
        ) : getRandomNumber();
        console.log(aqi);
        const status = getRiskStatus(aqi);
        console.log(JSON.stringify({temperature: weather.current.temp_c, aqi: aqi, status: status}));
        await Storage.setItem({
          key: `current_weather`,
          value: JSON.stringify({temperature: weather.current.temp_c, feelsLike: weather.current.feelslike_c, aqi: aqi, status: status, condition: weather.current.condition.text}),
        });

      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.error('Error:', error);
      });
}

const store = configureStore({
  reducer: RootReducer,
});

const Tab = createBottomTabNavigator();

export default function App() {
  const [locationData, setLocationData] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      // Initial location retrieval
      let location = await Location.getCurrentPositionAsync();
      let geocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (geocode.length > 0) {
        setLocationData(geocode[0]);
        await Storage.setItem({
          key: `current_location`,
          value: JSON.stringify({ location: geocode[0].city }),
        });

        Notifications.setNotificationHandler({
          handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
          }),
        });

        await getWeather(location.coords.latitude, location.coords.longitude);

        const weatherItem = JSON.parse(
            await Storage.getItem({ key: `current_weather` })
        )

        if (locationData !== null) {
          await sendLocalNotification(`${weatherItem.temperature} ° in ${geocode[0].city}`, `Feels like ${Math.round(weatherItem.feelsLike)} • ${weatherItem.condition}`);
        }

      }

      // Watch for location changes with a 1-minute interval
      const locationWatcher = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Balanced,
            timeInterval: 60000, // Update every 1 minute
          },
          async (newLocation) => {
            // Callback function to handle location changes
            //console.log('Location has changed:', newLocation);

            // Check if the city has changed
            const newGeocode = await Location.reverseGeocodeAsync({
              latitude: newLocation.coords.latitude,
              longitude: newLocation.coords.longitude,
            });
            if (newGeocode.length > 0 && newGeocode[0].city !== locationData?.city) {
              Notifications.setNotificationHandler({
                handleNotification: async () => ({
                  shouldShowAlert: true,
                  shouldPlaySound: true,
                  shouldSetBadge: true,
                }),
              });

              const weatherItem = JSON.parse(
                  await Storage.getItem({ key: `current_weather` })
              )
              await sendLocalNotification(`${weatherItem.temperature} °C in ${newGeocode[0].city}`, `Feels like ${Math.round(weatherItem.feelsLike)} • ${weatherItem.condition}`);
            }

            // Update your state or perform other actions here
            setLocationData(newGeocode[0]);

            await getWeather(location.coords.latitude, location.coords.longitude);
          }
      );

      // Clean up the location watcher when the component unmounts
      return () => {
        if (locationWatcher) {
          locationWatcher.remove();
        }
      };
    })();
  }, []);

  // Function to send a local notification
  const sendLocalNotification = async (title, body) => {
    const notification = { title, body };

    // Retrieve existing notifications from AsyncStorage
    let existingNotifications = await Storage.getItem({key: 'notifications'});
    existingNotifications = existingNotifications ? JSON.parse(existingNotifications) : [];

    // Add the new notification to the list
    existingNotifications.push(notification);

    // Save the updated list of notifications in AsyncStorage
    await Storage.setItem({key: 'notifications', value: JSON.stringify(existingNotifications)});

    await Notifications.scheduleNotificationAsync({
      content: {
        title: title,
    body: body,
  },
    trigger: { seconds: 1 },
  });
  };

return (
      <Provider store={store}>
        <NavigationContainer>
          <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === 'Home') {
                    return <Ionicons name={focused ? 'home' : 'home'} size={size} color={color} />;
                  } else if (route.name === 'Profile') {
                    return <FontAwesome5 name="user" size={size} color={color} />;
                  } else if (route.name === 'Recommendation') {
                    return (
                        <MaterialCommunityIcons name="clipboard-check-outline" size={size} color={color} />
                    );
                  } else if (route.name === 'Locations') {
                    return (
                        <Ionicons name={focused ? 'location' : 'location'} size={size} color={color} />
                    );
                  } else if (route.name === 'Notifications') {
                    return (
                        <Ionicons
                            name={focused ? 'notifications' : 'notifications-outline'}
                            size={size}
                            color={color}
                        />
                    );
                  }
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
                headerTitleStyle: {
                  fontSize: 18,
                  color: '#318f5e',
                },
              })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Profile" component={UserProfileScreen} />
            <Tab.Screen name="Recommendation" component={RecommendationScreen} />
            <Tab.Screen name="Locations" component={FavoriteLocationScreen} />
            <Tab.Screen name="Notifications" component={NotificationScreen} options={{ tabBarBadge: 3 }} />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
  );
}