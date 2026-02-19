import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, SCREENS } from '../services/NavigationContext';
import { useLanguage } from '../services/LanguageContext';
import { useTheme } from '../services/ThemeContext';

const TabItem = ({ icon, label, screenName, active, onPress, colors }) => (
    <TouchableOpacity style={styles.tabItem} onPress={() => onPress(screenName)} activeOpacity={0.7}>
        <View style={styles.iconContainer}>
            {active && <View style={[styles.activeIndicator, { backgroundColor: colors.primary }]} />}
            <Ionicons
                name={active ? icon : `${icon}-outline`}
                size={24}
                color={active ? colors.primary : colors.secondaryText}
            />
        </View>
        <Text style={[styles.tabLabel, { color: active ? colors.primary : colors.secondaryText }, active && styles.activeTabLabel]}>
            {label}
        </Text>
    </TouchableOpacity>
);

const BottomNavigation = () => {
    const { currentScreen, navigate } = useNavigation();
    const { t } = useLanguage();
    const { colors } = useTheme();

    // Don't show bottom nav on Splash
    if (currentScreen === SCREENS.SPLASH) return null;

    // Helper to check active state (detail page keeps Home active if we want, or its own)
    const getActive = (screen) => currentScreen === screen;

    return (
        <View style={[styles.container, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
            <TabItem
                icon="home"
                label={t("tab_home")}
                screenName={SCREENS.HOME}
                active={getActive(SCREENS.HOME) || getActive(SCREENS.DETAIL)}
                onPress={navigate}
                colors={colors}
            />
            <TabItem
                icon="compass"
                label={t("tab_explore")}
                screenName={SCREENS.EXPLORE}
                active={getActive(SCREENS.EXPLORE)}
                onPress={navigate}
                colors={colors}
            />
            <TabItem
                icon="bookmark"
                label={t("tab_saved")}
                screenName={SCREENS.SAVED}
                active={getActive(SCREENS.SAVED)}
                onPress={navigate}
                colors={colors}
            />
            <TabItem
                icon="person"
                label={t("tab_profile")}
                screenName={SCREENS.PROFILE}
                active={getActive(SCREENS.PROFILE)}
                onPress={navigate}
                colors={colors}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        paddingBottom: Platform.OS === 'ios' ? 24 : 12, // Safe area handling
        borderTopWidth: 1,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 8,
    },
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: 4,
    },
    activeIndicator: {
        position: 'absolute',
        top: -10, // Line at top of tab
        width: 20,
        height: 3,
        borderRadius: 2,
    },
    tabLabel: {
        fontSize: 10,
        fontWeight: '500',
    },
    activeTabLabel: {
        fontWeight: '700',
    },
});

export default BottomNavigation;
