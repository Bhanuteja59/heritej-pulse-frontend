import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, SCREENS } from '../../services/NavigationContext';
import { useLanguage } from '../../services/LanguageContext';
import { useTheme } from '../../services/ThemeContext';
import { PALETTE } from '../../utils/theme';
import { MockDataService } from '../../data/mockData';
import { truncateText } from '../../utils/textUtils';

const NewsCard = ({ item, onPress, onShowToast, toastSavedText, colors, isDarkMode }) => {
    const [bookmarked, setBookmarked] = useState(false);

    const handleBookmark = () => {
        const newState = !bookmarked;
        setBookmarked(newState);
        if (newState) {
            onShowToast(toastSavedText);
        }
    };

    return (
        <Pressable
            onPress={() => onPress(item)}
            style={({ pressed }) => [
                styles.cardContainer,
                {
                    backgroundColor: colors.cardBg,
                    // Heritage Primary Border
                    borderColor: colors.primary,
                    borderWidth: 1,
                    borderLeftWidth: pressed ? 6 : 1, // Highlighting left side on press

                    // Shadow & Elevation
                    shadowColor: isDarkMode && pressed ? colors.primary : colors.shadow,
                    shadowOpacity: isDarkMode && pressed ? 0.4 : (pressed ? 0.4 : 0),
                    shadowRadius: isDarkMode && pressed ? 10 : 4,
                    elevation: pressed ? 12 : 0,

                    // Active State
                    opacity: pressed ? 0.95 : 1,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                }
            ]}
        >
            <Image source={item.image} style={styles.thumbnail} />
            <View style={styles.contentContainer}>
                <View style={styles.headerRow}>
                    <Text style={[styles.category, { color: colors.secondaryText }]}>{item.category}</Text>
                    <TouchableOpacity onPress={handleBookmark}>
                        <Ionicons
                            name={bookmarked ? "bookmark" : "bookmark-outline"}
                            size={20}
                            // Icon color: Use Primary (Gold/Orange) or Text depending on design.
                            // Theme says icons are colors.icon (Gold in Dark, Charcoal in Light).
                            color={colors.icon}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.headline, { color: colors.text }]} numberOfLines={2}>
                    {truncateText(item.title, 50)}
                </Text>
                <View style={styles.footerRow}>
                    <View style={styles.publisherInfo}>
                        <View style={[styles.publisherLogo, { backgroundColor: colors.primary }]}>
                            <Text style={styles.publisherInitial}>
                                {item.publisher?.split(' ').map(word => word[0]).join('').toUpperCase() || 'P'}
                            </Text>
                        </View>
                        <Text style={[styles.publisherName, { color: colors.secondaryText }]}>{item.publisher}</Text>
                    </View>
                    <View style={styles.timeInfo}>
                        <Ionicons name="time-outline" size={14} color={colors.secondaryText} style={styles.clockIcon} />
                        <Text style={[styles.timestamp, { color: colors.secondaryText }]}>{item.timestamp}</Text>
                    </View>
                </View>
            </View>
        </Pressable>
    );
};

const LatestNewsSection = ({ onShowToast }) => {
    const { language, t } = useLanguage();
    const { colors, isDarkMode } = useTheme();
    const { navigate } = useNavigation();

    const data = useMemo(() => MockDataService.getLatestNews(language), [language]);

    const handlePress = (item) => {
        navigate(SCREENS.DETAIL, { articleId: item.id, item });
    };

    const handleSeeAll = () => {
        navigate(SCREENS.EXPLORE_SECTION_GRID, {
            sectionKey: "topNews",
            titleKey: "explore_top_news_title",
            subtitleKey: "explore_top_news_subtitle",
            title: t("explore_top_news_title"),
            subtitle: t("explore_top_news_subtitle"),
            items: data,
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.titleContainer}>
                    <Ionicons name="newspaper-outline" size={24} color={colors.primary} style={styles.icon} />
                    <Text style={[styles.sectionTitle, { color: colors.primary }]}>{t("home_latest")}</Text>
                </View>
                <TouchableOpacity
                    onPress={handleSeeAll}
                    style={[styles.seeAllContainer, { backgroundColor: colors.primary + '15' }]}
                >
                    <Text style={[styles.seeAll, { color: colors.primary }]}>{t("home_see_all")}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.list}>
                {data.map(item => (
                    <NewsCard
                        key={item.id}
                        item={item}
                        onPress={handlePress}
                        onShowToast={onShowToast}
                        toastSavedText={t("toast_saved")}
                        colors={colors}
                        isDarkMode={isDarkMode}
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
    list: {
        flexDirection: 'column',
        gap: 16,
    },
    cardContainer: {
        flexDirection: 'row',
        borderRadius: 16,
        padding: 12,
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
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    headline: {
        fontSize: 16,
        fontWeight: 'bold',
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
        width: 18,
        height: 18,
        borderRadius: 9,
        marginRight: 6,
        alignItems: 'center',
        justifyContent: 'center',
    },
    publisherInitial: {
        color: '#FFFFFF',
        fontSize: 9,
        fontWeight: 'bold',
    },
    publisherName: {
        fontSize: 12,
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
    },
});

export default LatestNewsSection;
