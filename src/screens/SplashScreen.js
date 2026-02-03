import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, SCREENS } from '../services/NavigationContext';
import { COLORS } from '../utils/theme';
import Loading from '../components/loading';

const SplashScreen = () => {
    const { navigate } = useNavigation();
    const [step, setStep] = React.useState(1); // 1 = Image, 2 = Content, 3 = Loading

    useEffect(() => {
        // Step 1: Animation lasts 5000ms
        const step2Timer = setTimeout(() => {
            setStep(2);
        }, 4000);

        // Step 2: Branding lasts 4000ms (Total 9000ms)
        const step3Timer = setTimeout(() => {
            setStep(3);
        }, 9000);

        // Step 3: Loading lasts 4000ms (Total 13000ms)
        const navigationTimer = setTimeout(() => {
            navigate(SCREENS.REGISTER);
        }, 13000);

        return () => {
            clearTimeout(step2Timer);
            clearTimeout(step3Timer);
            clearTimeout(navigationTimer);
        };
    }, []);

    if (step === 3) {
        return <Loading />;
    }

    return (
        <LinearGradient
            colors={[COLORS.splashGradientStart, COLORS.splashGradientEnd]}
            style={styles.container}
        >
            <View style={styles.content}>
                {step === 1 ? (
                    <Image
                        source={require("../../assets/images/splash loading animation.gif")}
                        style={styles.heroImage}
                        resizeMode="contain"
                    />
                ) : (
                    <View style={styles.brandContainer}>
                        <View style={styles.centerContent}>
                            <Text style={styles.title}>Heritej Pulse</Text>
                            <Image
                                source={require("../../assets/images/heritej-pulse-logo.png")}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                            <Text style={styles.tagline}>Capturing the heartbeat of Indian Heritage & Traditions</Text>
                        </View>

                        <View style={styles.footer}>
                            <Text style={styles.poweredBy}>Powered by</Text>
                            <Image
                                source={require("../../assets/images/pleach-logo.png")}
                                style={styles.footerLogo}
                                resizeMode="contain"
                            />
                        </View>
                    </View>
                )}
            </View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroImage: {
        width: '100%',
        height: '60%',
        marginBottom: 30,
    },
    brandContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 50,
        paddingHorizontal: 20,
    },
    centerContent: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    innerImage: {
        width: 200,
        height: 200,
        marginTop: 30,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: 10,
    },
    logo: {
        width: 200,
        height: 200,
        marginTop: 30,
    },
    tagline: {
        fontSize: 20,
        marginTop: 20,
        fontWeight: 'bold',
        color: COLORS.secondaryText,
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
    },
    footer: {
        alignItems: 'center',
        marginTop: 20,
    },
    poweredBy: {
        fontSize: 14,
        color: COLORS.secondaryText,
        marginBottom: 10,
        letterSpacing: 1,
    },
    footerLogo: {
        width: 150,
        height: 150,
    },
});

export default SplashScreen;
