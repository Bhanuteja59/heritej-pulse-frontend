import React, { useEffect } from "react";
import { View, StyleSheet, Modal, Dimensions, Image } from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withRepeat,
    withTiming,
    withSequence,
    Easing
} from "react-native-reanimated";
import { useTheme } from "../../services/ThemeContext";

const { width } = Dimensions.get('window');

const SkipLoading = ({ visible = false }) => {
    const { colors, isDarkMode } = useTheme();

    // Animation Values
    const scale = useSharedValue(1);
    const opacity = useSharedValue(0);

    useEffect(() => {
        if (visible) {
            // Fade in the whole overlay
            opacity.value = withTiming(1, { duration: 600 });

            // Continuous smooth pulsing effect for the logo
            scale.value = withRepeat(
                withSequence(
                    withTiming(1.05, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
                    withTiming(0.95, { duration: 1000, easing: Easing.inOut(Easing.ease) })
                ),
                -1, // Infinite loops
                true // Reverse
            );
        } else {
            // Reset when invisible
            opacity.value = 0;
            scale.value = 1;
        }
    }, [visible, opacity, scale]);

    const animatedLogoStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    const animatedOverlayStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        };
    });

    if (!visible) return null;

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.container}>
                {/* Blur Overlay - Very low intensity/opacity to keep background visible */}
                <BlurView
                    intensity={isDarkMode ? 15 : 20}
                    tint={isDarkMode ? "dark" : "light"}
                    style={[StyleSheet.absoluteFillObject, { backgroundColor: isDarkMode ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.3)' }]}
                />

                <Animated.View style={animatedOverlayStyle}>
                    {/* Highly elevated, sharp-contrast content box to make it POP */}
                    <View style={[styles.content, {
                        backgroundColor: isDarkMode ? 'rgba(30,30,30,0.95)' : 'rgba(255,255,255,0.95)',
                        borderColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)',
                    }]}>

                        {/* Pulsing Logo Instead of Icons */}
                        <Animated.View style={[styles.logoContainer, animatedLogoStyle]}>
                            <Image
                                source={require("../../../assets/images/heritej-pulse-logo.png")}
                                style={[styles.logo, isDarkMode && { tintColor: colors.white }]}
                                resizeMode="contain"
                            />
                        </Animated.View>

                        {/* Static Single Teaser Message */}
                        <Animated.Text style={[styles.loadingText, { color: colors.text }]}>
                            Log in later to unlock exclusive Heritage features!
                        </Animated.Text>

                        <Animated.Text style={[styles.subText, { color: colors.secondaryText }]}>
                            Getting things ready...
                        </Animated.Text>

                        {/* Loading Indicator Bar */}
                        <View style={styles.loadingBarContainer}>
                            <Animated.View
                                style={[
                                    styles.loadingBar,
                                    { backgroundColor: colors.primary },
                                    {
                                        width: withTiming(visible ? '100%' : '0%', { duration: 3000, easing: Easing.bezier(0.25, 0.1, 0.25, 1) })
                                    }
                                ]}
                            />
                        </View>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
        borderRadius: 24,
        borderWidth: 1,
        width: width * 0.85,
        // Increased elevation & shadow to make it highlight/pop significantly
        elevation: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.4,
        shadowRadius: 16,
    },
    logoContainer: {
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 100,
        height: 100,
    },
    loadingText: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
        marginBottom: 8,
        textAlign: 'center',
        lineHeight: 26,
    },
    subText: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 25,
        textAlign: 'center',
    },
    loadingBarContainer: {
        width: '100%',
        height: 4,
        backgroundColor: 'rgba(150,150,150,0.2)',
        borderRadius: 2,
        overflow: 'hidden',
    },
    loadingBar: {
        height: '100%',
        borderRadius: 2,
    },
});

export default SkipLoading;
