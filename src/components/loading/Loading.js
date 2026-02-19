import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useTheme } from '../../services/ThemeContext';

const Loading = () => {
    const { colors, isDarkMode } = useTheme();

    // Animation values
    const spinValue = useRef(new Animated.Value(0)).current;

    // H Animation Values
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const opacityAnim = useRef(new Animated.Value(0.4)).current;

    const icons = [
        '🏛️', '🕍', '🏺', '📜', '🎭', '🪔',
        '🏰', '🏯', '🐘', '🛕', '🕌', '🕉️',
        '🐅', '🦚', '⛩️', '🕯️', '🗿', '🏔️',
        '🪁', '🧘', '🍛', '🛖', '🎪', '🎹'
    ];

    // Floating icons with initial visibility (no fade-in delay)
    const floatingIcons = useRef(
        icons.map(() => ({
            translateY: new Animated.Value(0),
            opacity: new Animated.Value(0.15 + Math.random() * 0.2), // Random initial opacity 0.15-0.35
            // Fixed positions to cover screen
            left: Math.random() * 90 + '%',
            top: Math.random() * 90 + '%',
            size: Math.floor(Math.random() * 15) + 20, // Random size 20-35
            duration: Math.floor(Math.random() * 3000) + 4000, // Slower float 4-7s
            startDir: Math.random() > 0.5 ? 1 : -1, // Random start direction
        }))
    ).current;

    useEffect(() => {
        // Continuous rotation for outer ring
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 3000, // Slower elegant rotation
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();

        // H-Letter pulse animation (Heartbeat style)
        Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.1,
                    duration: 800,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 800,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Glow opacity pulse
        Animated.loop(
            Animated.sequence([
                Animated.timing(opacityAnim, {
                    toValue: 0.8,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(opacityAnim, {
                    toValue: 0.4,
                    duration: 1500,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ])
        ).start();

        // Animate floating icons (Gentle bobbing)
        floatingIcons.forEach((icon) => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(icon.translateY, {
                        toValue: 15 * icon.startDir, // Bob up/down
                        duration: icon.duration,
                        easing: Easing.inOut(Easing.sin),
                        useNativeDriver: true,
                    }),
                    Animated.timing(icon.translateY, {
                        toValue: -15 * icon.startDir, // Bob down/up
                        duration: icon.duration,
                        easing: Easing.inOut(Easing.sin),
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        });
    }, []);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    const contentColor = isDarkMode ? '#FFFFFF' : colors.primary;
    const ringColor = isDarkMode ? '#FFFFFF' : colors.primary;

    return (
        <LinearGradient
            colors={[colors.splashGradientStart, colors.splashGradientEnd]}
            style={styles.container}
        >
            {/* Background Floating Icons - Immediate Visibility */}
            <View style={styles.backgroundContainer}>
                {floatingIcons.map((icon, index) => (
                    <Animated.Text
                        key={index}
                        style={[
                            styles.floatingIcon,
                            {
                                left: icon.left,
                                top: icon.top,
                                fontSize: icon.size,
                                opacity: icon.opacity,
                                transform: [
                                    { translateY: icon.translateY },
                                ],
                            },
                        ]}
                    >
                        {icons[index % icons.length]}
                    </Animated.Text>
                ))}
            </View>

            {/* Main Loading Component */}
            <View style={styles.loaderContainer}>
                {/* Rotating Outer Ring with Gradient Stroke */}
                <Animated.View
                    style={[
                        styles.rotatingRing,
                        {
                            transform: [{ rotate: spin }],
                            borderColor: 'transparent',
                        },
                    ]}
                >
                    <LinearGradient
                        colors={[ringColor, 'rgba(255, 255, 255, 0)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={[styles.ringGradient, { borderColor: ringColor }]}
                    />
                </Animated.View>

                {/* Inner Static Glow Ring */}
                <View style={[styles.staticRing, { borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(235, 106, 0, 0.3)' }]} />

                {/* Pulsing H Container */}
                <Animated.View
                    style={[
                        styles.hWrapper,
                        {
                            transform: [{ scale: scaleAnim }],
                        },
                    ]}
                >
                    {/* Glowing Backdrop for H */}
                    <Animated.View
                        style={[
                            styles.hGlow,
                            {
                                opacity: opacityAnim,
                                backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.25)' : 'rgba(235, 106, 0, 0.2)'
                            }
                        ]}
                    />

                    {/* The H Letter */}
                    <View style={styles.hLetter}>
                        <View style={[styles.verticalBar, { backgroundColor: contentColor }]} />
                        <View style={[styles.crossBar, { backgroundColor: contentColor }]} />
                        <View style={[styles.verticalBar, { backgroundColor: contentColor }]} />
                    </View>
                </Animated.View>
            </View>

            <Text style={[styles.loadingText, { color: contentColor }]}>Loading...</Text>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    backgroundContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    floatingIcon: {
        position: 'absolute',
        color: '#FFFFFF', // Keep emoji icons natural/white
    },
    loaderContainer: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    rotatingRing: {
        position: 'absolute',
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'transparent',
    },
    ringGradient: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#FFFFFF', // Fallback
        opacity: 0.9,
    },
    staticRing: {
        position: 'absolute',
        width: 76,
        height: 76,
        borderRadius: 38,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    hWrapper: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    hGlow: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
    },
    hLetter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 32,
        height: 36,
    },
    verticalBar: {
        width: 8,
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 4,
    },
    crossBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        height: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        zIndex: -1,
    },
    loadingText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        letterSpacing: 2,
        textTransform: 'uppercase',
        opacity: 0.9,
    },
});

export default Loading;
