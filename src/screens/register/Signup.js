import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert, ScrollView, Dimensions, TouchableOpacity, Animated, Pressable } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../../services/ThemeContext";
import { useNavigation, SCREENS } from "../../services/NavigationContext";
import AuthLoading from "../../components/loading/AuthLoading";
import OTPModal from "../../components/OTPModal";
import FloatingLabelInput from "../../components/inputs/FloatingLabelInput";
import CustomAlert from "../../components/CustomAlert";

const { width } = Dimensions.get('window');

const Signup = () => {
    const { colors, isDarkMode } = useTheme();
    const { navigate } = useNavigation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Password Visibility States
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    // Modal & Loading States
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showAuthLoading, setShowAuthLoading] = useState(false);

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

    const handleSignup = () => {
        let missingFields = [];
        if (!name) missingFields.push("Username");
        if (!email) missingFields.push("Email");
        if (!password) missingFields.push("Password");
        if (!confirmPassword) missingFields.push("Confirm Password");

        if (missingFields.length > 0) {
            showAlert("Missing Fields", `Please enter your ${missingFields.join(", ")}.`);
            return;
        }

        if (password !== confirmPassword) {
            showAlert("Password Mismatch", "Passwords do not match.", "error");
            return;
        }
        // Show verification modal
        setModalVisible(true);
    };

    const handleVerifyCode = (code) => {
        if (code.length !== 4) {
            Alert.alert("Invalid Code", "Please enter the full 4-digit verification code.");
            return;
        }

        setIsLoading(true);
        // Simulate network request / verification
        setTimeout(() => {
            setIsLoading(false);
            setModalVisible(false); // Close OTP modal

            // Show Authentication Loading Screen
            setShowAuthLoading(true);
            setTimeout(() => {
                setShowAuthLoading(false);
                navigate(SCREENS.HOME);
            }, 3000);
        }, 1500);
    };

    return (
        <View style={[styles.safeArea, { backgroundColor: colors.background }]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Signup Illustration */}
                    <View style={styles.illustrationContainer}>
                        <Image
                            source={require('../../../assets/images/heritej-pulse-logo.png')}
                            style={[styles.illustration, isDarkMode && { tintColor: colors.white }]}
                            resizeMode="contain"
                        />
                    </View>

                    <View style={styles.header}>
                        <Text style={[styles.title, { color: colors.primary }]}>Welcome To Heritej Pulse</Text>
                        <Text style={[styles.subtitle, { color: colors.secondaryText }]}>
                            Hello, I guess you are new around here. You can start using the application after sign up.
                        </Text>
                    </View>

                    <View style={styles.form}>
                        {/* Name Input */}
                        <FloatingLabelInput
                            label="Username"
                            value={name}
                            onChangeText={setName}
                            iconName="person-outline"
                        />

                        {/* Email Input */}
                        <FloatingLabelInput
                            label="Email / Mobile No"
                            value={email}
                            onChangeText={setEmail}
                            iconName="mail-outline"
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        {/* Password Input */}
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

                        {/* Confirm Password Input */}
                        <FloatingLabelInput
                            label="Confirm Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            isPassword={true}
                            secureTextEntry={!isConfirmPasswordVisible}
                            isPasswordVisible={isConfirmPasswordVisible}
                            togglePasswordVisibility={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                            iconName="lock-closed-outline"
                        />

                        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                            <Pressable
                                onPress={handleSignup}
                                onPressIn={animateButtonIn}
                                onPressOut={animateButtonOut}
                                style={[styles.buttonContainer, { shadowColor: colors.primary }]}
                            >
                                <LinearGradient
                                    colors={[colors.primary, colors.secondary]}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 0 }}
                                    style={styles.signupButton}
                                >
                                    <Text style={[styles.signupButtonText, { color: colors.white }]}>Sign Up</Text>
                                </LinearGradient>
                            </Pressable>
                        </Animated.View>
                    </View>

                    <View style={styles.footer}>
                        <Text style={[styles.footerText, { color: colors.secondaryText }]}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigate(SCREENS.LOGIN)}>
                            <Text style={[styles.footerLink, { color: colors.primary }]}>Login</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Verification Modal Component */}
                    <OTPModal
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                        onVerify={handleVerifyCode}
                        isLoading={isLoading}
                        sentTo={email}
                    />

                    {/* Full Screen Auth Loading */}
                    <AuthLoading visible={showAuthLoading} />

                    {/* Custom Alert */}
                    <CustomAlert
                        visible={alertVisible}
                        title={alertTitle}
                        message={alertMessage}
                        type={alertType}
                        onClose={() => setAlertVisible(false)}
                    />

                </ScrollView>
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
    signupButton: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        paddingVertical: 18,
    },
    signupButtonText: {
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

export default Signup;
