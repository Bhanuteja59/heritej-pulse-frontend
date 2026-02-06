import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/theme';
import { useNavigation, SCREENS } from '../services/NavigationContext';
import { useLanguage } from '../services/LanguageContext';

const Header = () => {
    const { navigate } = useNavigation();
    const { t } = useLanguage();
    const [placeholder, setPlaceholder] = useState('');
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showCursor, setShowCursor] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const phrases = useMemo(
        () => [
            t("header_phrase_traditions"),
            t("header_phrase_articles"),
            t("header_phrase_history"),
            t("header_phrase_culture"),
        ],
        [t]
    );

    useEffect(() => {
        if (index === phrases.length) { // Loop back
            setIndex(0);
            return;
        }

        if (subIndex === phrases[index].length + 1 && !isDeleting) {
            // Finished typing, wait before deleting
            setTimeout(() => setIsDeleting(true), 1000);
            return;
        }

        if (subIndex === 0 && isDeleting) {
            // Finished deleting, move to next phrase
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % phrases.length);
            return;
        }

        const timeout = setTimeout(() => {
            setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
        }, isDeleting ? 50 : 100); // Faster deleting

        return () => clearTimeout(timeout);
    }, [subIndex, index, isDeleting, phrases]);

    // Blinking cursor logic
    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor(v => !v);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setPlaceholder(phrases[index].substring(0, subIndex));
    }, [subIndex, index, phrases]);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View>
                    <Text style={styles.title}>{t("header_title")}</Text>
                    <Text style={styles.subtitle}>{t("header_subtitle")}</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7} style={styles.notificationButton} onPress={() => navigate(SCREENS.NOTIFICATIONS)}>

                    <Ionicons name="notifications-outline" size={26} color={COLORS.text} />
                    <View style={styles.notificationDot} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity activeOpacity={1} style={styles.searchContainer}>
                {/* <Ionicons name="search-outline" size={20} color={COLORS.secondaryText} style={styles.iconLeft} /> */}

                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <TextInput
                        style={styles.input}
                        value={searchText}
                        onChangeText={setSearchText}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        selectionColor={COLORS.primary}
                    />
                    {searchText.length === 0 && !isFocused && (
                        <View style={StyleSheet.absoluteFill} pointerEvents="none">
                            <Text style={styles.placeholderText}>
                                {placeholder}
                                <Text style={{ color: showCursor ? COLORS.primary : 'transparent' }}>|</Text>
                            </Text>
                        </View>
                    )}
                </View>
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="search-outline" size={20} color={COLORS.primary} />
                </TouchableOpacity>
            </TouchableOpacity>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 10,
        backgroundColor: COLORS.background,
        borderBottomColor: COLORS.primary,
        borderBottomWidth: 0.5,
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '900',
        color: COLORS.primary,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.secondaryText,
        marginTop: 2,
        fontWeight: '500',
    },
    notificationButton: {
        padding: 8,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
        position: 'relative',
    },
    notificationDot: {
        position: 'absolute',
        top: 10,
        right: 12,
        width: 8,
        height: 8,
        backgroundColor: '#FF3B30',
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: COLORS.white,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F5F5F5',
        borderRadius: 50,
        height: 54,
        paddingHorizontal: 16,
        borderWidth: 2,
        borderColor: COLORS.primary,
    },
    iconLeft: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: COLORS.text,
        fontWeight: '500',
        height: '80%',
    },
    placeholderText: {
        position: 'absolute',
        left: 0,
        top: 0,
        fontSize: 16,
        color: '#999',
        fontWeight: '500',
    },
    filterButton: {
        padding: 8,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        marginLeft: 8,
    },
});

export default Header;
