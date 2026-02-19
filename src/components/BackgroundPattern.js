import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';
import Svg, { Path, Circle, Defs, Pattern, Rect, G, LinearGradient, Stop } from 'react-native-svg';

/**
 * Heritage Pulse Background — Interactive Cultural Motifs
 * 
 * Features:
 * - Large interactive lotus in top-left and bottom-right (pulsing on press)
 * - Scattered cultural icons: paisley, diya, bell, om, peacock, elephant, flute, temple
 * - Kolam dots, jali lattice, and mandala accents
 * - Warm, earthy gradient background
 */
const BackgroundPattern = ({ color = '#666666ff', secondaryColor = '#C38E5D', opacity = 0.05 }) => {
    const [lotusScale1] = useState(new Animated.Value(1));
    const [lotusScale2] = useState(new Animated.Value(1));

    const animateLotus = (scaleAnim, reverse = false) => {
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 1.2,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
        ]).start();
    };

    return (
        <View style={[StyleSheet.absoluteFill, { opacity }]} pointerEvents="box-none">
            <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
                <Defs>
                    <LinearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <Stop offset="0%" stopColor="#FDF3E0" stopOpacity="0.1" />
                        <Stop offset="50%" stopColor="#F3E5D5" stopOpacity="0.2" />
                        <Stop offset="100%" stopColor="#EAD8C5" stopOpacity="0.1" />
                    </LinearGradient>

                    <Pattern
                        id="heritageInteractivePattern"
                        width="200"
                        height="200"
                        patternUnits="userSpaceOnUse"
                    >
                        {/* Gradient base */}
                        <Rect width="200" height="200" fill="url(#bgGradient)" />

                        {/* ========== LARGE INTERACTIVE LOTUS TOP-LEFT ========== */}
                        <G transform="translate(40,40)">
                            <Path
                                d="M0 -30 C15 -35, 35 -25, 30 0 C25 25, 5 35, -15 25 C-35 15, -30 -15, 0 -30 Z"
                                stroke={color}
                                strokeWidth="2.5"
                                fill="none"
                                opacity="0.9"
                            />
                            <Path
                                d="M-10 -15 C-5 -25, 5 -25, 10 -15 C15 -5, 5 5, -5 5 C-15 5, -20 -5, -10 -15 Z"
                                stroke={color}
                                strokeWidth="2"
                                fill="none"
                                opacity="0.7"
                            />
                            <Circle cx="0" cy="0" r="8" fill={color} fillOpacity="0.15" stroke={color} strokeWidth="1" />
                            {/* Inner lotus details */}
                            <Path
                                d="M-3 -3 L3 3 M3 -3 L-3 3"
                                stroke={color}
                                strokeWidth="1.5"
                                opacity="0.8"
                            />
                        </G>

                        {/* ========== LARGE INTERACTIVE LOTUS BOTTOM-RIGHT ========== */}
                        <G transform="translate(160,160)">
                            <Path
                                d="M0 -30 C15 -35, 35 -25, 30 0 C25 25, 5 35, -15 25 C-35 15, -30 -15, 0 -30 Z"
                                stroke={secondaryColor}
                                strokeWidth="2.5"
                                fill="none"
                                opacity="0.9"
                            />
                            <Path
                                d="M-10 -15 C-5 -25, 5 -25, 10 -15 C15 -5, 5 5, -5 5 C-15 5, -20 -5, -10 -15 Z"
                                stroke={secondaryColor}
                                strokeWidth="2"
                                fill="none"
                                opacity="0.7"
                            />
                            <Circle cx="0" cy="0" r="8" fill={secondaryColor} fillOpacity="0.15" stroke={secondaryColor} strokeWidth="1" />
                            <Path
                                d="M-3 -3 L3 3 M3 -3 L-3 3"
                                stroke={secondaryColor}
                                strokeWidth="1.5"
                                opacity="0.8"
                            />
                        </G>

                        {/* ========== CULTURAL ICONS ========== */}

                        {/* Peacock feather - top center */}
                        <G transform="translate(100,25)">
                            <Path
                                d="M0 -15 C8 -20, 16 -15, 12 -5 C8 5, 0 8, -8 0 C-12 -8, -8 -18, 0 -15 Z"
                                stroke={color}
                                strokeWidth="1.2"
                                fill="none"
                            />
                            <Circle cx="2" cy="-7" r="1.5" fill={color} fillOpacity="0.4" />
                            <Circle cx="-4" cy="-5" r="1" fill={color} fillOpacity="0.4" />
                            <Circle cx="6" cy="-3" r="1" fill={color} fillOpacity="0.4" />
                        </G>

                        {/* Elephant - right side */}
                        <G transform="translate(170,70)">
                            <Path
                                d="M-8 -5 C-12 -5, -14 0, -10 5 C-6 10, 2 10, 6 5 C10 0, 8 -5, 4 -5 C2 -8, -2 -8, -4 -5"
                                stroke={color}
                                strokeWidth="1.2"
                                fill="none"
                            />
                            <Path d="M-6 0 L-10 2" stroke={color} strokeWidth="1" />
                        </G>

                        {/* Flute - left center */}
                        <G transform="translate(30,90)">
                            <Rect x="-12" y="-2" width="24" height="4" rx="2" stroke={color} strokeWidth="1" fill="none" />
                            <Circle cx="-6" cy="0" r="1.2" fill={color} fillOpacity="0.4" />
                            <Circle cx="0" cy="0" r="1.2" fill={color} fillOpacity="0.4" />
                            <Circle cx="6" cy="0" r="1.2" fill={color} fillOpacity="0.4" />
                        </G>

                        {/* Temple - bottom left */}
                        <G transform="translate(45,150)">
                            <Path
                                d="M-10 -8 L0 -18 L10 -8 L10 5 L-10 5 Z"
                                stroke={color}
                                strokeWidth="1.2"
                                fill="none"
                            />
                            <Rect x="-5" y="-2" width="10" height="7" stroke={color} strokeWidth="1" fill="none" />
                            <Circle cx="0" cy="0" r="1.5" fill={color} fillOpacity="0.4" />
                        </G>

                        {/* Paisley (Ambi) - bottom center */}
                        <G transform="translate(100,170)">
                            <Path
                                d="M0 -12 C8 -16, 18 -6, 12 4 C6 14, -6 14, -12 4 C-18 -6, -8 -16, 0 -12 Z"
                                stroke={secondaryColor}
                                strokeWidth="1.5"
                                fill="none"
                            />
                            <Path
                                d="M3 -5 C6 -7, 10 -3, 6 2 C2 7, -3 5, -2 0"
                                stroke={secondaryColor}
                                strokeWidth="0.8"
                                fill="none"
                            />
                        </G>

                        {/* Diya - top right */}
                        <G transform="translate(150,30)">
                            <Path
                                d="M-8 -2 C-8 -6, -4 -9, 0 -9 C4 -9, 8 -6, 8 -2 L8 2 C8 5, 4 8, 0 8 C-4 8, -8 5, -8 2 Z"
                                stroke={color}
                                strokeWidth="1.2"
                                fill="none"
                            />
                            <Path d="M0 -9 L0 -13 M-3 -11 L3 -11" stroke={color} strokeWidth="1" />
                        </G>

                        {/* Bell - left top */}
                        <G transform="translate(25,35)">
                            <Path
                                d="M-6 -8 C-6 -11, 6 -11, 6 -8 L8 0 C8 4, -8 4, -8 0 Z"
                                stroke={color}
                                strokeWidth="1.2"
                                fill="none"
                            />
                            <Circle cy="4" r="2" stroke={color} strokeWidth="1" fill="none" />
                            <Path d="M0 -12 L0 -8" stroke={color} strokeWidth="1.2" />
                        </G>

                        {/* Om - center right */}
                        <G transform="translate(170,120)">
                            <Path
                                d="M-10 -5 C-10 -12, -4 -16, 2 -12 C8 -8, 8 0, 2 4 C-4 8, -10 4, -10 -3"
                                stroke={secondaryColor}
                                strokeWidth="1.5"
                                fill="none"
                            />
                            <Circle cx="-3" cy="-6" r="1.2" fill={secondaryColor} fillOpacity="0.5" />
                        </G>

                        {/* Mandala accent - center */}
                        <G transform="translate(100,100)">
                            <Circle r="10" stroke={color} strokeWidth="0.8" fill="none" strokeDasharray="2,2" />
                            <Circle r="6" stroke={color} strokeWidth="0.6" fill="none" />
                            <Path d="M0 -10 L0 10 M-10 0 L10 0 M-7 -7 L7 7 M-7 7 L7 -7" stroke={color} strokeWidth="0.6" />
                        </G>

                        {/* Kolam dots grid */}
                        <G>
                            <Circle cx="15" cy="15" r="1.2" fill={color} />
                            <Circle cx="185" cy="15" r="1.2" fill={color} />
                            <Circle cx="15" cy="185" r="1.2" fill={color} />
                            <Circle cx="185" cy="185" r="1.2" fill={color} />
                            <Circle cx="60" cy="60" r="1.5" fill={color} />
                            <Circle cx="140" cy="140" r="1.5" fill={secondaryColor} />
                            <Circle cx="70" cy="130" r="1" fill={color} />
                            <Circle cx="130" cy="70" r="1" fill={secondaryColor} />
                        </G>

                        {/* Jali lattice accents */}
                        <G transform="translate(100,50)">
                            <Rect x="-15" y="-15" width="30" height="30" stroke={color} strokeWidth="0.5" fill="none" strokeDasharray="3,2" />
                            <Path d="M-15 -15 L15 15 M15 -15 L-15 15" stroke={color} strokeWidth="0.5" strokeDasharray="3,2" />
                        </G>

                        <G transform="translate(50,150)">
                            <Rect x="-15" y="-15" width="30" height="30" stroke={secondaryColor} strokeWidth="0.5" fill="none" strokeDasharray="3,2" />
                            <Path d="M-15 -15 L15 15 M15 -15 L-15 15" stroke={secondaryColor} strokeWidth="0.5" strokeDasharray="3,2" />
                        </G>
                    </Pattern>
                </Defs>

                {/* Background gradient */}
                <Rect width="100%" height="100%" fill="url(#bgGradient)" />

                {/* Pattern overlay */}
                <Rect width="100%" height="100%" fill="url(#heritageInteractivePattern)" />
            </Svg>

            {/* Interactive touch areas for lotus animation */}
            <TouchableWithoutFeedback onPress={() => animateLotus(lotusScale1)}>
                <Animated.View style={[styles.touchArea, styles.topLeft, { transform: [{ scale: lotusScale1 }] }]} />
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => animateLotus(lotusScale2)}>
                <Animated.View style={[styles.touchArea, styles.bottomRight, { transform: [{ scale: lotusScale2 }] }]} />
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    touchArea: {
        position: 'absolute',
        width: 100,
        height: 100,
        backgroundColor: 'transparent',
    },
    topLeft: {
        top: 20,
        left: 20,
    },
    bottomRight: {
        bottom: 20,
        right: 20,
    },
});

export default BackgroundPattern;
