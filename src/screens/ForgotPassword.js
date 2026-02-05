import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../utils/theme";
import { useNavigation, SCREENS } from "../services/NavigationContext";
import AuthLoading from "../components/AuthLoading";
import OTPModal from "../components/OTPModal";

const ForgotPassword = () => {
    const { navigate } = useNavigation();

    const [email, setEmail] = useState("");
    const [focusedInput, setFocusedInput] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false); // Modal state
    const [showAuthLoading, setShowAuthLoading] = useState(false); // Auth loading state

    const handleReset = () => {
        if (!email) {
            Alert.alert("Missing Field", "Please enter your email or mobile number.");
            return;
        }
        console.log("Request email for:", { email });
        // Open OTP Modal instead of immediate redirect
        setModalVisible(true);
    };

    const handleVerifyCode = (code) => {
        if (code.length !== 4) {
            Alert.alert("Invalid Code", "Please enter the full 4-digit verification code.");
            return;
        }

        setIsLoading(true);
        // Simulate network request
        setTimeout(() => {
            setIsLoading(false);
            setModalVisible(false);

            console.log("OTP Verified for:", { email, code });

            // Show Success Loading
            setShowAuthLoading(true);
            setTimeout(() => {
                setShowAuthLoading(false);
                navigate(SCREENS.HOME);
            }, 3000);
        }, 1500);
    };

    return (
        <View style={styles.container}>
            <View
                colors={COLORS.screen}
                style={StyleSheet.absoluteFillObject}
            />
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
                        <Text style={styles.title}> Forgot Password? 🔒 </Text>
                        <Text style={styles.subtitle}>
                            Don't worry! It happens. Please enter the email or mobile number associated with your account.
                        </Text>
                    </View>

                    <View style={styles.form}>
                        {/* Email Input */}
                        <View style={styles.inputs}>
                            <Text style={styles.label}>Enter Email / Mobile No : </Text>
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
                                />
                            </View>
                        </View>

                        <TouchableOpacity onPress={handleReset} activeOpacity={0.8}>
                            <LinearGradient
                                colors={["#EB6A00", "#FF8D28"]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={styles.resetButton}
                            >
                                <Text style={styles.resetButtonText}> Get Verification Code </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}> Remember Password? </Text>
                        <TouchableOpacity onPress={() => navigate(SCREENS.LOGIN)}>
                            <Text style={styles.footerLink}> Sign In </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            {/* OTP Modal */}
            <OTPModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onVerify={handleVerifyCode}
                isLoading={isLoading}
                sentTo={email}
            />

            <AuthLoading visible={showAuthLoading} />
        </View>
    );
};

export default ForgotPassword;

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
        marginBottom: 40,
        marginTop: 60,
        width: "100%",
        paddingHorizontal: 20,
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
    label: {
        fontSize: 20,
        fontWeight: "bold",
        color: COLORS.secondaryText,
    },
    inputs: {
        gap: 10,
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
    resetButton: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 45,
        borderRadius: 12,
        paddingVertical: 16,
    },
    resetButtonText: {
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
