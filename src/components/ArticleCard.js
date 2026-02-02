import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Animated, TouchableWithoutFeedback, Easing, TouchableOpacity, Share } from 'react-native';
import { COLORS } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { MockDataService } from '../data/mockData';
import { useNavigation } from '../services/NavigationContext';

const { width, height } = Dimensions.get('window');

// Helper to extract plain text from rich content
const getPreviewText = (content) => {
    if (typeof content === 'string') return content;
    if (Array.isArray(content) && content.length > 0) {
        // Find first paragraph
        const firstPara = content.find(block => block.type === 'paragraph');
        if (firstPara && Array.isArray(firstPara.content)) {
            return firstPara.content.map(span => span.text).join('');
        }
    }
    return "Check out this amazing story on Heritage Pulse.";
};

const ArticleCard = ({ article, isActive }) => {
    const { setIsTabBarVisible } = useNavigation();
    const [isControlsVisible, setIsControlsVisible] = useState(true); // Default: Controls are visible
    const [isBookmarked, setIsBookmarked] = useState(false);

    // Animation Value: 1 = Visible, 0 = Hidden
    const visibilityAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        setIsBookmarked(MockDataService.isBookmarked(article.id));

        if (!isActive) {
            // Reset to default state when swiping away
            setIsControlsVisible(true);
            visibilityAnim.setValue(1);
        } else {
            // Sync global tab bar: If controls (Likes) are visible, Tabs should be HIDDEN.
            // Default: Controls True (Visible) -> Tabs False (Hidden).
            if (isControlsVisible) {
                setIsTabBarVisible(false);
            }
        }
    }, [isActive, article.id]);

    const toggleControls = () => {
        const nextState = !isControlsVisible;
        setIsControlsVisible(nextState);

        // Sync Tab Bar logic:
        // If Controls (Action Bar) are becoming HIDDEN (nextState=false) -> Show Tabs (True)
        // If Controls are becoming VISIBLE (nextState=true) -> Hide Tabs (False)
        setIsTabBarVisible(!nextState);

        Animated.timing(visibilityAnim, {
            toValue: nextState ? 1 : 0,
            duration: 300,
            easing: Easing.bezier(0.25, 0.1, 0.25, 1), // IOS-like ease
            useNativeDriver: true,
        }).start();
    };

    // Kept internal logic just in case, though button is removed from UI per user request
    const handleBookmark = () => {
        const newState = MockDataService.toggleBookmark(article.id);
        setIsBookmarked(newState);
    };

    const handleShare = async () => {
        try {
            await Share.share({
                message: `Check out this article: ${article.title}\n\nRead more on Heritage Pulse app ....!`,
                url: article.image,
                title: article.title,
            });
        } catch (error) {
            console.error(error.message);
        }
    };

    // --- Animations ---

    // 1. Content Shift (Subtle breathing effect when toggling)
    const contentScale = visibilityAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1.02, 1], // Slightly zoom in when immersive
    });

    // 2. Action Bar Slide (Slide Down to Hide)
    const actionBarTranslateY = visibilityAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [100, 0], // Hide below screen
    });

    const actionBarOpacity = visibilityAnim.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [0, 0, 1],
    });

    // Extract dynamic preview text
    const previewText = getPreviewText(article.content);

    // Revert to White but keep fixed layout
    const BAR_COLOR = '#FFFFFF';
    const BAR_TEXT_COLOR = COLORS.text;

    return (
        <View style={styles.container}>
            {/* 1. Hero Image */}
            <View style={styles.imageContainer}>
                <Image source={{ uri: article.image }} style={styles.image} resizeMode="cover" />
                <Animated.View style={[styles.imageOverlay, { opacity: visibilityAnim }]} />

                {/* 2. Source Badge (Bottom Right) */}
                <Animated.View style={[styles.sourceBadge, { opacity: visibilityAnim }]}>
                    <View style={styles.sourceIcon}>
                        <Text style={styles.sourceInitial}>{article.publisher?.[0] || 'P'}</Text>
                    </View>
                    <Text style={styles.sourceName}>{article.publisher}</Text>
                </Animated.View>
            </View>

            {/* 3. Content Card (Bottom Sheet) */}
            <TouchableWithoutFeedback onPress={toggleControls}>
                <View style={styles.contentCardWrapper}>
                    <Animated.View
                        style={[
                            styles.contentCard,
                            { transform: [{ scale: contentScale }] }
                        ]}
                    >
                        {/* Meta Info */}
                        <View style={styles.metaRow}>
                            <Text style={styles.category}>{article.category}</Text>
                            <Text style={styles.timestamp}>{article.timestamp}</Text>
                        </View>

                        {/* Title */}
                        <Text style={styles.title} numberOfLines={3} ellipsizeMode="tail">
                            {article.title}
                        </Text>

                        {/* Body Preview - DYNAMIC TEXT */}
                        <Text style={styles.bodyPreview} numberOfLines={6} ellipsizeMode="tail">
                            {article.subtitle} — {previewText}
                        </Text>

                        {/* Keywords */}
                        <View style={styles.keywordsRow}>
                            <Text style={styles.keyword} onPress={() => console.log('Keyword clicked')}>#{article.category}</Text>
                        </View>
                    </Animated.View>

                    {/* 4. Action Bar (FIXED BOTTOM BAR with Border/Shadow) */}
                    <Animated.View
                        style={[
                            styles.actionBar,
                            { backgroundColor: BAR_COLOR },
                            {
                                transform: [{ translateY: actionBarTranslateY }],
                                opacity: actionBarOpacity
                            }
                        ]}
                    >
                        <TouchableOpacity style={styles.actionBtn} onPress={() => { }}>
                            <Ionicons name="heart-outline" size={24} color={BAR_TEXT_COLOR} />
                            {/* Dynamic Likes */}
                            <Text style={[styles.actionText, { color: BAR_TEXT_COLOR }]}>{article.likes || '2.4k'}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.actionBtn} onPress={() => { }}>
                            <Ionicons name="chatbubble-outline" size={24} color={BAR_TEXT_COLOR} />
                            {/* Dynamic Comments */}
                            <Text style={[styles.actionText, { color: BAR_TEXT_COLOR }]}>{article.comments || '86'}</Text>
                        </TouchableOpacity>

                        {/* Share Button */}
                        <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
                            <Ionicons name="share-social-outline" size={24} color={BAR_TEXT_COLOR} />
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        backgroundColor: COLORS.black,
    },
    imageContainer: {
        height: '45%',
        width: '100%',
        position: 'relative',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    sourceBadge: {
        position: 'absolute',
        bottom: 60,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
    },
    sourceIcon: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    sourceInitial: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    sourceName: {
        color: '#fff',
        fontSize: 12,
        fontWeight: '600',
    },
    contentCardWrapper: {
        height: '55%',
        width: '100%',
        backgroundColor: COLORS.background,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: -32,
        paddingBottom: 0,
        overflow: 'hidden',
    },
    contentCard: {
        flex: 1,
        padding: 24,
        paddingTop: 32,
        paddingBottom: 110, // Extra padding for fixed bottom bar
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    category: {
        color: COLORS.primary,
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    timestamp: {
        color: COLORS.secondaryText,
        fontSize: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 12,
        lineHeight: 30,
    },
    bodyPreview: {
        fontSize: 16,
        color: COLORS.secondaryText,
        lineHeight: 24,
        marginBottom: 16,
    },
    keywordsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    keyword: {
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: '600',
    },
    actionBar: {
        position: 'absolute',
        bottom: 0, // Docked at bottom
        left: 0,
        right: 0,
        height: 80,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 10,

        // Revised Shadows (Prominent)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15, // Stronger opacity
        shadowRadius: 16,    // Larger radius for "glow"
        elevation: 20,       // Higher elevation for Android

        // Border for definition
        borderTopWidth: 1,
        borderColor: '#EEEEEE',
    },
    actionBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    actionText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
    },
});

export default ArticleCard;
