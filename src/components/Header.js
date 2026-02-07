import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/theme';
import { useNavigation, SCREENS } from '../services/NavigationContext';

const Header = () => {
    const { navigate } = useNavigation();
    const [placeholder, setPlaceholder] = useState('');
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showCursor, setShowCursor] = useState(true);
    const [searchText, setSearchText] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const phrases = ["  Search traditions...", "  Search articles...", "  Search history...", "  Search culture..."];

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
                    <Text style={styles.title}>Heritage Pulse</Text>
                    <Text style={styles.subtitle}>Discover the heartbeat of India</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7} style={styles.notificationButton} onPress={() => navigate(SCREENS.NOTIFICATIONS)}>

                    <Ionicons name="notifications-outline" size={26} color={COLORS.text} />
                    <View style={styles.notificationDot} />
                </TouchableOpacity>
            </View>

            <TouchableOpacity activeOpacity={1} style={styles.searchContainer}>
                {/* <Ionicons name="search-outline" size={20} color={COLORS.secondaryText} style={styles.iconLeft} /> */}

                <View style={{ flex: 1, justifyContent: 'center', height: '100%' }}>
                    <TextInput
                        style={styles.input}
                        value={searchText}
                        onChangeText={setSearchText}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        selectionColor={COLORS.primary}
                    />
                    {searchText.length === 0 && !isFocused && (
                        <View style={[StyleSheet.absoluteFill, { justifyContent: 'center' }]} pointerEvents="none">
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
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 16,
        backgroundColor: COLORS.background,
        borderBottomColor: 'rgba(0,0,0,0.05)',
        borderBottomWidth: 1,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
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
        color: COLORS.primary,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 13,
        color: COLORS.secondaryText,
        fontWeight: '500',
        marginTop: 2,
    },
    notificationButton: {
        width: 44,
        height: 44,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 3,
    },
    notificationDot: {
        position: 'absolute',
        top: 10,
        right: 12,
        width: 10,
        height: 10,
        backgroundColor: '#FF3B30',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        borderRadius: 16,
        height: 52,
        paddingHorizontal: 16,
        borderWidth: 1.5,
        borderColor: COLORS.primary, // Softer border by default
    },
    iconLeft: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 15,
        color: COLORS.text,
        fontWeight: '500',
        height: '100%', // Take full height
        paddingVertical: 0, // Reset padding
    },
    placeholderText: {
        fontSize: 15,
        color: '#9CA3AF',
        fontWeight: '500',
    },
    filterButton: {
        width: 36,
        height: 36,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        marginLeft: 8,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
});

export default Header;
