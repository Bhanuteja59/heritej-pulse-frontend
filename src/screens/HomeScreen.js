import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Header from '../components/Header';
import TrendingSection from '../components/TrendingSection';
import LatestNewsSection from '../components/LatestNewsSection';
import { COLORS } from '../utils/theme';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Header />
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <TrendingSection />
                <LatestNewsSection />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 24, // Reduced padding as Nav is outside (in main layout)
    },
});

export default HomeScreen;
