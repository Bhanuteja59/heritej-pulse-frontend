import React from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { MockDataService } from '../data/mockData';
import { COLORS } from '../utils/theme';

const TrendingCard = ({ item }) => (
    <View style={styles.cardContainer}>
        <ImageBackground source={{ uri: item.image }} style={styles.cardImage} imageStyle={styles.imageStyle}>
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.gradient}
            >
                <View style={styles.cardContent}>
                    <View style={styles.topRow}>
                        <View style={styles.badge}>
                            <Text style={styles.badgeText}>{item.category}</Text>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name="bookmark-outline" size={24} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                </View>
            </LinearGradient>
        </ImageBackground>
    </View>
);

const TrendingSection = () => {
    const data = MockDataService.getTrendingArticles();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.sectionTitle}>Trending</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                renderItem={({ item }) => <TrendingCard item={item} />}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                snapToInterval={268} // card width + margin
                decelerationRate="fast"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    seeAll: {
        fontSize: 14,
        color: COLORS.secondaryText,
    },
    listContent: {
        paddingLeft: 16,
        paddingRight: 8,
    },
    cardContainer: {
        width: 252,
        height: 256,
        marginRight: 16,
    },
    cardImage: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    imageStyle: {
        borderRadius: 16,
    },
    gradient: {
        flex: 1,
        borderRadius: 16,
        justifyContent: 'space-between',
        padding: 16,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    badge: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    badgeText: {
        color: COLORS.white,
        fontWeight: '600',
        fontSize: 12,
    },
    cardContent: {
        flex: 1,
        justifyContent: 'space-between',
    },
    cardTitle: {
        color: COLORS.white,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});

export default TrendingSection;
