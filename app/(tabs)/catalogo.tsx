import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList, Text,  TextInput, Modal} from 'react-native';
import { useRouter} from 'expo-router';
import {ThemedText} from "@/components/ThemedText";
import {FontAwesome} from "@expo/vector-icons";
import EventCard from "@/components/EventCard";

export default function CatalogoScreen() {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [filters, setFilters] = useState({
        dataEvento: '',
        classificacaoIdade: '',
        lotacaoMaxima: '',
        nomeEvento: '',
        statusEvento: '',
    });
    const [events, setEvents] = useState([]);
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);


    const toggleFavorite = (item: any) => {
        if (favorites.find(favorite => favorite.id === item.id)) {
            removeFromFavorites(item);
        } else {
            addToFavorites(item);
        }
    };

    const addToFavorites = (item: any) => {
        const storedFavorites = window.localStorage.getItem('favoritos');
        if(!storedFavorites) {
            window.localStorage.setItem('favoritos', JSON.stringify([]));
        }

        setFavorites([...favorites, item]);
        window.localStorage.setItem('favoritos', JSON.stringify([...favorites, item]));
    };

    const removeFromFavorites = (item: any) => {
        const storedFavorites = window.localStorage.getItem('favoritos');
        if(!storedFavorites) {
            window.localStorage.setItem('favoritos', JSON.stringify([]));
        }
        setFavorites(favorites.filter(favorite => favorite.id !== item.id));
        window.localStorage.setItem('favoritos', JSON.stringify(favorites.filter(favorite => favorite.id !== item.id)));
    };

    const fetchEvents = async () => {
        try {
            const response = await fetch('http://localhost:8080/evento'); // Replace with your endpoint
            if (!response.ok) {
                throw new Error('Failed to fetch events');
            }
            const result = await response.json();
            setEvents(result.data); // Set the fetched events in state
        } catch (err:any) {
            console.error(err);
        }
    };

    const fetchFilteredEvents = async () => {
        try {
            const { dataEvento, classificacaoIdade, lotacaoMaxima, nomeEvento, statusEvento } = filters;

            // Construct query string
            const queryParams = new URLSearchParams({
                ...(dataEvento && { dataEvento }),
                ...(classificacaoIdade && { classificacaoIdade }),
                ...(lotacaoMaxima && { lotacaoMaxima }),
                ...(nomeEvento && { nomeEvento }),
                ...(statusEvento && { statusEvento }),
            });

            const response = await fetch(`http://localhost:8080/evento/filtro?${queryParams}`);
            if (!response.ok) {
                throw new Error('Failed to fetch filtered events');
            }
            const result = await response.json();
            setEvents(result.data); // Store filtered events
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
            setModalVisible(false); // Close the modal after fetching
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value })); // Update filter inputs
    };

    const renderEventCard = ({ item }) => {
        return (
            <EventCard
                item={item}
                favorites={favorites}
                onEventClick={() => router.push(`/event-details/${item.id}`)}
                onFavoriteClick={() => toggleFavorite(item)}
            />
        )
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ThemedText style={styles.title}>Catálogo</ThemedText>
                <FontAwesome name="sliders" size={24} color="#5a5a5a" style={styles.filterIcon} onPress={() => setModalVisible(true)} />
            </View>
            <ThemedText style={styles.resultsText}></ThemedText>
            <FlatList
                data={events}
                renderItem={renderEventCard}
                keyExtractor={(item) => item.id}
                style={styles.eventList}
            />
            <Modal visible={modalVisible} animationType="fade" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Filtrar Eventos</Text>

                    <TextInput
                        placeholder="Data do Evento (DD-MM-YYYY)"
                        style={styles.input}
                        onChangeText={(text) => handleFilterChange('dataEvento', text)}
                    />
                    <TextInput
                        placeholder="Classificação Etária"
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={(text) => handleFilterChange('classificacaoIdade', text)}
                    />
                    <TextInput
                        placeholder="Lotação Máxima"
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={(text) => handleFilterChange('lotacaoMaxima', text)}
                    />
                    <TextInput
                        placeholder="Nome do Evento"
                        style={styles.input}
                        onChangeText={(text) => handleFilterChange('nomeEvento', text)}
                    />
                    <TextInput
                        placeholder="Status do Evento (ativo/inativo)"
                        style={styles.input}
                        onChangeText={(text) => handleFilterChange('statusEvento', text)}
                    />

                    <View style={styles.modalButtons}>
                        <TouchableOpacity style={styles.button} onPress={() => fetchFilteredEvents()}>
                            <Text style={styles.buttonText}>Aplicar Filtros</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.cancelButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
              </View>
            </Modal>
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
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 16,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
