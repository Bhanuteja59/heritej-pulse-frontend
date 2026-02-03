import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import Header from '../components/Header';
import { COLORS } from '../utils/theme';
import { MockDataService, EXPLORE_CATEGORIES } from '../data/mockData';
import { Ionicons } from '@expo/vector-icons';

// Using names from the imported data
const CATEGORIES = EXPLORE_CATEGORIES.map(c => c.name);

const CategoryPill = ({ label }) => (
    <TouchableOpacity style={styles.pill}>
        <Text style={styles.pillText}>{label}</Text>
    </TouchableOpacity>
);

const HorizontalSection = ({ title, data }) => (
    <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Ionicons name="arrow-forward" size={20} color={COLORS.secondaryText} />
        </View>
        <FlatList
            data={data}
            keyExtractor={item => 'explore-' + item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <View style={styles.card}>
                    <View style={styles.cardImage} />
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardSubtitle} numberOfLines={1}>{item.category}</Text>
                </View>
            )}
            contentContainerStyle={styles.listContent}
        />
    </View>
);

const ExploreScreen = () => {
    const topNews = MockDataService.getExploreSection('topNews');
    const events = MockDataService.getExploreSection('culturalEvents');
    const museums = MockDataService.getExploreSection('museums');

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView style={styles.scrollView}>
                <View style={styles.categoriesContainer}>
                    <FlatList
                        data={CATEGORIES}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item}
                        renderItem={({ item }) => <CategoryPill label={item} />}
                        contentContainerStyle={styles.categoryList}
                    />
                </View>

                <HorizontalSection title="Top Heritage News" data={topNews} />
                <HorizontalSection title="Cultural Events" data={events} />
                <HorizontalSection title="Museums & Galleries" data={museums} />

                <View style={{ height: 100 }} />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollView: {
        flex: 1,
    },
    categoriesContainer: {
        marginVertical: 16,
    },
    categoryList: {
        paddingHorizontal: 16,
        gap: 8,
    },
    pill: {
        backgroundColor: COLORS.white,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    pillText: {
        color: COLORS.text,
        fontSize: 14,
        fontWeight: '500',
    },
    sectionContainer: {
        marginBottom: 24,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    listContent: {
        paddingLeft: 16,
        paddingRight: 8,
    },
    card: {
        width: 160,
        marginRight: 12,
    },
    cardImage: {
        width: 160,
        height: 100,
        borderRadius: 8,
        backgroundColor: '#ddd',
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 4,
    },
    cardSubtitle: {
        fontSize: 12,
        color: COLORS.secondaryText,
    },
});

export default ExploreScreen;
