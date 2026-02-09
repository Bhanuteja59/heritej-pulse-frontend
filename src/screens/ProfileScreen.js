import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, ScrollView, Image, TouchableOpacity, Pressable } from "react-native";
import { COLORS } from "../utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, SCREENS } from "../services/NavigationContext";
import { MockDataService } from "../data/mockData";
import { useLanguage } from "../services/LanguageContext";

const SettingRow = ({ icon, label, hasSwitch, value, onValueChange, onPress }) => (
  <Pressable style={styles.settingRow} onPress={onPress} disabled={!onPress}>
    <View style={styles.settingLeft}>
      <Ionicons name={icon} size={20} color={stylesVars.icon} />
      <Text style={styles.settingLabel}>{label}</Text>
    </View>
    {hasSwitch ? (
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: "#E3DED7", true: "#F7B07A" }}
        thumbColor={value ? stylesVars.orange : "#f4f3f4"}
      />
    ) : (
      <Ionicons name="chevron-forward" size={20} color={stylesVars.chevron} />
    )}
  </Pressable>
);

const ProfileScreen = () => {
  const { navigate } = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const { t, language } = useLanguage();
  const profile = MockDataService.getUserProfile(language);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarWrap}>
          <Image source={{ uri: profile.avatar }} style={styles.avatar} />
          <View style={styles.onlineDot} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.userName}>{profile.name}</Text>
          <Text style={styles.userRole}>{profile.role}</Text>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>{t("profile_edit")}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>{t("profile_activity")}</Text>
      <View style={styles.activityCard}>
        <View style={styles.activityIconWrap}>
          <Ionicons name="heart" size={18} color={stylesVars.orange} />
        </View>
        <Text style={styles.activityValue}>{profile.stats.saved}</Text>
        <Text style={styles.activityLabel}>{t("profile_bookmarks")}</Text>
      </View>

      <Text style={styles.sectionTitle}>{t("profile_settings")}</Text>
      <View style={styles.settingsGroup}>
        <SettingRow
          icon="notifications-outline"
          label={t("profile_notifications")}
          hasSwitch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
        <SettingRow
          icon="chevron-down-outline"
          label={t("profile_auto_scroll")}
          hasSwitch
          value={autoScrollEnabled}
          onValueChange={setAutoScrollEnabled}
        />
        <SettingRow icon="options-outline" label={t("profile_language")} onPress={() => navigate(SCREENS.LANGUAGE)} />
        <SettingRow icon="shield-checkmark-outline" label={t("profile_privacy")} onPress={() => navigate(SCREENS.PRIVACY)} />
        <SettingRow icon="lock-closed-outline" label={t("profile_change_password")} onPress={() => {}} />
      </View>

      <TouchableOpacity style={styles.signOutBtn} onPress={() => navigate(SCREENS.REGISTER)}>
        <Text style={styles.signOutText}>{t("profile_sign_out")}</Text>
        <Ionicons name="log-out-outline" size={20} color={COLORS.white} />
      </TouchableOpacity>

      <View style={{ height: 90 }} />
    </ScrollView>
  );
};

const stylesVars = {
  orange: "#EB6A00",
  icon: "#5D5A7A",
  chevron: "#BDB7AF",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 18,
  },
  avatarWrap: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  avatar: {
    width: 78,
    height: 78,
    borderRadius: 39,
  },
  onlineDot: {
    position: "absolute",
    right: 4,
    bottom: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#16C65B",
    borderWidth: 2,
    borderColor: COLORS.white,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },
  userRole: {
    marginTop: 4,
    fontSize: 13,
    color: "#8A7F73",
  },
  editBtn: {
    marginTop: 10,
    alignSelf: "flex-start",
    backgroundColor: "#2E5D76",
    paddingHorizontal: 18,
    height: 34,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  editBtnText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 12,
  },
  sectionTitle: {
    marginTop: 6,
    marginBottom: 10,
    fontSize: 12,
    letterSpacing: 1,
    color: "#7A6F64",
    fontWeight: "700",
  },
  activityCard: {
    width: 120,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  activityIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFF2E9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  activityValue: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },
  activityLabel: {
    marginTop: 2,
    fontSize: 12,
    color: "#8A7F73",
  },
  settingsGroup: {
    gap: 10,
  },
  settingRow: {
    backgroundColor: COLORS.white,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  settingLabel: {
    fontSize: 14,
    color: "#5C5A7A",
    fontWeight: "600",
  },
  signOutBtn: {
    marginTop: 16,
    backgroundColor: stylesVars.orange,
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  signOutText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 14,
  },
});

export default ProfileScreen;
