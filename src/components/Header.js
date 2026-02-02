import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/theme';

const Header = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View>
                    <Text style={styles.title}>Heritage Pulse</Text>
                    <Text style={styles.subtitle}>Discover things of this world</Text>
                </View>
                <TouchableOpacity>
                    <Ionicons name="notifications-outline" size={24} color={COLORS.text} />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color={COLORS.secondaryText} style={styles.iconLeft} />
                <TextInput
                    style={styles.input}
                    placeholder="Search Culture..."
                    placeholderTextColor="#999"
                />
                <Ionicons name="sparkles" size={20} color={COLORS.gold} style={styles.iconRight} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 10,
        backgroundColor: COLORS.background,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.secondaryText,
        marginTop: 2,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#eee',
        height: 48,
        paddingHorizontal: 12,
        // Soft shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    iconLeft: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: COLORS.text,
    },
    iconRight: {
        marginLeft: 8,
    },
});

export default Header;
