import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from "../utils/theme";
import { useNavigation, SCREENS } from "../services/NavigationContext";

const Register = () => {

    const { navigate } = useNavigation();
    return (
        <View
            colors={[COLORS.screen]}
            style={styles.container}
        >
            <View style={styles.content}>
                <Text style={styles.title}>Heritej Pulse</Text>

                <Image
                    source={require("../../assets/images/heritej-pulse-logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <Text style={styles.tagline}>
                    Capturing the heartbeat of{'\n'}Indian Heritage & Traditions
                </Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={[styles.button, styles.primaryButton]}
                        onPress={() => navigate(SCREENS.LOGIN)}
                    >
                        <Ionicons name="log-in-outline" size={24} color={COLORS.white} style={styles.icon} />
                        <Text style={styles.buttonTextPrimary}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.secondaryButton]}
                        onPress={() => navigate(SCREENS.SIGNUP)}
                    >
                        <Ionicons name="person-add-outline" size={24} color={COLORS.primary} style={styles.icon} />
                        <Text style={styles.buttonTextSecondary}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 36,
        fontWeight: '800',
        textAlign: 'center',
        marginBottom: 80,
        color: COLORS.primary,
        letterSpacing: 1.5,
        textShadowColor: 'rgba(140, 60, 17, 0.3)', // Primary color shadow with low opacity
        textShadowOffset: { width: 0, height: 4 },
        textShadowRadius: 10,
    },
    logo: {
        width: 180, // Fixed reasonable size for consistency
        height: 180,
        marginBottom: 40, // Reduced margin
        resizeMode: 'contain',
    },
    tagline: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 40, // Reduced margin
        color: COLORS.primary,
        letterSpacing: 0.5,
        lineHeight: 28,
        textShadowColor: 'rgba(0, 0, 0, 0.1)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
        opacity: 0.9,
        paddingHorizontal: 20, // Ensure text doesn't touch edges
    },
    buttonContainer: {
        width: '100%',
        gap: 16,
        alignItems: 'center', // Fix: Centers the 80% width buttons
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        borderRadius: 10,
        width: '80%',
        elevation: 4,
        shadowColor: COLORS.primary,
        textShadowColor: 'rgba(255, 167, 167, 0.1)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    primaryButton: {
        backgroundColor: COLORS.primary,
    },
    secondaryButton: {
        backgroundColor: COLORS.white,
        borderWidth: 2,
        borderColor: COLORS.primary,
        elevation: 0, // Less shadow for secondary
        shadowOpacity: 0.1,
    },
    buttonTextPrimary: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.white,
        letterSpacing: 0.5,
    },
    buttonTextSecondary: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
        letterSpacing: 0.5,
    },
    icon: {
        marginRight: 12,
    },
});

export default Register;