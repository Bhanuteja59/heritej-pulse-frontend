import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../services/ThemeContext';
import { COLORS } from '../../utils/theme';

const Loading = () => {
    const { colors, isDarkMode } = useTheme();

    const scaleAnim = useRef(new Animated.Value(1)).current;
    const opacityAnim = useRef(new Animated.Value(0.8)).current;

    useEffect(() => {
        Animated.loop(
            Animated.parallel([
                Animated.sequence([
                    Animated.timing(scaleAnim, {
                        toValue: 1.06,
                        duration: 1200,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(scaleAnim, {
                        toValue: 1,
                        duration: 1200,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ]),
                Animated.sequence([
                    Animated.timing(opacityAnim, {
                        toValue: 1,
                        duration: 1200,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 0.8,
                        duration: 1200,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ]),
            ])
        ).start();
    }, []);

    const contentColor = isDarkMode ? '#FFFFFF' : colors.primary;

    return (
        <LinearGradient
            colors={[colors.splashGradientStart, colors.splashGradientEnd]}
            style={styles.container}
        >
            <View style={styles.content}>
                {/* White Logo Box with Shadow */}
                <Animated.View
                    style={[
                        styles.logoWrapper,
                        {
                            transform: [{ scale: scaleAnim }],
                            opacity: opacityAnim,
                        },
                    ]}
                >
                    <Image
                        source={require('../../../assets/images/heritej-pulse-logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                </Animated.View>

                <Text style={[styles.loadingText, { color: contentColor }]}>
                    Loading...
                </Text>
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    // White background + box shadow
    logoWrapper: {
        width: 130,
        height: 130,
        borderRadius: 30,
        backgroundColor: "rgba(255, 255, 255, 1)",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,

        // iOS Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.15,
        shadowRadius: 25,

        // Android Shadow
        elevation: 12,
    },

    logo: {
        width: 85,
        height: 85,
    },

    loadingText: {
        fontSize: 16,
        fontWeight: '600',
        letterSpacing: 1,
    },
});

export default Loading;