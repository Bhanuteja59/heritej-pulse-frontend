import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, Dimensions, Animated, Pressable } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../services/ThemeContext";
import { useNavigation, SCREENS } from "../../services/NavigationContext";
import AuthLoading from "../../components/loading/AuthLoading";
import FloatingLabelInput from "../../components/inputs/FloatingLabelInput";
import CustomAlert from "../../components/CustomAlert";

const { width } = Dimensions.get('window');

const Login = () => {
    const { colors, isDarkMode } = useTheme();
    const { navigate } = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Animations
    const buttonScale = useRef(new Animated.Value(1)).current;

    const animateButtonIn = () => {
        Animated.spring(buttonScale, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const animateButtonOut = () => {
        Animated.spring(buttonScale, {
            toValue: 1,
            friction: 4,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    // Alert State
    const [alertVisible, setAlertVisible] = useState(false);
    const [alertTitle, setAlertTitle] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("error");

    const showAlert = (title, message, type = "error") => {
        setAlertTitle(title);
        setAlertMessage(message);
        setAlertType(type);
        setAlertVisible(true);
    };

    const handleLogin = () => {
        let missingFields = [];
        if (!email) missingFields.push("Email");
        if (!password) missingFields.push("Password");

        if (missingFields.length > 0) {
            showAlert("Missing Fields", `Please enter your ${missingFields.join(" and ")}.`);
            return;
        }

        setIsLoading(true);
        // Simulate auth delay
        setTimeout(() => {
            setIsLoading(false);
            navigate(SCREENS.HOME);
        }, 4000);
    };

    return (
        <View style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.illustrationContainer}>
                        <Image
                            source={require('../../../assets/images/heritej-pulse-logo.png')}
                            style={[styles.illustration, isDarkMode && { tintColor: colors.white }]}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={styles.header}>
                        <Text style={[styles.title, { color: colors.primary }]}>Welcome Back</Text>
                        <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
                            Sign in to continue exploring your heritage.
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <FloatingLabelInput
                            label="Email or Mobile Number"
                            value={email}
                            onChangeText={setEmail}
                            iconName="mail-outline"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <FloatingLabelInput
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            isPassword={true}
                            secureTextEntry={!isPasswordVisible}
                            isPasswordVisible={isPasswordVisible}
                            togglePasswordVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
                            iconName="lock-closed-outline"
                        />

                        <TouchableOpacity style={styles.forgotPassword} onPress={() => navigate(SCREENS.FORGOT_PASSWORD)}>
                            <Text style={[styles.forgotPasswordText, { color: colors.secondaryText }]}>Recover Password</Text>
                        </TouchableOpacity>

                        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                            <Pressable
                                onPress={handleLogin}
                                onPressIn={animateButtonIn}
                                onPressOut={animateButtonOut}
                                style={[styles.buttonContainer, { shadowColor: colors.primary }]}
                            >
                                <LinearGradient
                                    colors={[colors.primary, colors.secondary]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.loginButton}
                                >
                                    <Text style={[styles.loginButtonText, { color: colors.white }]}>Sign In</Text>
                                </LinearGradient>
                            </Pressable>
                        </Animated.View>
                    </View>

                    <View style={styles.footer}>
                        <Text style={[styles.footerText, { color: colors.secondaryText }]}>New here? </Text>
                        <TouchableOpacity onPress={() => navigate(SCREENS.SIGNUP)}>
                            <Text style={[styles.footerLink, { color: colors.primary }]}>Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <AuthLoading visible={isLoading} />
                <CustomAlert
                    visible={alertVisible}
                    title={alertTitle}
                    message={alertMessage}
                    type={alertType}
                    onClose={() => setAlertVisible(false)}
                />
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: width * 0.05,
        paddingBottom: 40,
    },
    illustrationContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    illustration: {
        width: 150,
        height: 150,
    },
    header: {
        alignItems: "center",
        marginBottom: 30,
        width: "100%",
        paddingTop: 10,
    },
    title: {
        fontSize: width * 0.075,
        fontWeight: "800",
        marginBottom: 8,
        letterSpacing: 0.5,
        textAlign: "center",
    },
    subtitle: {
        fontSize: width * 0.04,
        letterSpacing: 0.5,
        lineHeight: 24,
        textAlign: "center",
    },
    form: {
        width: "100%",
        gap: 20,
    },
    forgotPassword: {
        alignSelf: "flex-end",
        marginTop: -5,
    },
    forgotPasswordText: {
        fontWeight: "600",
        fontSize: 14,
    },
    buttonContainer: {
        marginTop: 15,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    loginButton: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        paddingVertical: 18,
    },
    loginButtonText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 40,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 15,
    },
    footerLink: {
        fontSize: 15,
        fontWeight: "bold",
    },
});

export default Login;
