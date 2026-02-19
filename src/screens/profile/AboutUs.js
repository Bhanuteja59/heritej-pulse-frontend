import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, SCREENS } from "../../services/NavigationContext";
import { useLanguage } from "../../services/LanguageContext";
import { useTheme } from "../../services/ThemeContext";
import BackgroundPattern from "../../components/BackgroundPattern";

const { width } = Dimensions.get('window');

const AboutUs = () => {
    const { goBack, navigate } = useNavigation();
    const { t } = useLanguage();
    const { colors, isDarkMode } = useTheme();

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <BackgroundPattern color={isDarkMode ? colors.primary : '#00cdabff'} opacity={isDarkMode ? 0.1 : 0.05} />
            <View style={[styles.header, { borderBottomColor: colors.border }]}>
                <TouchableOpacity
                    onPress={() => goBack ? goBack() : navigate(SCREENS.PROFILE)}
                    style={[styles.backBtn, { backgroundColor: colors.cardBg }]}
                >
                    <Ionicons name="chevron-back" size={24} color={colors.text} />
                </TouchableOpacity>
                <Text style={[styles.title, { color: colors.primary }]}>About Us</Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../../assets/images/heritej-pulse-logo.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
                    <Text style={[styles.appName, { color: colors.text }]}>Heritage Pulse</Text>
                    <Text style={[styles.version, { color: colors.secondaryText }]}>Version 1.0.0</Text>
                </View>

                <View style={[styles.section, { backgroundColor: colors.cardBg }]}>
                    <Text style={[styles.sectionTitle, { color: colors.primary }]}>Our Mission</Text>
                    <Text style={[styles.bodyText, { color: colors.text }]}>
                        At Heritage Pulse, our mission is to preserve and celebrate the rich cultural tapestry of India. We verify, curate, and share stories, traditions, and news that define our heritage, ensuring it remains vibrant for future generations.
                    </Text>
                </View>

                <View style={[styles.section, { backgroundColor: colors.cardBg }]}>
                    <Text style={[styles.sectionTitle, { color: colors.primary }]}>Who We Are</Text>
                    <Text style={[styles.bodyText, { color: colors.text }]}>
                        We are a passionate team of historians, developers, and culture enthusiasts dedicated to bridging the gap between ancient traditions and the modern world. Powered by the Pleach India Foundation.
                    </Text>
                </View>

                <View style={[styles.section, { backgroundColor: colors.cardBg }]}>
                    <Text style={[styles.sectionTitle, { color: colors.primary }]}>Join Us</Text>
                    <Text style={[styles.bodyText, { color: colors.text }]}>
                        Be a part of our journey. Explore, learn, and contribute to the living history of our nation.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
    },
    headerSpacer: {
        width: 40,
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    appName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    version: {
        fontSize: 14,
    },
    section: {
        padding: 20,
        borderRadius: 16,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 10,
    },
    bodyText: {
        fontSize: 15,
        lineHeight: 24,
    },
});

export default AboutUs;
