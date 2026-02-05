import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { COLORS } from '../utils/theme';

const Toast = ({ visible, message, onHide, duration = 2000 }) => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.delay(duration),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                if (onHide) onHide();
            });
        }
    }, [visible, duration, opacity, onHide]);

    if (!visible) return null;

    return (
        <Animated.View style={[styles.container, { opacity }]}>
            <View style={styles.content}>
                <Text style={styles.message}>{message}</Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 100,
        left: 20,
        right: 20,
        alignItems: 'center',
        zIndex: 9999,
        pointerEvents: 'none', // Allow clicks through if needed
    },
    content: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    message: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
});

export default Toast;
