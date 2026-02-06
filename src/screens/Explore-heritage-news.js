import React, { useMemo } from "react";
import { View, Text, StyleSheet, FlatList, Pressable, SafeAreaView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, SCREENS } from "../services/NavigationContext";
import { MockDataService } from "../data/mockData";
import { useLanguage } from "../services/LanguageContext";

const ExploreSectionList = () => {
  const { params, navigate } = useNavigation();
  const { sectionKey, title, subtitle } = params || {};
  const { language, t } = useLanguage();

  const data = useMemo(() => {
    if (!sectionKey) return [];
    return MockDataService.getExploreSection(sectionKey, language);
  }, [sectionKey, language]);

  const onBack = () => {
    navigate(SCREENS.EXPLORE);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Pressable onPress={onBack} hitSlop={10} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={20} color={stylesVars.darkText} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title || t("explore_title")}</Text>
          {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigate(SCREENS.DETAIL, { articleId: item.id })}
            style={styles.card}
          >
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
              <Text style={styles.cardMeta}>{item.subtitle}</Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No items found for this section.</Text>
        }
      />
    </SafeAreaView>
  );
};

const stylesVars = {
  bg: "#FBF4EE",
  white: "#FFFFFF",
  darkText: "#2E2E2E",
  grayText: "#6B6B6B",
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: stylesVars.bg },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 10,
    gap: 8,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: stylesVars.white,
  },
  title: { fontSize: 20, fontWeight: "700", color: stylesVars.darkText },
  subtitle: { marginTop: 2, fontSize: 12, color: stylesVars.grayText },
  listContent: { paddingHorizontal: 16, paddingBottom: 20 },
  card: {
    backgroundColor: stylesVars.white,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
  },
  cardImage: { width: "100%", height: 160, backgroundColor: "#eee" },
  cardBody: { padding: 12 },
  cardTitle: { fontSize: 16, fontWeight: "700", color: stylesVars.darkText },
  cardMeta: { marginTop: 4, fontSize: 12, color: stylesVars.grayText },
  empty: { padding: 16, color: stylesVars.grayText, textAlign: "center" },
});

export default ExploreSectionList;
