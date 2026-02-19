import React, { useState, useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Platform, Animated, Pressable, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, SCREENS } from '../services/NavigationContext';
import { useLanguage } from '../services/LanguageContext';
import { useTheme } from '../services/ThemeContext';

// Reusable Animated Icon Button Component
const AnimatedIconButton = ({ onPress, children, colors, style, size = 40 }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const shadowAnim = useRef(new Animated.Value(2)).current;

    const handlePressIn = () => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 0.94,
                useNativeDriver: false, // Changed to false to avoid shadowOffset errors
                speed: 40,
                bounciness: 6,
            }),
            Animated.spring(shadowAnim, {
                toValue: 6,
                useNativeDriver: false,
            })
        ]).start();
    };

    const handlePressOut = () => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                useNativeDriver: false, // Changed to false to avoid shadowOffset errors
                speed: 40,
                bounciness: 6,
            }),
            Animated.spring(shadowAnim, {
                toValue: 2,
                useNativeDriver: false,
            })
        ]).start();
    };

    return (
        <Pressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
        >
            <Animated.View
                style={[
                    style,
                    {
                        width: size,
                        height: size,
                        transform: [{ scale: scaleAnim }],
                        elevation: shadowAnim,
                        shadowOpacity: shadowAnim.interpolate({
                            inputRange: [2, 6],
                            outputRange: [0.1, 0.25],
                        }),
                        shadowRadius: shadowAnim.interpolate({
                            inputRange: [2, 6],
                            outputRange: [4, 10],
                        }),
                        shadowOffset: {
                            width: 0,
                            height: shadowAnim.interpolate({
                                inputRange: [2, 6],
                                outputRange: [2, 5],
                            }),
                        },
                        borderWidth: 1.5,
                    }
                ]}
            >
                {children}
            </Animated.View>
        </Pressable>
    );
};

const Header = () => {
    const { navigate } = useNavigation();
    const { t } = useLanguage();
    const { colors, isDarkMode, toggleTheme } = useTheme();
    const [placeholder, setPlaceholder] = useState('');
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showCursor, setShowCursor] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const phrases = useMemo(
        () => [
            t("header_phrase_traditions") || "Discover Traditions",
            t("header_phrase_articles") || "Read Articles",
            t("header_phrase_history") || "Explore History",
            t("header_phrase_culture") || "Experience Culture",
        ],
        [t]
    );

    useEffect(() => {
        if (!phrases || phrases.length === 0) return;

        const currentPhrase = phrases[index] || "";

        if (subIndex === currentPhrase.length + 1 && !isDeleting) {
            const timeout = setTimeout(() => setIsDeleting(true), 1500);
            return () => clearTimeout(timeout);
        }

        if (subIndex === 0 && isDeleting) {
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % phrases.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
        }, isDeleting ? 40 : 80);

        return () => clearTimeout(timeout);
    }, [subIndex, index, isDeleting, phrases]);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor(v => !v);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (phrases && phrases[index]) {
            setPlaceholder(phrases[index].substring(0, subIndex));
        }
    }, [subIndex, index, phrases]);

    return (
        <View style={[styles.container, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
            <View style={styles.headerContainer}>
                <View>
                    <Text style={[styles.title, { color: isDarkMode ? colors.white : colors.primary }]}>{t("header_title")}</Text>
                    <Text style={[styles.subtitle, { color: colors.secondaryText }]}>{t("header_subtitle")}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <AnimatedIconButton
                        colors={colors}
                        style={[styles.themeToggleButton, { backgroundColor: colors.cardBg, borderColor: colors.border, shadowColor: colors.text }]}
                        onPress={toggleTheme}
                    >
                        <Ionicons name={isDarkMode ? "sunny-outline" : "moon-outline"} size={22} color={colors.text} />
                    </AnimatedIconButton>
                    <AnimatedIconButton
                        colors={colors}
                        style={[styles.notificationButton, { backgroundColor: colors.cardBg, borderColor: colors.border, shadowColor: colors.text }]}
                        size={44}
                        onPress={() => navigate(SCREENS.NOTIFICATIONS)}
                    >
                        <Ionicons name="notifications-outline" size={26} color={colors.text} />
                        <View style={[styles.notificationDot, { borderColor: colors.cardBg, backgroundColor: colors.error }]} />
                    </AnimatedIconButton>
                </View>
            </View>

            {/* Search Bar - Medium Size & No Icon Background */}
            <View
                style={[styles.searchContainer, { backgroundColor: colors.searchFill, borderColor: colors.primary }]}
            >
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={[styles.input, { color: colors.text }]}
                        value={searchText}
                        onChangeText={setSearchText}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        selectionColor={colors.primary}
                        placeholderTextColor={colors.secondaryText}
                    />
                    {searchText.length === 0 && !isFocused && (
                        <View style={styles.placeholderContainer} pointerEvents="none">
                            <Text style={[styles.placeholderText, { color: colors.secondaryText }]}>
                                {placeholder}
                                <Text style={{ color: showCursor ? colors.primary : 'transparent' }}>|</Text>
                            </Text>
                        </View>
                    )}
                </View>

                {/* Direct Icon without Button Background */}
                <Ionicons name="search-outline" size={24} color={colors.primary} style={{ marginRight: 8 }} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Minimal gap: status bar height only
        paddingBottom: 16,
        paddingHorizontal: 10, // Padding all sides
        borderBottomWidth: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: '800',
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 13,
        fontWeight: '500',
        marginTop: 2,
    },
    notificationButton: {
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    themeToggleButton: {
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    notificationDot: {
        position: 'absolute',
        top: 10,
        right: 12,
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 2,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 16,
        height: 46, // Medium size
        paddingHorizontal: 12,
        borderWidth: 1.5,
        overflow: 'hidden',
    },
    inputWrapper: {
        flex: 1,
        justifyContent: 'center',
        height: '100%',
        paddingLeft: 4,
    },
    input: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        height: '100%',
        paddingVertical: 0,
    },
    placeholderContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        paddingLeft: 4,
    },
    placeholderText: {
        fontSize: 15,
        fontWeight: '500',
    },
    filterButton: {
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Header;
