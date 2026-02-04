import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
    TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../utils/theme";
import { useNavigation, SCREENS } from "../services/NavigationContext";
import AuthLoading from "../components/AuthLoading";
import OTPModal from "../components/OTPModal";

const Signup = () => {
    const { navigate } = useNavigation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [focusedInput, setFocusedInput] = useState(null);

    // Password Visibility States
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    // Modal & Loading States
    const [modalVisible, setModalVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showAuthLoading, setShowAuthLoading] = useState(false);

    const handleSignup = () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert("Missing Fields", "Please fill in all details to sign up.");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Password Mismatch", "Passwords do not match.");
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

            console.log("Signup Verified!", { name, email, password, code });

            // Show Authentication Loading Screen
            setShowAuthLoading(true);
            setTimeout(() => {
                setShowAuthLoading(false);
                navigate(SCREENS.HOME);
            }, 4000);
        }, 1500);
    };

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.header}>
                        <Text style={styles.title}> Welcome To Heritej Pulse👋 </Text>
                        <Text style={styles.subtitle}>
                            Hello, I guess you are new around here. You can start using the application after sign up.
                        </Text>
                    </View>

                    <View style={styles.form}>
                        {/* Name Input */}
                        <View style={styles.inputs}>
                            <Text style={styles.label}>Username</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons
                                    name="person-outline"
                                    size={24}
                                    style={[
                                        styles.inputIcon,
                                        focusedInput === "name" && styles.iconFocused,
                                    ]}
                                />
                                <TextInput
                                    placeholder="Enter Username"
                                    value={name}
                                    onChangeText={setName}
                                    style={styles.input}
                                    placeholderTextColor="#8E8E8E"
                                    onFocus={() => setFocusedInput("name")}
                                    onBlur={() => setFocusedInput(null)}
                                />
                            </View>
                        </View>

                        {/* Email Input */}
                        <View style={styles.inputs}>
                            <Text style={styles.label}>Email / Mobile No</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons
                                    name="mail-outline"
                                    size={24}
                                    style={[
                                        styles.inputIcon,
                                        focusedInput === "email" && styles.iconFocused,
                                    ]}
                                />
                                <TextInput
                                    placeholder="Enter Email / Mobile No"
                                    value={email}
                                    onChangeText={setEmail}
                                    style={styles.input}
                                    placeholderTextColor="#8E8E8E"
                                    onFocus={() => setFocusedInput("email")}
                                    onBlur={() => setFocusedInput(null)}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputs}>
                            <Text style={styles.label}>Password</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={24}
                                    style={[
                                        styles.inputIcon,
                                        focusedInput === "password" && styles.iconFocused,
                                    ]}
                                />
                                <TextInput
                                    placeholder="Password"
                                    value={password}
                                    onChangeText={setPassword}
                                    style={styles.input}
                                    secureTextEntry={!isPasswordVisible}
                                    placeholderTextColor="#8E8E8E"
                                    onFocus={() => setFocusedInput("password")}
                                    onBlur={() => setFocusedInput(null)}
                                />
                                <TouchableOpacity
                                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                    style={{ padding: 4 }}
                                >
                                    <Ionicons
                                        name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                                        size={24}
                                        color="#8E8E8E"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Confirm Password Input */}
                        <View style={styles.inputs}>
                            <Text style={styles.label}>Confirm Password</Text>
                            <View style={styles.inputContainer}>
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={24}
                                    style={[
                                        styles.inputIcon,
                                        focusedInput === "confirmPassword" && styles.iconFocused,
                                    ]}
                                />
                                <TextInput
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    style={styles.input}
                                    secureTextEntry={!isConfirmPasswordVisible}
                                    placeholderTextColor="#8E8E8E"
                                    onFocus={() => setFocusedInput("confirmPassword")}
                                    onBlur={() => setFocusedInput(null)}
                                />
                                <TouchableOpacity
                                    onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                                    style={{ padding: 4 }}
                                >
                                    <Ionicons
                                        name={isConfirmPasswordVisible ? "eye-outline" : "eye-off-outline"}
                                        size={24}
                                        color="#8E8E8E"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity onPress={handleSignup} activeOpacity={0.8} >
                            <LinearGradient
                                colors={["#EB6A00", "#FF8D28"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.signupButton}
                            >
                                <Text style={styles.signupButtonText}> Sign Up </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}> Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigate(SCREENS.LOGIN)}>
                            <Text style={styles.footerLink}> Sign In </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Verification Modal Component */}
                    <OTPModal
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                        onVerify={handleVerifyCode}
                        isLoading={isLoading}
                    />

                    {/* Full Screen Auth Loading */}
                    <AuthLoading visible={showAuthLoading} />

                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default Signup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.screen,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    header: {
        alignItems: "flex-start",
        marginBottom: 30,
        marginTop: 40,
        width: "100%",
    },
    title: {
        fontSize: 24,
        fontWeight: "800",
        color: COLORS.primary,
        marginBottom: 10,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 16,
        letterSpacing: 0.5,
        color: COLORS.secondaryText,
        lineHeight: 24,
    },
    form: {
        width: "100%",
        gap: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    inputs: {
        gap: 10,
    },
    label: {
        fontSize: 20,
        fontWeight: "bold",
        color: COLORS.secondaryText,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderColor: COLORS.primary,
        borderWidth: 1.5,
        backgroundColor: "#F5F5F5",
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 10,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        marginRight: 40,
    },
    inputIcon: {
        marginRight: 12,
        color: "#818181ff",
    },
    iconFocused: {
        color: COLORS.primary,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: COLORS.text,
    },
    buttonWrapper: {
        width: '100%',
        marginTop: 20,
        borderRadius: 12,
        elevation: 4,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        backgroundColor: 'transparent',
    },
    signupButton: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 45,
        borderRadius: 12,
        paddingVertical: 16,
    },
    signupButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.white,
    },
    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 40,
    },
    footerText: {
        fontSize: 16,
        color: COLORS.text,
    },
    footerLink: {
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.primary,
    },
});
