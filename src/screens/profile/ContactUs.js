import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, SCREENS } from "../../services/NavigationContext";
import { useTheme } from "../../services/ThemeContext";
import BackgroundPattern from "../../components/BackgroundPattern";

const ContactUs = () => {
    const { goBack, navigate } = useNavigation();
    const { colors, isDarkMode } = useTheme();

    const handleEmail = () => {
        Linking.openURL('mailto:support@heritagepulse.com');
    };

    const handleCall = () => {
        Linking.openURL('tel:+911234567890');
    };

    const handleWebsite = () => {
        Linking.openURL('https://www.heritagepulse.com');
    };

    const ContactItem = ({ icon, label, value, onPress }) => (
        <TouchableOpacity
            style={[styles.contactItem, { backgroundColor: colors.cardBg }]}
            onPress={onPress}
            activeOpacity={0.7}
        >
            <View style={[styles.iconContainer, { backgroundColor: colors.background }]}>
                <Ionicons name={icon} size={24} color={colors.primary} />
            </View>
            <View style={styles.textContainer}>
                <Text style={[styles.label, { color: colors.secondaryText }]}>{label}</Text>
                <Text style={[styles.value, { color: colors.text }]}>{value}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.secondaryText} />
        </TouchableOpacity>
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
                <Text style={[styles.title, { color: colors.primary }]}>Contact Us</Text>
                <View style={styles.headerSpacer} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={[styles.subtitle, { color: colors.text }]}>
                    We'd love to hear from you! Reach out to us for any queries, support, or collaborations.
                </Text>

                <ContactItem
                    icon="mail-outline"
                    label="Email Support"
                    value="support@heritagepulse.com"
                    onPress={handleEmail}
                />

                <ContactItem
                    icon="call-outline"
                    label="Customer Care"
                    value="+91 12345 67890"
                    onPress={handleCall}
                />

                <ContactItem
                    icon="globe-outline"
                    label="Website"
                    value="www.heritagepulse.com"
                    onPress={handleWebsite}
                />

                <View style={[styles.officeContainer, { backgroundColor: colors.cardBg, borderColor: colors.border }]}>
                    <Text style={[styles.officeTitle, { color: colors.primary }]}>Head Office</Text>
                    <Text style={[styles.address, { color: colors.secondaryText }]}>
                        Pleach India Foundation,{'\n'}
                        123, Heritage Lane, Cultural Hub,{'\n'}
                        New Delhi, India - 110001
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
    },
    subtitle: {
        fontSize: 16,
        marginBottom: 30,
        textAlign: 'center',
        lineHeight: 24,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    label: {
        fontSize: 12,
        marginBottom: 4,
    },
    value: {
        fontSize: 16,
        fontWeight: '600',
    },
    officeContainer: {
        marginTop: 20,
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        alignItems: 'center',
    },
    officeTitle: {
        fontSize: 18,
        fontWeight: '700',
        marginBottom: 10,
    },
    address: {
        fontSize: 15,
        textAlign: 'center',
        lineHeight: 24,
    },
});

export default ContactUs;
