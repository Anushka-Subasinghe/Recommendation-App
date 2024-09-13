import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import NotificationCard from '../components/NotificationCard';
import { Storage } from 'expo-storage';

const NotificationScreen = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        // Retrieve notifications from AsyncStorage
        const retrieveNotifications = async () => {
            const storedNotifications = await Storage.getItem({key: 'notifications'});
            if (storedNotifications) {
                setData(JSON.parse(storedNotifications));
            }
        };

        retrieveNotifications();
        console.log(data);
    }, []);

    return (
        <View style={s.container}>
            {/* ... Other parts of your code ... */}
            <View style={s.row2}>
                <ScrollView>
                    {data.map((item, ind) => (
                        <NotificationCard key={ind} data={item} count={ind} />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
};

const s = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
      borderRadius: 10,
      backgroundColor: "white",
    },
    row1: {
     flexDirection:'row',
      margin: 10,
      borderRadius: 10,
      backgroundColor: "white",
    },
    row2: {
     
    }, btnPersonalizeRecommendations: {
        backgroundColor: "#1f5b3c",
        color: "white",
        borderRadius: 10,
        paddingTop: 15,
        textAlign: "center",
        height: 50,
        width: '100%',
      },
    
  });
export default  NotificationScreen