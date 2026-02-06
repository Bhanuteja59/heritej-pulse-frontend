import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  Platform,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, SCREENS } from "../services/NavigationContext";
import { MockDataService } from "../data/mockData";
import { useLanguage } from "../services/LanguageContext";

/**
 * Explore Screen (Touch-scroll only)
 * ✅ Categories: horizontal touch scroll
 * ✅ Each section carousel: horizontal touch scroll + snap
 * ✅ No auto-scroll
 * ✅ "See All" opens one reusable list screen with params
 */

const CARD_WIDTH = 288;
const CARD_GAP = 16;
const SNAP_INTERVAL = CARD_WIDTH + CARD_GAP;

const Explore = () => {
  const [search, setSearch] = useState("");
  const { navigate } = useNavigation();
  const { t, language } = useLanguage();

  // --- DATA (replace later with API) ---
  const categories = useMemo(
    () => [
      { id: "heritage-1", key: "heritage", label: t("cat_heritage"), icon: require("../../assets/images/heritej-pulse-logo.png") },
      { id: "dance-1", key: "dance", label: t("cat_dance"), icon: require("../../assets/images/heritej-pulse-logo.png") },
      { id: "history-1", key: "history", label: t("cat_history"), icon: require("../../assets/images/heritej-pulse-logo.png") },
      { id: "events-1", key: "events", label: t("cat_events"), icon: require("../../assets/images/heritej-pulse-logo.png") },
      { id: "culture-1", key: "culture", label: t("cat_culture"), icon: require("../../assets/images/heritej-pulse-logo.png") },
      { id: "food-1", key: "food", label: t("cat_food"), icon: require("../../assets/images/heritej-pulse-logo.png") },
    ],
    [t]
  );

  const topNews = useMemo(() => MockDataService.getExploreSection("topNews", language), [language]);
  const culturalEvents = useMemo(() => MockDataService.getExploreSection("culturalEvents", language), [language]);
  const museums = useMemo(() => MockDataService.getExploreSection("museums", language), [language]);

  const onRefresh = () => {
    // optional: later refresh API
  };

  const onOpenDetail = (item) => {
    navigate(SCREENS.DETAIL, { articleId: item?.id });
  };

  const categoryBaseMap = {
    heritage: "Heritage",
    dance: "Dance",
    history: "History",
    events: "Events",
    culture: "Culture",
    food: "Food",
  };

  const onOpenCategory = (key) => {
    const allItems = [...topNews, ...culturalEvents, ...museums];
    const base = categoryBaseMap[key];
    const normalized = String(base).toLowerCase();

    const filtered = allItems.filter((item) => {
      const category = (item?.category || "").toLowerCase();
      const badge = (item?.categoryBadge || item?.badge || "").toLowerCase();
      const tags = (item?.tags || []).map((t) => String(t).toLowerCase());

      return (
        category === normalized ||
        badge.includes(normalized) ||
        tags.includes(normalized)
      );
    });

    const label = t(`cat_${key}`);
    navigate(SCREENS.EXPLORE_SECTION_GRID, {
      sectionKey: `category-${normalized}`,
      titleKey: `cat_${key}`,
      subtitleKey: "explore_category_subtitle",
      title: label,
      subtitle: t("explore_category_subtitle", { category: label }),
      subtitleVars: { category: label },
      items: filtered,
    });
  };

  // ✅ SEE ALL handlers (open reusable list screen)
  const onSeeAllTop = () => {
    navigate(SCREENS.EXPLORE_SECTION_GRID, {
      sectionKey: "topNews",
      titleKey: "explore_top_news_title",
      subtitleKey: "explore_top_news_subtitle",
      title: t("explore_top_news_title"),
      subtitle: t("explore_top_news_subtitle"),
      items: topNews, // ✅ PASS DATA
    });
  };

  const onSeeAllTrending = () => {
    navigate(SCREENS.EXPLORE_SECTION_GRID, {
      sectionKey: "culturalEvents",
      titleKey: "explore_trending_title",
      subtitleKey: "explore_trending_subtitle",
      title: t("explore_trending_title"),
      subtitle: t("explore_trending_subtitle"),
      items: culturalEvents, // ✅ PASS DATA
    });
  };

  const onSeeAllMuseums = () => {
    navigate(SCREENS.EXPLORE_SECTION_GRID, {
      sectionKey: "museums",
      titleKey: "explore_museums_title",
      subtitleKey: "explore_museums_subtitle",
      title: t("explore_museums_title"),
      subtitle: t("explore_museums_subtitle"),
      items: museums, // ✅ PASS DATA
      columns: 2, // ✅ 2-column grid for museums
    });
  };

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

          <Pressable onPress={onRefresh} hitSlop={10} style={styles.refreshBtn}>
            <Ionicons name="refresh" size={18} color={stylesVars.orange} />
          </Pressable>
        </View>

        {/* Search */}
        <View style={styles.searchWrap}>
          <Ionicons
            name="search"
            size={18}
            color={stylesVars.grayText}
            style={{ marginRight: 10 }}
          />
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

        {/* Browse by category */}
        <Text style={styles.sectionKicker}>{t("explore_browse_by_category")}</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
          {categories.map((c) => (
            <Pressable key={c.id} style={styles.categoryItem} onPress={() => onOpenCategory(c.key)}>
              <View style={styles.categoryImgWrap}>
                <Image source={c.icon} style={styles.categoryImg} resizeMode="cover" />
              </View>
              <Text style={styles.categoryLabel}>{c.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* 1) Top Heritage News */}
        <SectionTitle title={t("explore_top_news_title")} subtitle={t("explore_top_news_subtitle")} />

        <SnapCarousel
          data={topNews}
          renderItem={(item) => <ExploreCard item={item} onPress={onOpenDetail} />}
        />

        <Pressable style={styles.seeAllBtn} onPress={onSeeAllTop}>
          <Text style={styles.seeAllText}>{t("explore_see_all")}</Text>
          <Ionicons name="chevron-forward" size={16} color={stylesVars.darkText} />
        </Pressable>

        {/* 2) Trending */}
        <SectionTitle title={t("explore_trending_title")} subtitle={t("explore_trending_subtitle")} />

        <SnapCarousel
          data={culturalEvents}
          renderItem={(item) => <ExploreCard item={item} onPress={onOpenDetail} />}
        />

        <Pressable style={styles.seeAllBtn} onPress={onSeeAllTrending}>
          <Text style={styles.seeAllText}>{t("explore_see_all")}</Text>
          <Ionicons name="chevron-forward" size={16} color={stylesVars.darkText} />
        </Pressable>

        {/* 3) Museums */}
        <SectionTitle title={t("explore_museums_title")} subtitle={t("explore_museums_subtitle")} />

        <SnapCarousel
          data={museums}
          renderItem={(item) => <ExploreCard item={item} onPress={onOpenDetail} />}
        />

        <Pressable style={styles.seeAllBtn} onPress={onSeeAllMuseums}>
          <Text style={styles.seeAllText}>{t("explore_see_all")}</Text>
          <Ionicons name="chevron-forward" size={16} color={stylesVars.darkText} />
        </Pressable>

        <View style={{ height: 28 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const SectionTitle = ({ title, subtitle }) => (
  <View style={styles.sectionHead}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionSub}>{subtitle}</Text>
  </View>
);

/**
 * Touch-only Snap Carousel
 * ✅ drag left/right
 * ✅ snap to each card
 * ✅ no auto-scroll
 */
const SnapCarousel = ({ data, renderItem }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.cardsRow}
      snapToInterval={SNAP_INTERVAL}
      decelerationRate="fast"
      disableIntervalMomentum
      bounces={false}
    >
      {data.map((item, i) => (
        <View key={item.id} style={{ marginRight: i === data.length - 1 ? 0 : CARD_GAP }}>
          {renderItem(item)}
        </View>
      ))}
    </ScrollView>
  );
};

const ExploreCard = ({ item, onPress }) => (
  <Pressable style={styles.card} onPress={() => onPress?.(item)}>
    <View style={styles.cardImageWrap}>
      <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.badge}>
        <Ionicons name="compass" size={14} color={stylesVars.orange} />
        <Text style={styles.badgeText}>{item.badge}</Text>
      </View>
    </View>

    <View style={styles.cardBody}>
      <Text style={styles.cardTitle} numberOfLines={2}>
        {item.title}
      </Text>

      <View style={styles.ratingRow}>
        <View style={styles.ratingPill}>
          <Ionicons name="star" size={12} color="#fff" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <Text style={styles.reviewsText}>({item.reviews})</Text>
      </View>

      <View style={styles.tagsRow}>
        {item.tags.map((t) => (
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

  refreshBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },

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

  sectionKicker: { marginTop: 18, fontSize: 12, letterSpacing: 0.8, color: stylesVars.grayText, fontWeight: "600" },

  categoryRow: { paddingTop: 14, paddingBottom: 8, gap: 22, paddingRight: 8 },
  categoryItem: { width: 96, alignItems: "center" },
  categoryImgWrap: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: stylesVars.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: Platform.OS === "ios" ? 0.08 : 0,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  categoryImg: { width: 78, height: 78, borderRadius: 39 },
  categoryLabel: { marginTop: 10, fontSize: 12, color: stylesVars.darkText, fontWeight: "500" },

  sectionHead: { marginTop: 18 },
  sectionTitle: { fontSize: 20, lineHeight: 28, fontWeight: "700", color: stylesVars.darkText },
  sectionSub: { marginTop: 4, fontSize: 14, color: stylesVars.grayText },

  cardsRow: { paddingTop: 14, paddingBottom: 8, paddingRight: 8 },

  card: {
    width: CARD_WIDTH,
    borderRadius: 18,
    backgroundColor: stylesVars.white,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: Platform.OS === "ios" ? 0.10 : 0,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  cardImageWrap: { height: 155, backgroundColor: "#eee" },
  cardImage: { width: "100%", height: "100%" },

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

  cardBody: { paddingHorizontal: 14, paddingTop: 12, paddingBottom: 14 },
  cardTitle: { fontSize: 16, fontWeight: "700", color: stylesVars.darkText },

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

  seeAllBtn: {
    marginTop: 10,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: stylesVars.orange,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  seeAllText: { fontSize: 14, fontWeight: "700", color: stylesVars.darkText },
});

export default Explore;
