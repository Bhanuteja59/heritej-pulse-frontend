import React, { useEffect, useRef } from "react";
import { View, Image, StyleSheet, Text, Animated } from "react-native";
import { COLORS } from "../utils/theme";

const Loading = () => {
    const fadeAnim = useRef(new Animated.Value(0.3)).current; // Start with lower opacity

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0.3,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [fadeAnim]);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image
                    source={require("../../assets/images/heritej-pulse-logo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />

                <View style={styles.animationContainer}>
                    <Image
                        source={require("../../assets/images/loading-animation.gif")}
                        style={styles.animation}
                        resizeMode="contain"
                    />
                </View>

                <Animated.Text style={[styles.loadingText, { opacity: fadeAnim }]}>
                    Loading...
                </Animated.Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.loading,
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 200,
        height: 200,
        marginTop: 100
    },
    animationContainer: {
        width: 300,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    animation: {
        width: '100%',
        height: '100%',
        marginBottom: 100
    },
    loadingText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.secondaryText,
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginTop: 10,
    },
});

export default Loading;

