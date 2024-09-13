import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const RecomendationCard = ({ count, data, title, description }) => {
    const [open, setOpen] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <View style={styles.header}>
                    <Text
                        style={styles.title}
                        onPress={() => {
                            setOpen(!open);
                        }}
                    >
                        {title}
                    </Text>
                    <AntDesign
                        name={open ? 'upcircleo' : 'downcircleo'}
                        size={24}
                        color="#1f5b3c"
                        onPress={() => {
                            setOpen(!open);
                        }}
                    />
                </View>
                {open ? (
                    <Text style={styles.descriptionText} numberOfLines={5}>
                        {description}
                    </Text>
                ) : null}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        color: '#1f5b3c',
        fontSize: 18,
        fontWeight: 'bold',
    },
    descriptionText: {
        color: 'black',
        fontSize: 16,
        marginTop: 10,
    },
    likeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    likeText: {
        marginLeft: 5,
        color: '#1f5b3c',
        fontSize: 16,
    },
});

export default RecomendationCard;