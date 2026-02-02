import React from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../utils/theme';
import { Ionicons } from '@expo/vector-icons';

const SettingItem = ({ icon, label, hasSwitch, value }) => (
    <View style={styles.settingItem}>
        <View style={styles.settingLeft}>
            <View style={styles.iconBox}>
                <Ionicons name={icon} size={20} color={COLORS.text} />
            </View>
            <Text style={styles.settingLabel}>{label}</Text>
        </View>
        {hasSwitch ? (
            <Switch
                value={value}
                trackColor={{ false: '#767577', true: COLORS.primary }}
                thumbColor={'#f4f3f4'}
            />
        ) : (
            <Ionicons name="chevron-forward" size={20} color="#ccc" />
        )}
    </View>
);

const ProfileScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        <Ionicons name="person" size={40} color="#fff" />
                    </View>
                    <View>
                        <Text style={styles.userName}>Heritage Explorer</Text>
                        <Text style={styles.userStatus}>Premium Member</Text>
                    </View>
                </View>

                <View style={styles.statsRow}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>12</Text>
                        <Text style={styles.statLabel}>Saved</Text>
                    </View>
                    <View style={styles.statDivider} />
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>48</Text>
                        <Text style={styles.statLabel}>Read</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Settings</Text>
                <SettingItem icon="notifications-outline" label="Notifications" hasSwitch value={true} />
                <SettingItem icon="eye-outline" label="Dark Mode" hasSwitch value={false} />
                <SettingItem icon="globe-outline" label="Language" />
                <SettingItem icon="shield-checkmark-outline" label="Privacy & Security" />
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account</Text>
                <SettingItem icon="key-outline" label="Change Password" />
                <TouchableOpacity style={styles.signOutBtn}>
                    <Text style={styles.signOutText}>Sign Out</Text>
                </TouchableOpacity>
            </View>

            <View style={{ height: 100 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        backgroundColor: COLORS.white,
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    avatarContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: COLORS.secondaryText,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },
    userName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    userStatus: {
        fontSize: 14,
        color: COLORS.primary,
        fontWeight: '600',
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    statLabel: {
        fontSize: 12,
        color: COLORS.secondaryText,
    },
    statDivider: {
        width: 1,
        height: 24,
        backgroundColor: '#eee',
    },
    section: {
        marginTop: 24,
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.secondaryText,
        marginBottom: 12,
        textTransform: 'uppercase',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.white,
        padding: 16,
        borderRadius: 12,
        marginBottom: 8,
    },
    settingLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        marginRight: 12,
    },
    settingLabel: {
        fontSize: 16,
        color: COLORS.text,
    },
    signOutBtn: {
        marginTop: 16,
        alignItems: 'center',
        padding: 16,
    },
    signOutText: {
        color: COLORS.error,
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ProfileScreen;
