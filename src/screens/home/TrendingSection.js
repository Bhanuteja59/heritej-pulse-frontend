import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, SCREENS } from '../../services/NavigationContext';
import { useLanguage } from '../../services/LanguageContext';
import { useTheme } from '../../services/ThemeContext';
import { MockDataService } from '../../data/mockData';
import { truncateText } from '../../utils/textUtils';

const TrendingCard = ({ item, onPress, onShowToast, colors, isDarkMode }) => {
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
                    borderRadius: pressed ? 20 : 10,
                    elevation: pressed ? 12 : 0,
                    shadowOpacity: pressed ? 0.4 : 0,
                    transform: [{ scale: pressed ? 0.97 : 1 }],
                    backgroundColor: colors.cardBg,
                    shadowColor: colors.shadow, // Added this line
                    // Heritage Primary Border
                    borderColor: colors.primary,
                    borderWidth: 1,
                    shadowOpacity: isDarkMode && pressed ? 0.4 : (pressed ? 0.4 : 0),
                    shadowRadius: isDarkMode && pressed ? 10 : 4,
                    elevation: pressed ? 12 : 0,
                }
            ]}
        >
            {({ pressed }) => (
                <ImageBackground
                    source={item.image}
                    style={styles.cardImage}
                    imageStyle={[styles.imageStyle, { borderRadius: pressed ? 20 : 10 }]}
                >
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.85)']}
                        style={[styles.gradient, { borderRadius: pressed ? 20 : 10 }]}
                    >
                        <View style={styles.cardContent}>
                            <View style={styles.topRow}>
                                <View style={styles.badge}>
                                    <Text style={[styles.badgeText, { color: '#e5e4e1ff' }]}> 🔥 Trending</Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.bookmarkButton}
                                    onPress={handleBookmark}
                                    activeOpacity={0.7}
                                >
                                    <Ionicons
                                        name={bookmarked ? "bookmark" : "bookmark-outline"}
                                        size={24}
                                        color={colors.white} // Keep white for contrast on image
                                    />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={styles.categoryText}>{item.category}</Text>
                                <Text style={[styles.cardTitle, { color: colors.white }]}>
                                    {truncateText(item.title, 50)}
                                </Text>
                            </View>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            )}
        </Pressable>
    );
};

const TrendingSection = ({ onShowToast }) => {
    const { navigate } = useNavigation();
    const { t, language } = useLanguage();
    const { colors, isDarkMode } = useTheme();

    const data = useMemo(() => MockDataService.getTrendingArticles(language), [language]);

    const handlePress = (item) => {
        navigate(SCREENS.DETAIL, { articleId: item.id });
    };

    const handleSeeAll = () => {
        navigate(SCREENS.EXPLORE_SECTION_GRID, {
            sectionKey: "culturalEvents",
            titleKey: "explore_trending_title",
            subtitleKey: "explore_trending_subtitle",
            title: t("explore_trending_title"),
            subtitle: t("explore_trending_subtitle"),
            items: data,
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Ionicons name="trending-up" size={24} color={colors.primary} style={styles.icon} />
                    <Text style={[styles.sectionTitle, { color: colors.primary }]}>{t("home_trending")}</Text>
                </View>
                <TouchableOpacity
                    onPress={handleSeeAll}
                    style={[styles.seeAllContainer, { backgroundColor: colors.primary + '15' }]}
                >
                    <Text style={[styles.seeAll, { color: colors.primary }]}>{t("home_see_all")}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.listContainer}>
                <FlatList
                    data={data}
                    renderItem={({ item }) => (
                        <TrendingCard
                            item={item}
                            onPress={handlePress}
                            onShowToast={onShowToast}
                            colors={colors}
                            isDarkMode={isDarkMode}
                        />
                    )}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContent}
                    snapToInterval={268} // card width + margin
                    decelerationRate="fast"
                    disableIntervalMomentum={true}
                    snapToAlignment="start"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 14,
        marginBottom: 14,
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
    },
    seeAllContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    seeAll: {
        fontSize: 12,
        fontWeight: '600',
    },
    listContainer: {
        paddingLeft: 16,
        paddingRight: 8,
    },
    cardContainer: {
        width: 252,
        height: 256,
        marginRight: 16,
        borderRadius: 10,
        overflow: 'hidden',
        // Added these lines for default shadow
        shadowColor: '#000', // Default shadow color, will be overridden by dynamic style
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
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
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker for better contrast
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },
    badgeText: {
        fontWeight: '600',
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
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 8,
        lineHeight: 24,
    },
});

export default TrendingSection;
