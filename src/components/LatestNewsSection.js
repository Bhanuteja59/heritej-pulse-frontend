import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MockDataService } from '../data/mockData';
import { COLORS } from '../utils/theme';
import { useNavigation, SCREENS } from '../services/NavigationContext';

const NewsCard = ({ item, onPress, onShowToast }) => {
    const [bookmarked, setBookmarked] = useState(false);

    const handleBookmark = () => {
        const newState = !bookmarked;
        setBookmarked(newState);
        if (newState) {
            onShowToast("Successfully saved the article");
        }
    };

    return (
        <Pressable
            onPress={() => onPress(item)}
            style={({ pressed }) => [
                styles.cardContainer,
                {
                    borderLeftColor: pressed ? COLORS.primary : 'transparent',
                    backgroundColor: pressed ? '#FAFAFA' : COLORS.white,
                    boxShadow: pressed ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
                    borderRadius: pressed ? 12 : 10,
                }
            ]}
        >
            <Image source={{ uri: item.image }} style={styles.thumbnail} />
            <View style={styles.contentContainer}>
                <View style={styles.headerRow}>
                    <Text style={styles.category}>{item.category}</Text>
                    <TouchableOpacity onPress={handleBookmark}>
                        <Ionicons
                            name={bookmarked ? "bookmark" : "bookmark-outline"}
                            size={20}
                            color={COLORS.text}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={styles.headline} numberOfLines={2}>{item.title}</Text>
                <View style={styles.footerRow}>
                    <View style={styles.publisherInfo}>
                        <View style={styles.publisherLogo} />
                        <Text style={styles.publisherName}>{item.publisher}</Text>
                    </View>
                    <View style={styles.timeInfo}>
                        <Ionicons name="time-outline" size={14} color={COLORS.secondaryText} style={styles.clockIcon} />
                        <Text style={styles.timestamp}>{item.timestamp}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

const LatestNewsSection = ({ onShowToast }) => {
    const data = MockDataService.getLatestNews();
    const { navigate } = useNavigation();

    const handlePress = (item) => {
        navigate(SCREENS.DETAIL, { articleId: item.id, item });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.sectionTitle}> 🔶 Latest</Text>
                <TouchableOpacity>
                    <Text style={[styles.seeAll, { color: COLORS.primary }]}>See all {'>'} </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.list}>
                {data.map(item => (
                    <NewsCard
                        key={item.id}
                        item={item}
                        onPress={handlePress}
                        onShowToast={onShowToast}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
        paddingHorizontal: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    list: {
        flexDirection: 'column',
        gap: 16,
    },
    cardContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
        alignItems: 'center',
        borderLeftWidth: 4,
        borderLeftColor: 'transparent',
    },
    thumbnail: {
        width: 96,
        height: 96,
        borderRadius: 12,
        marginRight: 12,
        backgroundColor: '#eee',
    },
    contentContainer: {
        flex: 1,
        height: 96,
        justifyContent: 'space-between',
        paddingVertical: 4,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    category: {
        fontSize: 12,
        color: COLORS.secondaryText,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    headline: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.text,
        lineHeight: 22,
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    publisherInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    publisherLogo: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#000',
        marginRight: 6,
    },
    publisherName: {
        fontSize: 12,
        color: '#444',
        fontWeight: '500',
    },
    timeInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    clockIcon: {
        marginRight: 4,
    },
    timestamp: {
        fontSize: 12,
        color: COLORS.secondaryText,
    },
});

export default LatestNewsSection;
