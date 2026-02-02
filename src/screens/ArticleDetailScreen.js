import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, FlatList, Dimensions, StatusBar, TouchableOpacity, Animated } from 'react-native';
import { COLORS } from '../utils/theme';
import { MockDataService } from '../data/mockData';
import { useNavigation } from '../services/NavigationContext';
import ArticleCard from '../components/ArticleCard';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const ArticleDetailScreen = () => {
    const { params, goBack, setIsTabBarVisible } = useNavigation();
    const [articles, setArticles] = useState([]);
    const [initialIndex, setInitialIndex] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const flatListRef = useRef(null);
    const scrollY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setIsTabBarVisible(false);
        const allArticles = MockDataService.getAllArticles();
        setArticles(allArticles);

        if (params?.articleId) {
            const index = allArticles.findIndex(a => a.id === params.articleId);
            if (index !== -1) {
                setInitialIndex(index);
                setActiveIndex(index);
                scrollY.setValue(index * height);
            }
        }
        return () => setIsTabBarVisible(true);
    }, [params]);

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index);
        }
    }).current;

    const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

    const getItemLayout = (_, index) => ({
        length: height,
        offset: height * index,
        index,
    });

    if (articles.length === 0) return <View style={styles.container} />;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <Animated.FlatList
                ref={flatListRef}
                data={articles}
                keyExtractor={item => item.id}
                pagingEnabled
                vertical
                showsVerticalScrollIndicator={false}
                snapToAlignment="start"
                decelerationRate="fast"
                initialScrollIndex={initialIndex}
                getItemLayout={getItemLayout}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}

                renderItem={({ item, index }) => {
                    // CREATIVE STACK & SCALE ANIMATION
                    const inputRange = [
                        (index - 1) * height,
                        index * height,
                        (index + 1) * height
                    ];

                    // 1. Parallax Translate
                    // Moves slightly slower than scroll to create depth
                    const translateY = scrollY.interpolate({
                        inputRange,
                        outputRange: [-height * 0.1, 0, 0],
                        extrapolate: 'clamp'
                    });

                    // 2. Scale Depth
                    // The leaving card shrinks slightly to mimic receding
                    const scale = scrollY.interpolate({
                        inputRange,
                        outputRange: [0.92, 1, 1], // Shrink previous
                        extrapolate: 'clamp'
                    });

                    // 3. Opacity Dimming
                    // The leaving card dims slightly
                    const opacity = scrollY.interpolate({
                        inputRange,
                        outputRange: [0.7, 1, 1],
                        extrapolate: 'clamp'
                    });

                    // 4. Border Radius Transition
                    // Smoothly round the corners as it shrinks
                    const borderRadius = scrollY.interpolate({
                        inputRange,
                        outputRange: [40, 0, 0],
                        extrapolate: 'clamp'
                    });

                    return (
                        <Animated.View style={{
                            height,
                            width,
                            transform: [{ translateY }, { scale }],
                            opacity,
                            borderRadius,
                            overflow: 'hidden', // Required for borderRadius to clip image
                            backgroundColor: COLORS.black,

                            // SHADOWS: Cast shadow upwards to cover the receding card
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: -10 }, // Shadow points UP
                            shadowOpacity: 0.5,
                            shadowRadius: 20,
                            elevation: 15,

                            // Z-Index Management
                            // Active item stays on top of previous one
                            zIndex: index === activeIndex ? 10 : 1,
                        }}>
                            {/* Content Wrapper */}
                            <View style={{ flex: 1, backgroundColor: '#000' }}>
                                <ArticleCard
                                    article={item}
                                    isActive={index === activeIndex}
                                />
                            </View>
                        </Animated.View>
                    );
                }}
            />

            <TouchableOpacity style={styles.backButton} onPress={goBack}>
                <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.black,
    },
    backButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    },
});

export default ArticleDetailScreen;
