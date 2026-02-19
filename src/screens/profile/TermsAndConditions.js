import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, SCREENS } from "../../services/NavigationContext";
import { useTheme } from "../../services/ThemeContext";
import BackgroundPattern from "../../components/BackgroundPattern";

const TermsAndConditions = () => {
    const { goBack, navigate } = useNavigation();
    const { colors, isDarkMode } = useTheme();

    const renderSection = (title, content) => (
        <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.primary }]}>{title}</Text>
            <Text style={[styles.bodyText, { color: colors.secondaryText }]}>{content}</Text>
        </View>
    );

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
                <Text style={[styles.title, { color: colors.primary }]}>Terms & Conditions</Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={[styles.lastUpdated, { color: colors.secondaryText }]}>Effective Date: February 18, 2026</Text>

                {renderSection(
                    "1. Acceptance of Terms",
                    "By accessing or using the Heritage Pulse application, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services."
                )}

                {renderSection(
                    "2. Content Usage",
                    "All content provided on this app is for informational purposes only. You may not reproduce, distribute, or exploit any content without our prior written permission."
                )}

                {renderSection(
                    "3. User Conduct",
                    "You agree not to use the app for any unlawful purpose. Harassment, hate speech, or sharing of inappropriate content is strictly prohibited and will result in account termination."
                )}

                {renderSection(
                    "4. Intellectual Property",
                    "All intellectual property rights related to the app and its content are owned by Heritage Pulse or its licensors."
                )}

                {renderSection(
                    "5. Limitation of Liability",
                    "Heritage Pulse is not liable for any direct, indirect, incidental, or consequential damages arising from your use of the app."
                )}

                <View style={[styles.footer, { borderTopColor: colors.border }]}>
                    <Text style={[styles.footerText, { color: colors.secondaryText }]}>
                        These terms are governed by the laws of India.
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
        fontSize: 18,
        fontWeight: "700",
    },
    headerSpacer: {
        width: 40,
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    lastUpdated: {
        fontSize: 14,
        marginBottom: 24,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "700",
        marginBottom: 8,
    },
    bodyText: {
        fontSize: 15,
        lineHeight: 24,
        textAlign: 'justify',
    },
    footer: {
        marginTop: 20,
        paddingTop: 20,
        borderTopWidth: 1,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 14,
        fontWeight: '500',
    }
});

export default TermsAndConditions;
