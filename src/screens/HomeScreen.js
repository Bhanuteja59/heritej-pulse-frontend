import React, { useState, useCallback } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import Header from '../components/Header';
import TrendingSection from '../components/TrendingSection';
import LatestNewsSection from '../components/LatestNewsSection';
import Toast from '../components/Toast';
import Loading from '../components/loading';
import { COLORS } from '../utils/theme';
import { MockDataService } from '../data/mockData';



const HomeScreen = () => {
    const [refreshing, setRefreshing] = useState(false);
    const [toastVisible, setToastVisible] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [refreshKey, setRefreshKey] = useState(0);

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

    return (
        <View style={styles.container}>

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
                        colors={[COLORS.primary]}
                        tintColor={COLORS.primary}
                    />
                }
            >
                <TrendingSection key={`trending-${refreshKey}`} onShowToast={showToast} />
                <LatestNewsSection key={`latest-${refreshKey}`} onShowToast={showToast} />
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
        backgroundColor: COLORS.screen,
        gap: 5,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 24,
    },
});

export default HomeScreen;
