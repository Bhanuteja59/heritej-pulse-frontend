import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, SCREENS } from '../services/NavigationContext';
import { COLORS } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';
import { SPLASH_CONTENT } from '../data/mockData';

const SplashScreen = () => {
    const { navigate } = useNavigation();
    const [step, setStep] = React.useState(1); // 1 = Image, 2 = Content

    useEffect(() => {
        // Step 1: Animation lasts 6000ms
        const imageTimer = setTimeout(() => {
            setStep(2);
        }, 5000);

        // Step 2: Content lasts 4000ms (Total 10000ms from start)
        const navigationTimer = setTimeout(() => {
            navigate(SCREENS.HOME);
        }, 9000);

        return () => {
            clearTimeout(imageTimer);
            clearTimeout(navigationTimer);
        };
    }, []);

    return (
        <LinearGradient
            colors={[COLORS.splashGradientStart, COLORS.splashGradientEnd]} // Warm yellow to soft parchment
            style={styles.container}
        >
            <View style={styles.content}>
                {step === 1 ? (
                    <Image
                        source={SPLASH_CONTENT.heroImage}
                        style={styles.heroImage}
                        resizeMode="contain"
                    />
                ) : (
                    <>
                        <Ionicons name="sparkles" size={64} color={COLORS.primary} style={styles.icon} />
                        <Text style={styles.title}>{SPLASH_CONTENT.title}</Text>
                        <Text style={styles.tagline}>{SPLASH_CONTENT.tagline}</Text>
                    </>
                )}
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
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    heroImage: {
        width: '100%',
        height: '60%', // 60% of the container height
        marginBottom: 30,
        shadowColor: COLORS.black,
    },
    icon: {
        marginBottom: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.text,
        marginBottom: 10,
        textAlign: 'center',
    },
    tagline: {
        fontSize: 16,
        color: COLORS.secondaryText,
        textAlign: 'center',
        lineHeight: 24,
    },
});

export default SplashScreen;
