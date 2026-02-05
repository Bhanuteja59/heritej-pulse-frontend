import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MockDataService } from '../data/mockData';
import { COLORS } from '../utils/theme';
import { useNavigation, SCREENS } from '../services/NavigationContext';

const NewsCard = ({ item, onPress }) => (
    <TouchableOpacity style={styles.cardContainer} onPress={() => onPress(item)} activeOpacity={0.8}>
        <Image source={{ uri: item.image }} style={styles.thumbnail} />
        <View style={styles.contentContainer}>
            <View style={styles.headerRow}>
                <Text style={styles.category}>{item.category}</Text>
                <TouchableOpacity>
                    <Ionicons name="bookmark-outline" size={20} color={COLORS.text} />
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
    </TouchableOpacity>
);

const LatestNewsSection = () => {
    const data = MockDataService.getLatestNews();
    const { navigate } = useNavigation();

    const handlePress = (item) => {
        navigate(SCREENS.DETAIL, { articleId: item.id, item });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.sectionTitle}>Latest</Text>
                <TouchableOpacity>
                    <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.list}>
                {data.map(item => (
                    <NewsCard key={item.id} item={item} onPress={handlePress} />
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
