import React from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/theme";
import { useNavigation, SCREENS } from "../services/NavigationContext";
import { useLanguage } from "../services/LanguageContext";

const PrivacyScreen = () => {
  const { goBack, navigate } = useNavigation();
  const { t } = useLanguage();

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
          <Text style={styles.title}>{t("privacy_title")}</Text>
          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.divider} />

        <Text style={styles.bodyText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum.
        </Text>

        <Text style={styles.bodyText}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,
          totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </Text>

        <Text style={styles.bodyText}>
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
          dolores eos qui ratione voluptatem sequi nesciunt.
        </Text>
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
  divider: {
    marginTop: 12,
    marginBottom: 14,
    height: 2,
    width: "100%",
    backgroundColor: COLORS.primary,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 22,
    color: COLORS.text,
    marginBottom: 16,
  },
});

export default PrivacyScreen;
