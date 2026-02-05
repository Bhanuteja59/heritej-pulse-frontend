import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS } from "../utils/theme";
import { useNavigation, SCREENS } from "../services/NavigationContext";
import AuthLoading from "../components/AuthLoading";

const Login = () => {
    const { navigate } = useNavigation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [focusedInput, setFocusedInput] = useState(null);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert("Missing Fields", "Please fill in all fields before logging in.");
            return;
        }
        console.log("Login with:", { email, password });
        setIsLoading(true);
        // Simulate auth delay
        setTimeout(() => {
            setIsLoading(false);
            navigate(SCREENS.HOME);
        }, 4000);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}> Welcome Back 👋 </Text>
                <Text style={styles.subtitle}>
                    I am happy to see you again. You can continue where you left off by
                    logging in
                </Text>
            </View>

            <View style={styles.form}>
                {/* Email Input */}
                <View style={styles.inputs}>
                    <Text style={styles.label}>Enter Email / Mobile No</Text>
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

                {/* Password Input */}
                <View style={styles.inputs}>
                    <Text style={styles.label}> Enter Password</Text>
                    <View style={styles.inputContainer}>
                        <Ionicons
                            name="lock-closed"
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

                <TouchableOpacity style={styles.forgotPassword} onPress={() => navigate(SCREENS.FORGOT_PASSWORD)}>
                    <Text style={styles.forgotPasswordText}> Forgot Password? </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLogin} activeOpacity={0.8}>
                    <LinearGradient
                        colors={["#EB6A00", "#FF8D28"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.loginButton}
                    >
                        <Text style={styles.loginButtonText}> Sign In </Text>
                    </LinearGradient>
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text> Don't have an account? </Text>
                <TouchableOpacity>
                    <Text style={styles.footerLink} onPress={() => navigate(SCREENS.SIGNUP)}> Sign Up </Text>
                </TouchableOpacity>
            </View>
            <AuthLoading visible={isLoading} />
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        alignItems: "flex-start",
        marginBottom: 40,
        marginTop: 60,
        paddingHorizontal: 20,
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
        borderColor: COLORS.primary, // stays SAME always
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
        color: COLORS.primary, // ONLY icon changes (optional)
    },

    input: {
        flex: 1,
        fontSize: 16,
        color: COLORS.text,
    },

    forgotPassword: {
        alignSelf: "flex-end",
    },

    forgotPasswordText: {
        color: COLORS.secondaryText,
        fontWeight: "600",
        fontSize: 14,
        marginRight: 40,
    },

    loginButton: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 45,
        borderRadius: 12,
        paddingVertical: 16,
    },

    loginButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.white,
    },

    footer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 40,
    },

    footerLink: {
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.primary,
    },
});
