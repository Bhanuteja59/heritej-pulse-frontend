import React from "react";
import { SafeAreaView, View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/theme";
import { useNavigation, SCREENS } from "../services/NavigationContext";
import { useLanguage } from "../services/LanguageContext";

const LanguageScreen = () => {
  const { goBack, navigate } = useNavigation();
  const { language, setLanguage, t, languages } = useLanguage();
  const labelKeyByCode = {
    en: "language_english",
    te: "language_telugu",
    ta: "language_tamil",
    kn: "language_kannada",
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Pressable
            onPress={() => {
              if (goBack) {
                goBack();
              } else {
                navigate(SCREENS.PROFILE);
              }
            }}
            style={styles.backBtn}
            hitSlop={10}
          >
            <Ionicons name="chevron-back" size={20} color={COLORS.text} />
          </Pressable>
          <Text style={styles.title}>{t("language_title")}</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.list}>
          {languages.map((lang) => {
            const selected = language === lang.code;
            return (
              <Pressable
                key={lang.code}
                onPress={() => setLanguage(lang.code)}
                style={[styles.langItem, selected && styles.langItemActive]}
              >
                <Text style={[styles.langText, selected && styles.langTextActive]}>
                  {t(labelKeyByCode[lang.code])}
                </Text>
                {selected && <Ionicons name="checkmark" size={18} color={COLORS.white} />}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingTop: 6,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },
  headerSpacer: {
    width: 36,
  },
  list: {
    marginTop: 20,
    gap: 14,
  },
  langItem: {
    height: 52,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1F1F1F",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.white,
  },
  langItemActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  langText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#5C5A7A",
  },
  langTextActive: {
    color: COLORS.white,
  },
});

export default LanguageScreen;
