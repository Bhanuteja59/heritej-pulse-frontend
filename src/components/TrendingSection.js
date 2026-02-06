import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ImageBackground, TouchableOpacity, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { MockDataService } from '../data/mockData';
import { COLORS } from '../utils/theme';
import { useNavigation, SCREENS } from '../services/NavigationContext';
import { useLanguage } from '../services/LanguageContext';

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

const TrendingSection = ({ onShowToast }) => {
    const { language, t } = useLanguage();
    const data = MockDataService.getTrendingArticles(language);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Ionicons name="trending-up" size={24} color={COLORS.primary} style={styles.icon} />
                    <Text style={styles.sectionTitle}>{t("home_trending")}</Text>
                </View>
                <TouchableOpacity>
                    <Text style={[styles.seeAll, { color: COLORS.primary }]}>{t("home_see_all")}</Text>
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
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 8,
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
        borderRadius: 10,
        overflow: 'hidden',
    },
    cardImage: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    imageStyle: {
        borderRadius: 10,
    },
    gradient: {
        flex: 1,
        borderRadius: 10,
        justifyContent: 'space-between',
        padding: 16,
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(126, 126, 126, 0.6)', // Darker for contrast
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },
    badgeText: {
        color: '#ffffffff', // Gold color for "Trending"
        fontWeight: '400',
        fontSize: 12,
        textTransform: 'uppercase',
    },
    cardContent: {
        flex: 1,
        justifyContent: 'space-between',
    },
    categoryText: {
        color: '#E0E0E0',
        fontSize: 11,
        fontWeight: '600',
        marginBottom: 4,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    cardTitle: {
        color: COLORS.white,
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 8,
        lineHeight: 24,
    },
});

export default TrendingSection;
