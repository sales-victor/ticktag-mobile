import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList, Text, Image, TextInput, Button, Modal} from 'react-native';
import {useNavigation, useRouter} from 'expo-router';
import {ThemedText} from "@/components/ThemedText";
import {FontAwesome} from "@expo/vector-icons";
import EventCard from "@/components/EventCard";

export default function FavoriteScreen() {
    const navigation = useNavigation();

    const router = useRouter();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true); // State to show loading indicator
    const [error, setError] = useState(null); // State to handle errors
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            console.log('Focus event');
            loadFavorites();
        });
        return unsubscribe;
    }, [navigation]);


    const loadFavorites = () => {
        const storedFavorites = window.localStorage.getItem('favoritos');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    };
    const removeFromFavorites = (item: any) => {
        const storedFavorites = window.localStorage.getItem('favoritos');
        if(!storedFavorites) {
            window.localStorage.setItem('favoritos', JSON.stringify([]));
        }
        setFavorites(favorites.filter(favorite => favorite.id !== item.id));
        window.localStorage.setItem('favoritos', JSON.stringify(favorites.filter(favorite => favorite.id !== item.id)));
    };

    const renderEventCard = ({ item }) => {
        return (
            <EventCard
                item={item}
                favorites={favorites}
                onEventClick={() => router.push(`/event-details/${item.id}`)}
                onFavoriteClick={() => removeFromFavorites(item)}
            />
        )
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ThemedText style={styles.title}>Favoritos</ThemedText>
                <ThemedText style={styles.title}></ThemedText>
            </View>
            <ThemedText style={styles.resultsText}></ThemedText>
            <FlatList
                data={favorites}
                renderItem={renderEventCard}
                keyExtractor={(item) => item.id}
                style={styles.eventList}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        padding: 16,
        backgroundColor: '#007be1',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    filterIcon: {
        color: '#ffffff',
    },
    resultsText: {
        padding: 16,
        fontSize: 16,
        color: '#5a5a5a',
    },
    eventList: {
        flex: 1,
    },
    button: {
        backgroundColor: '#007be1',
        paddingVertical: 8,
        marginBottom: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    eventName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5a5a5a',
    },
    eventAddress: {
        fontSize: 14,
        color: '#5a5a5a',
    },
    eventDate: {
        fontSize: 14,
        color: '#5a5a5a',
        marginTop: 4,
    },
    shareIcon: {
        position: 'absolute',
        bottom: 0,
        right: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 5,
        padding: 10,
        marginBottom: 16,
    },
    cancelButton: {
        backgroundColor: '#CCC',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    cancelButtonText: {
        color: '#333',
        fontWeight: 'bold',
    },
});
