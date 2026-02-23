import React, { useState, useRef, useEffect } from "react";
import { View, TextInput, Animated, Easing, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../services/ThemeContext";

const FloatingLabelInput = ({
    label,
    value,
    onChangeText,
    secureTextEntry,
    isPassword,
    togglePasswordVisibility,
    isPasswordVisible,
    iconName,
    keyboardType,
    autoCapitalize
}) => {
    const { colors, isDarkMode } = useTheme();
    const [isFocused, setIsFocused] = useState(false);
    const focusAnim = useRef(new Animated.Value(value ? 1 : 0)).current;
    const iconScale = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.timing(focusAnim, {
            toValue: isFocused || value ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
            easing: Easing.out(Easing.ease),
        }).start();

        if (isFocused) {
            Animated.sequence([
                Animated.timing(iconScale, { toValue: 1.2, duration: 100, useNativeDriver: true }),
                Animated.spring(iconScale, { toValue: 1, friction: 4, tension: 50, useNativeDriver: true })
            ]).start();
        }
    }, [focusAnim, isFocused, value, iconScale]);

    const labelStyle = {
        position: 'absolute',
        left: iconName ? 45 : 20,
        top: focusAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [18, -10],
        }),
        fontSize: focusAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [16, 12],
        }),
        color: focusAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [colors.secondaryText, colors.primary],
        }),
        backgroundColor: colors.background,
        paddingHorizontal: 8,
        zIndex: 1,
    };

    const containerStyle = {
        borderColor: colors.primary,
        borderWidth: isFocused ? 2 : 1.5,
        borderRadius: 25,
        backgroundColor: isFocused ? (isDarkMode ? 'rgba(0, 0, 0, 1)' : '#FFF8F0') : colors.background,
        elevation: 5,
        shadowColor: isFocused ? colors.primary : colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isFocused ? 0.4 : 0.1,
        shadowRadius: isFocused ? 8 : 3,
    };

    return (
        <View style={[styles.inputGroup, containerStyle]}>
            <Animated.Text style={labelStyle}>
                {label}
            </Animated.Text>
            <View style={styles.inputInnerContainer}>
                {iconName && (
                    <Animated.View style={[styles.leadingIcon, { transform: [{ scale: iconScale }] }]}>
                        <Ionicons
                            name={iconName}
                            size={22}
                            color={isFocused ? colors.primary : colors.secondaryText}
                        />
                    </Animated.View>
                )}
                <TextInput
                    style={[styles.textInput, { color: colors.text }]}
                    value={value}
                    onChangeText={onChangeText}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={secureTextEntry}
                    autoCapitalize={autoCapitalize || "none"}
                    keyboardType={keyboardType}
                    placeholder=""
                    cursorColor={colors.primary}
                />

                {isPassword && (
                    <TouchableOpacity
                        onPress={togglePasswordVisibility}
                        style={styles.eyeIcon}
                    >
                        <Ionicons
                            name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                            size={20}
                            color={isFocused ? colors.primary : colors.secondaryText}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    inputGroup: {
        position: 'relative',
        marginVertical: 4,
        height: 60,
        justifyContent: 'center',
    },
    inputInnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: '100%',
    },
    leadingIcon: {
        marginRight: 10,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 10,
        height: '100%',
    },
    eyeIcon: {
        padding: 8,
    },
});

export default FloatingLabelInput;
