import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  SafeAreaView,
  Platform,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, SCREENS } from "../services/NavigationContext";
import { MockDataService } from "../data/mockData";
import { useLanguage } from "../services/LanguageContext";

export default function ExploreSectionGrid() {
  const { params, navigate, goBack } = useNavigation();
  const [search, setSearch] = useState("");
  const { t, language } = useLanguage();

  const sectionKey = params?.sectionKey || "topNews";
  const title = params?.titleKey ? t(params.titleKey, params?.titleVars || {}) : params?.title || t("explore_top_news_title");
  const subtitle = params?.subtitleKey
    ? t(params.subtitleKey, params?.subtitleVars || {})
    : params?.subtitle || t("explore_top_news_subtitle");
  const columns = params?.columns === 2 ? 2 : 1; // ✅ default 1 (single column)

  const items = useMemo(() => {
    if (Array.isArray(params?.items) && params.items.length > 0) {
      return params.items
        .map((it) => MockDataService.getArticleById(it.id, language))
        .filter(Boolean);
    }
    return MockDataService.getExploreSection(sectionKey, language);
  }, [params?.items, sectionKey, language]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return items;
    return items.filter((x) => (x?.title || "").toLowerCase().includes(q));
  }, [search, items]);

  // ✅ build rows based on columns
  const rows = useMemo(() => {
    const out = [];
    const step = columns;
    for (let i = 0; i < filtered.length; i += step) out.push(filtered.slice(i, i + step));
    return out;
  }, [filtered, columns]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.h1}>{t("explore_title")}</Text>
            <Text style={styles.sub}>{t("explore_subtitle")}</Text>
          </View>

          <Pressable onPress={goBack} hitSlop={10} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color={stylesVars.orange} />
          </Pressable>
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <Ionicons name="search" size={18} color={stylesVars.grayText} style={{ marginRight: 10 }} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder={t("explore_search_placeholder")}
            placeholderTextColor={stylesVars.grayText}
            style={styles.searchInput}
            returnKeyType="search"
          />
          <Ionicons name="sparkles" size={18} color={stylesVars.orange} />
        </View>

        {/* Title */}
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionSub}>{subtitle}</Text>
        </View>

        {/* List/Grid */}
        <View style={{ marginTop: 14 }}>
          {rows.map((row, rIdx) => (
            <View
              key={rIdx}
              style={[
                styles.row,
                columns === 2 ? styles.rowTwoCol : styles.rowOneCol,
              ]}
            >
              {row.map((item) =>
                columns === 2 ? (
                  <GridCard
                    key={item.id}
                    item={item}
                    onPress={() => navigate(SCREENS.DETAIL, { articleId: item?.id })}
                  />
                ) : (
                  <BigCard
                    key={item.id}
                    item={item}
                    onPress={() => navigate(SCREENS.DETAIL, { articleId: item?.id })}
                  />
                )
              )}

              {/* fill blank space for 2-col last row */}
              {columns === 2 && row.length === 1 ? <View style={{ flex: 1 }} /> : null}
            </View>
          ))}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

/** ✅ 1-column big card (matches your screenshot) */
function BigCard({ item, onPress }) {
  const imageSource = typeof item?.image === "string" ? { uri: item.image } : item?.image;

  return (
    <Pressable onPress={onPress} style={styles.bigCard}>
      <View style={styles.bigImgWrap}>
        <Image source={imageSource} style={styles.bigImg} resizeMode="cover" />
        <View style={styles.badge}>
          <Ionicons name="compass" size={14} color={stylesVars.orange} />
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>
      </View>

      <View style={styles.bigBody}>
        <Text style={styles.bigTitle} numberOfLines={2}>{item.title}</Text>

        <View style={styles.ratingRow}>
          <View style={styles.ratingPill}>
            <Ionicons name="star" size={12} color="#fff" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.reviewsText}>({item.reviews})</Text>
        </View>

        <View style={styles.tagsRow}>
          {(item.tags || []).slice(0, 2).map((t) => (
            <View key={t} style={styles.tagPill}>
              <Text style={styles.tagText}>{t}</Text>
            </View>
          ))}
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="location-outline" size={14} color={stylesVars.grayText} />
            <Text style={styles.metaText}>{item.location}</Text>
          </View>

          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={14} color={stylesVars.grayText} />
            <Text style={styles.metaText}>{item.time}</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

/** ✅ 2-column small card (Museums) */
function GridCard({ item, onPress }) {
  const imageSource = typeof item?.image === "string" ? { uri: item.image } : item?.image;

  return (
    <Pressable onPress={onPress} style={styles.gridCard}>
      <View style={styles.gridImgWrap}>
        <Image source={imageSource} style={styles.gridImg} resizeMode="cover" />
        <View style={styles.badgeSmall}>
          <Ionicons name="compass" size={13} color={stylesVars.orange} />
          <Text style={styles.badgeTextSmall}>{item.badge}</Text>
        </View>
      </View>

      <View style={styles.gridBody}>
        <Text style={styles.gridTitle} numberOfLines={2}>{item.title}</Text>

        <View style={styles.ratingRow}>
          <View style={styles.ratingPill}>
            <Ionicons name="star" size={12} color="#fff" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
          <Text style={styles.reviewsText}>({item.reviews})</Text>
        </View>
      </View>
    </Pressable>
  );
}

const stylesVars = {
  bg: "#FBF4EE",
  white: "#FFFFFF",
  orange: "#FF7A00",
  darkText: "#2E2E2E",
  grayText: "#6B6B6B",
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: stylesVars.bg },
  screen: { flex: 1, backgroundColor: stylesVars.bg },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 24 },

  headerRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingTop: 4 },
  h1: { fontSize: 28, fontWeight: "700", color: stylesVars.darkText },
  sub: { marginTop: 4, fontSize: 14, color: stylesVars.grayText },
  backBtn: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },

  searchWrap: {
    marginTop: 14,
    height: 52,
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: stylesVars.white,
    borderWidth: 2,
    borderColor: stylesVars.orange,
    shadowColor: "#000",
    shadowOpacity: Platform.OS === "ios" ? 0.08 : 0,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  searchInput: { flex: 1, fontSize: 14, color: stylesVars.darkText, paddingVertical: 0 },

  sectionHead: { marginTop: 18 },
  sectionTitle: { fontSize: 20, lineHeight: 28, fontWeight: "700", color: stylesVars.darkText },
  sectionSub: { marginTop: 4, fontSize: 14, color: stylesVars.grayText },

  row: { marginBottom: 14 },
  rowOneCol: { gap: 14 },
  rowTwoCol: { flexDirection: "row", gap: 14 },

  /* --------- BIG CARD (single column) --------- */
  bigCard: {
    borderRadius: 18,
    backgroundColor: stylesVars.white,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: Platform.OS === "ios" ? 0.10 : 0,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  bigImgWrap: { height: 190, backgroundColor: "#eee" },
  bigImg: { width: "100%", height: "100%" },

  bigBody: { paddingHorizontal: 14, paddingTop: 12, paddingBottom: 14 },
  bigTitle: { fontSize: 16, fontWeight: "700", color: stylesVars.darkText },

  tagsRow: { marginTop: 10, flexDirection: "row", gap: 8 },
  tagPill: {
    backgroundColor: "#F2F2F2",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  tagText: { fontSize: 12, color: stylesVars.darkText, fontWeight: "500" },

  metaRow: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#EFEFEF",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  metaText: { fontSize: 12, color: stylesVars.grayText, fontWeight: "500" },

  /* --------- GRID CARD (2 column) --------- */
  gridCard: {
    flex: 1,
    borderRadius: 18,
    backgroundColor: stylesVars.white,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: Platform.OS === "ios" ? 0.10 : 0,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  gridImgWrap: { height: 120, backgroundColor: "#eee" },
  gridImg: { width: "100%", height: "100%" },
  gridBody: { paddingHorizontal: 12, paddingTop: 10, paddingBottom: 12 },
  gridTitle: { fontSize: 14, fontWeight: "700", color: stylesVars.darkText },

  /* --------- COMMON --------- */
  badge: {
    position: "absolute",
    left: 12,
    bottom: 12,
    backgroundColor: stylesVars.white,
    borderRadius: 16,
    paddingHorizontal: 12,
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    elevation: 2,
  },
  badgeText: { fontSize: 12, fontWeight: "700", color: stylesVars.orange },

  badgeSmall: {
    position: "absolute",
    left: 10,
    bottom: 10,
    backgroundColor: stylesVars.white,
    borderRadius: 16,
    paddingHorizontal: 10,
    height: 30,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  badgeTextSmall: { marginLeft: 7, fontSize: 11, fontWeight: "700", color: stylesVars.orange },

  ratingRow: { marginTop: 10, flexDirection: "row", alignItems: "center", gap: 8 },
  ratingPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#1FA84A",
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 24,
  },
  ratingText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  reviewsText: { fontSize: 12, color: stylesVars.grayText },
});
