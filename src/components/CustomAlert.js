import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../services/ThemeContext';

const { width } = Dimensions.get('window');

const CustomAlert = ({ visible, title, message, type = 'error', onClose }) => {
    const { colors } = useTheme();
    const scaleAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 6,
                tension: 40,
                useNativeDriver: true,
            }).start();
        } else {
            scaleAnim.setValue(0);
        }
    }, [visible, scaleAnim]);

    if (!visible) return null;

    let iconName = 'alert-circle';
    let iconColor = colors.error || '#FF4B4B'; // Fallback red
    let titleColor = colors.error || '#FF4B4B'; // Fallback red

    if (type === 'success') {
        iconName = 'checkmark-circle';
        iconColor = colors.success || '#4CAF50'; // Fallback green
        titleColor = colors.success || '#4CAF50';
    } else if (type === 'warning') {
        iconName = 'warning';
        iconColor = colors.warning || '#FFC107'; // Fallback yellow
        titleColor = colors.warning || '#FFC107';
    }

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <Animated.View style={[styles.alertContainer, { backgroundColor: colors.cardBg, shadowColor: colors.shadow, transform: [{ scale: scaleAnim }] }]}>
                    <View style={styles.iconContainer}>
                        <Ionicons name={iconName} size={55} color={iconColor} />
                    </View>
                    <Text style={[styles.title, { color: titleColor }]}>{title}</Text>
                    <Text style={[styles.message, { color: colors.secondaryText }]}>{message}</Text>

                    <TouchableOpacity onPress={onClose} activeOpacity={0.8} style={styles.buttonContainer}>
                        <LinearGradient
                            colors={[colors.primary, colors.secondary || colors.primary]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>OK</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertContainer: {
        width: width * 0.85,
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        elevation: 10,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    iconContainer: {
        marginBottom: 15,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 40,
        padding: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 25,
        lineHeight: 22,
    },
    buttonContainer: {
        width: '100%',
        borderRadius: 25,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    button: {
        paddingVertical: 14,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CustomAlert;
