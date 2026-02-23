import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, Platform, Dimensions, Animated, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../services/ThemeContext';
import { useNavigation, SCREENS } from '../../services/NavigationContext';
import SkipLoading from '../../components/loading/SkipLoading';

const { width, height } = Dimensions.get('window');

const Register = () => {
    const { colors, isDarkMode } = useTheme();
    const { navigate } = useNavigation();
    const [isSkipping, setIsSkipping] = useState(false);

    // Animations
    const skipScale = useRef(new Animated.Value(1)).current;
    const loginScale = useRef(new Animated.Value(1)).current;
    const signupScale = useRef(new Animated.Value(1)).current;

    const animateIn = (anim) => {
        Animated.spring(anim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const animateOut = (anim) => {
        Animated.spring(anim, {
            toValue: 1,
            friction: 4,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const skipToHome = () => {
        setIsSkipping(true);
        setTimeout(() => {
            setIsSkipping(false);
            navigate(SCREENS.HOME);
        }, 3000); // 3 seconds to show all the teaser messages
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <StatusBar style={isDarkMode ? "light" : "dark"} backgroundColor="transparent" translucent />

            <View style={styles.content}>
                {/* Skip Button - Top Right Floating Icon */}
                <Animated.View style={[styles.skipButtonContainer, { transform: [{ scale: skipScale }] }]}>
                    <Pressable
                        style={[styles.skipButton, { backgroundColor: isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }]}
                        onPress={skipToHome}
                        onPressIn={() => animateIn(skipScale)}
                        onPressOut={() => animateOut(skipScale)}
                    >
                        <Text style={[styles.skipText, { color: colors.secondaryText }]}>Skip</Text>
                        <Ionicons name="chevron-forward" size={16} color={colors.secondaryText} />
                    </Pressable>
                </Animated.View>

                {/* Logo Section */}
                <View style={styles.logoContainer}>
                    <Image
                        source={require("../../../assets/images/heritej-pulse-logo.png")}
                        style={[styles.logo, isDarkMode && { tintColor: colors.white }]}
                        resizeMode="contain"
                    />
                </View>

                {/* Text Section */}
                <View style={styles.textContainer}>
                    <Text style={[styles.title, { color: colors.primary }]}>Heritej Pulse</Text>
                    <Text style={[styles.tagline, { color: colors.secondaryText }]}>
                        Capturing the heartbeat of{'\n'}Indian Heritage & Traditions
                    </Text>
                </View>

                {/* Buttons Section */}
                <View style={styles.buttonContainer}>
                    {/* Login Button - Gradient */}
                    <Animated.View style={{ width: '100%', transform: [{ scale: loginScale }] }}>
                        <Pressable
                            onPress={() => navigate(SCREENS.LOGIN)}
                            onPressIn={() => animateIn(loginScale)}
                            onPressOut={() => animateOut(loginScale)}
                            style={[styles.buttonShadow, { shadowColor: colors.primary }]}
                        >
                            <LinearGradient
                                colors={[colors.primary, colors.secondary]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.primaryButton}
                            >
                                <Ionicons name="log-in-outline" size={24} color={colors.white} style={styles.icon} />
                                <Text style={[styles.buttonTextPrimary, { color: colors.white }]}>Login</Text>
                            </LinearGradient>
                        </Pressable>
                    </Animated.View>

                    {/* Sign Up Button - Clean Outline */}
                    <Animated.View style={{ width: '100%', transform: [{ scale: signupScale }] }}>
                        <Pressable
                            onPress={() => navigate(SCREENS.SIGNUP)}
                            onPressIn={() => animateIn(signupScale)}
                            onPressOut={() => animateOut(signupScale)}
                            style={styles.secondaryButtonWrapper}
                        >
                            <View style={[styles.secondaryButton, { borderColor: colors.primary, backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.02)' }]}>
                                <Ionicons name="person-add-outline" size={24} color={colors.primary} style={styles.iconSecondary} />
                                <Text style={[styles.buttonTextSecondary, { color: colors.primary }]}>Create Account</Text>
                            </View>
                        </Pressable>
                    </Animated.View>

                    <Text style={[styles.versionText, { color: colors.secondaryText }]}>v1.0.0</Text>
                </View>

            </View>

            <SkipLoading visible={isSkipping} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: width * 0.08,
        paddingTop: Platform.OS === 'ios' ? 60 : 50,
        paddingBottom: height * 0.08,
    },
    skipButtonContainer: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 60 : 50,
        right: width * 0.08,
        zIndex: 10,
    },
    skipButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    skipText: {
        fontSize: 15,
        fontWeight: '600',
        marginRight: 4,
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: height * 0.05,
    },
    logo: {
        width: width * 0.45,
        height: width * 0.45,
    },
    textContainer: {
        alignItems: 'center',
        marginTop: -20,
    },
    title: {
        fontSize: width * 0.09,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 12,
        letterSpacing: 0.5,
    },
    tagline: {
        fontSize: width * 0.04,
        fontWeight: '500',
        textAlign: 'center',
        letterSpacing: 0.3,
        lineHeight: 26,
    },
    buttonContainer: {
        width: '100%',
        gap: 16,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonShadow: {
        width: '100%',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
        borderRadius: 25,
    },
    primaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 18,
        borderRadius: 25,
        width: '100%',
    },
    secondaryButtonWrapper: {
        width: '100%',
        borderRadius: 25,
    },
    secondaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 25,
        width: '100%',
        borderWidth: 1.5,
    },
    buttonTextPrimary: {
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.8,
    },
    buttonTextSecondary: {
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.8,
    },
    icon: {
        marginRight: 10,
    },
    iconSecondary: {
        marginRight: 10,
    },
    versionText: {
        marginTop: 16,
        fontSize: 12,
        opacity: 0.5,
        fontWeight: '500',
    }
});

export default Register;