import React, { useEffect, useRef } from "react";
import { View, Image, StyleSheet, Text, Animated, Modal } from "react-native";
import { COLORS } from "../utils/theme";

const AuthLoading = ({ visible = false }) => {
    const fadeAnim = useRef(new Animated.Value(0.3)).current;

    useEffect(() => {
        if (visible) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(fadeAnim, {
                        toValue: 1,
                        duration: 1000,
                        useNativeDriver: true,
                    }),
                ])
            ).start();
        }
    }, [visible, fadeAnim]);

    return (
        <Modal transparent={false} visible={visible} animationType="fade">
            <View style={styles.container}>
                <Image
                    source={require("../../assets/images/success-loading.gif")}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                />
                <View style={styles.overlay}>
                    <Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}>
                        Successfully Completed
                    </Animated.Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.loading || "#FFFFFF",
    },
    backgroundImage: {
        ...StyleSheet.absoluteFillObject,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 80, // Position text at the bottom or adjust as needed
        zIndex: 10,
    },
    loadingText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.secondaryText || "#000",
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
});

export default AuthLoading;