import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient from Expo
import { ViewPropTypes } from 'deprecated-react-native-prop-types';

const NotificationCard = ({ count, data }) => {
    const [open, setOpen] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <LinearGradient // Apply a gradient background
                    colors={['#F0F0F0', '#E0E0E0']}
                    style={styles.flex}
                >
                    <Text
                        style={styles.titleText}
                        onPress={() => {
                            setOpen(!open);
                        }}
                    >
                        {data?.title}
                    </Text>
                </LinearGradient>
                {open ? (
                    <Text
                        style={styles.descriptionText}
                        onPress={() => {
                            setOpen(false);
                        }}
                    >
                        {data?.body}
                    </Text>
                ) : (
                    <Text
                        style={styles.seeMoreText}
                        onPress={() => {
                            setOpen(true);
                        }}
                    >
                        See more ...
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

NotificationCard.propTypes = {
    style: ViewPropTypes.style,
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        backgroundColor: 'white',
        marginVertical: 10,
        marginHorizontal: 10,
        borderWidth: 1,
        minHeight: 100,
        elevation: 3, // Add elevation for a shadow effect (Android)
        shadowColor: '#000', // Specify shadow color (iOS)
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    flex: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    titleText: {
        color: 'black',
        fontSize: 20,
        textAlign: 'left',
    },
    descriptionText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'justify',
        padding: 10,
    },
    seeMoreText: {
        color: 'grey',
        fontSize: 16,
        textAlign: 'right',
        padding: 10,
    },
    closeIcon: {
        padding: 10,
    },
});

export default NotificationCard;
