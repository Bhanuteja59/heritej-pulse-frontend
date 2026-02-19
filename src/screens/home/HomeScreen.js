import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl, Text, TouchableOpacity, LayoutAnimation, Platform, UIManager, Animated } from 'react-native';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}
import { useNavigation, SCREENS } from '../../services/NavigationContext';
import { useTheme } from '../../services/ThemeContext';
import Header from '../../components/Header';
import Toast from '../../components/Toast';
import Loading from '../../components/loading/Loading';
import { MockDataService } from '../../data/mockData';
import { useLanguage } from '../../services/LanguageContext';
import National from './National';
import International from './International';

import BackgroundPattern from '../../components/BackgroundPattern';

const HomeScreen = () => {
    const { colors, isDarkMode } = useTheme();
    const [refreshing, setRefreshing] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [refreshKey, setRefreshKey] = useState(0);
    const [activeTab, setActiveTab] = useState('National');
    const scrollX = useRef(new Animated.Value(0)).current;

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            MockDataService.refreshData();
            setRefreshKey(prev => prev + 1);
            setRefreshing(false);
        }, 2000);
    }, []);

    const showToast = (message) => {
        setToastMessage(message);
        setToastVisible(true);
    };

    const onTabPress = (tab) => {
        setActiveTab(tab);
        Animated.spring(scrollX, {
            toValue: tab === 'National' ? 0 : 1,
            useNativeDriver: false,
            tension: 50,
            friction: 7
        }).start();
    };

    const tabIndicatorPosition = scrollX.interpolate({
        inputRange: [0, 1],
        outputRange: [16, 110], // Roughly calculated based on tab widths + margin
    });

    const indicatorWidth = 60; // Fixed width for a sleeker look

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Subtle Tiled Texture for Light Mode */}
            <BackgroundPattern color={isDarkMode ? colors.primary : '#00cdabff'} opacity={isDarkMode ? 0.1 : 0.05} />

            <Header />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                decelerationRate="fast"
                scrollEventThrottle={16}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={[colors.primary]}
                        tintColor={colors.primary}
                        progressBackgroundColor={colors.cardBg}
                    />
                }
            >
                <View style={[styles.tabContainer, { borderBottomColor: colors.border }]}>
                    <TouchableOpacity
                        style={styles.tab}
                        onPress={() => onTabPress('National')}
                        activeOpacity={1} // No flicker on press
                    >
                        <Text style={[
                            styles.tabText,
                            {
                                color: isDarkMode
                                    ? colors.white // Static white in dark mode as requested
                                    : (activeTab === 'National' ? colors.primary : colors.secondaryText)
                            }
                        ]}>
                            National
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.tab}
                        onPress={() => onTabPress('International')}
                        activeOpacity={1} // No flicker on press
                    >
                        <Text style={[
                            styles.tabText,
                            {
                                color: isDarkMode
                                    ? colors.white // Static white in dark mode as requested
                                    : (activeTab === 'International' ? colors.primary : colors.secondaryText)
                            }
                        ]}>
                            International
                        </Text>
                    </TouchableOpacity>

                    {/* Animated Tab Indicator */}
                    <Animated.View
                        style={[
                            styles.indicator,
                            {
                                backgroundColor: colors.primary,
                                left: tabIndicatorPosition,
                                width: indicatorWidth,
                                shadowColor: colors.primary,
                                shadowOpacity: isDarkMode ? 0.6 : 0,
                                shadowRadius: 4,
                                height: 3,
                                borderRadius: 1.5,
                            }
                        ]}
                    />
                </View>

                {activeTab === 'National' ? (
                    <National refreshKey={refreshKey} onShowToast={showToast} />
                ) : (
                    <International />
                )}
            </ScrollView>

            {refreshing && (
                <View style={StyleSheet.absoluteFill}>
                    <Loading />
                </View>
            )}

            <Toast
                visible={toastVisible}
                message={toastMessage}
                onHide={() => setToastVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 5,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 24,
    },
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginBottom: 10,
        borderBottomWidth: 1,
        // borderBottomColor handled in inline style
    },
    tab: {
        paddingVertical: 10,
        marginRight: 20,
    },
    tabText: {
        fontSize: 16,
        fontWeight: '600',
    },
    indicator: {
        position: 'absolute',
        bottom: 0,
    },
});

export default HomeScreen;
