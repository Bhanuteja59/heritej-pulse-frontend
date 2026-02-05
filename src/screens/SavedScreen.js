import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { COLORS } from '../utils/theme';
import { MockDataService } from '../data/mockData';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, SCREENS } from '../services/NavigationContext';

const SavedScreen = () => {
    const [savedArticles, setSavedArticles] = useState([]);
    const { navigate } = useNavigation();

    useEffect(() => {
        // In a real app, we'd subscribe to store updates.
        // Here we just fetch on mount.
        setSavedArticles(MockDataService.getSavedArticles());
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigate(SCREENS.DETAIL, { articleId: item.id, item })}
        >
            <View style={styles.cardContent}>
                <Text style={styles.category}>{item.category}</Text>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.publisher}>{item.publisher}</Text>
            </View>
            <TouchableOpacity style={styles.removeBtn}>
                <Ionicons name="bookmark" size={24} color={COLORS.primary} />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Saved Articles</Text>
            </View>

            {savedArticles.length === 0 ? (
                <View style={styles.emptyState}>
                    <Ionicons name="bookmark-outline" size={64} color="#ccc" />
                    <Text style={styles.emptyText}>No saved articles yet.</Text>
                    <Text style={styles.emptySubtext}>Bookmark stories to read them later.</Text>
                </View>
            ) : (
                <FlatList
                    data={savedArticles}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.list}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 16,
        backgroundColor: COLORS.background,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    list: {
        paddingHorizontal: 16,
    },
    card: {
        backgroundColor: COLORS.white,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    cardContent: {
        flex: 1,
        marginRight: 12,
    },
    category: {
        fontSize: 12,
        color: COLORS.secondaryText,
        marginBottom: 4,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    publisher: {
        fontSize: 12,
        color: COLORS.secondaryText,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        marginTop: 16,
        fontSize: 18,
        color: COLORS.text,
        fontWeight: 'bold',
    },
    emptySubtext: {
        marginTop: 8,
        fontSize: 14,
        color: COLORS.secondaryText,
    },
});

export default SavedScreen;
