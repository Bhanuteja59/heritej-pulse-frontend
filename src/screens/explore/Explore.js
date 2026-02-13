import React, { useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Platform,
  SafeAreaView,
  Image,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, SCREENS } from "../../services/NavigationContext";
import { useLanguage } from "../../services/LanguageContext";
import { useTheme } from "../../services/ThemeContext";
import { MockDataService } from "../../data/mockData";
import Header from "../../components/Header";

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75; // 75% of screen width
const CARD_GAP = 16;
const SNAP_INTERVAL = CARD_WIDTH + CARD_GAP;

const Explore = () => {
  const { navigate } = useNavigation();
  const { t, language } = useLanguage();
  const { colors, isDarkMode } = useTheme();

  // --- DATA (replace later with API) ---
  const categories = useMemo(
    () => [
      { id: "heritage-1", key: "heritage", label: t("cat_heritage"), icon: require("../../../assets/images/heritej-pulse-logo.png") },
      { id: "dance-1", key: "dance", label: t("cat_dance"), icon: require("../../../assets/images/heritej-pulse-logo.png") },
      { id: "history-1", key: "history", label: t("cat_history"), icon: require("../../../assets/images/heritej-pulse-logo.png") },
      { id: "events-1", key: "events", label: t("cat_events"), icon: require("../../../assets/images/heritej-pulse-logo.png") },
      { id: "culture-1", key: "culture", label: t("cat_culture"), icon: require("../../../assets/images/heritej-pulse-logo.png") },
      { id: "food-1", key: "food", label: t("cat_food"), icon: require("../../../assets/images/heritej-pulse-logo.png") },
    ],
    [t]
  );

  const topNews = useMemo(() => MockDataService.getExploreSection("topNews", language), [language]);
  const culturalEvents = useMemo(() => MockDataService.getExploreSection("culturalEvents", language), [language]);
  const museums = useMemo(() => MockDataService.getExploreSection("museums", language), [language]);

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

  const onSeeAllTop = () => {
    navigate(SCREENS.EXPLORE_SECTION_GRID, {
      sectionKey: "topNews",
      titleKey: "explore_top_news_title",
      subtitleKey: "explore_top_news_subtitle",
      title: t("explore_top_news_title"),
      subtitle: t("explore_top_news_subtitle"),
      items: topNews,
    });
  };

  const onSeeAllTrending = () => {
    navigate(SCREENS.EXPLORE_SECTION_GRID, {
      sectionKey: "culturalEvents",
      titleKey: "explore_trending_title",
      subtitleKey: "explore_trending_subtitle",
      title: t("explore_trending_title"),
      subtitle: t("explore_trending_subtitle"),
      items: culturalEvents,
    });
  };

  const onSeeAllMuseums = () => {
    navigate(SCREENS.EXPLORE_SECTION_GRID, {
      sectionKey: "museums",
      titleKey: "explore_museums_title",
      subtitleKey: "explore_museums_subtitle",
      title: t("explore_museums_title"),
      subtitle: t("explore_museums_subtitle"),
      items: museums,
      columns: 2,
    });
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]}>
      <Header />
      <ScrollView
        style={[styles.screen, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Browse by category */}
        <Text style={[styles.sectionKicker, { color: colors.secondaryText }]}>{t("explore_browse_by_category")}</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
          {categories.map((c) => (
            <Pressable key={c.id} style={styles.categoryItem} onPress={() => onOpenCategory(c.key)}>
              <View
                style={[
                  styles.categoryImgWrap,
                  {
                    backgroundColor: colors.cardBg,
                    shadowColor: colors.text,
                    borderColor: isDarkMode ? colors.primary : 'transparent',
                    borderWidth: isDarkMode ? 1 : 0
                  }
                ]}
              >
                <Image source={c.icon} style={styles.categoryImg} resizeMode="cover" />
              </View>
              <Text style={[styles.categoryLabel, { color: colors.text }]}>{c.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* 1) Top Heritage News */}
        <SectionTitle title={t("explore_top_news_title")} subtitle={t("explore_top_news_subtitle")} colors={colors} />

        <SnapCarousel
          data={topNews}
          renderItem={(item) => <ExploreCard item={item} onPress={onOpenDetail} colors={colors} isDarkMode={isDarkMode} />}
        />

        <Pressable style={[styles.seeAllBtn, { borderColor: colors.primary }]} onPress={onSeeAllTop}>
          <Text style={[styles.seeAllText, { color: colors.text }]}>{t("explore_see_all")}</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.text} />
        </Pressable>

        {/* 2) Trending */}
        <SectionTitle title={t("explore_trending_title")} subtitle={t("explore_trending_subtitle")} colors={colors} />

        <SnapCarousel
          data={culturalEvents}
          renderItem={(item) => <ExploreCard item={item} onPress={onOpenDetail} colors={colors} isDarkMode={isDarkMode} />}
        />

        <Pressable style={[styles.seeAllBtn, { borderColor: colors.primary }]} onPress={onSeeAllTrending}>
          <Text style={[styles.seeAllText, { color: colors.text }]}>{t("explore_see_all")}</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.text} />
        </Pressable>

        {/* 3) Museums */}
        <SectionTitle title={t("explore_museums_title")} subtitle={t("explore_museums_subtitle")} colors={colors} />

        <SnapCarousel
          data={museums}
          renderItem={(item) => <ExploreCard item={item} onPress={onOpenDetail} colors={colors} isDarkMode={isDarkMode} />}
        />

        <Pressable style={[styles.seeAllBtn, { borderColor: colors.primary }]} onPress={onSeeAllMuseums}>
          <Text style={[styles.seeAllText, { color: colors.text }]}>{t("explore_see_all")}</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.text} />
        </Pressable>

        <View style={{ height: 28 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const SectionTitle = ({ title, subtitle, colors }) => (
  <View style={styles.sectionHead}>
    <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
    <Text style={[styles.sectionSub, { color: colors.secondaryText }]}>{subtitle}</Text>
  </View>
);

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

const ExploreCard = ({ item, onPress, colors, isDarkMode }) => (
  <Pressable
    style={[
      styles.card,
      {
        backgroundColor: colors.cardBg,
        shadowColor: colors.text,
        borderColor: isDarkMode ? colors.primary : 'transparent',
        borderWidth: isDarkMode ? 1 : 0
      }
    ]}
    onPress={() => onPress?.(item)}
  >
    <View style={styles.cardImageWrap}>
      <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
      <View style={[styles.badge, { backgroundColor: colors.background }]}>
        <Ionicons name="compass" size={14} color={colors.primary} />
        <Text style={[styles.badgeText, { color: colors.primary }]}>{item.badge}</Text>
      </View>
    </View>

    <View style={styles.cardBody}>
      <Text style={[styles.cardTitle, { color: colors.text }]} numberOfLines={2}>
        {item.title}
      </Text>

      <View style={styles.ratingRow}>
        <View style={styles.ratingPill}>
          <Ionicons name="star" size={12} color="#fff" />
          <Text style={styles.ratingText}>{item.rating}</Text>
        </View>
        <Text style={[styles.reviewsText, { color: colors.secondaryText }]}>({item.reviews})</Text>
      </View>

      <View style={styles.tagsRow}>
        {item.tags.map((t) => (
          <View key={t} style={[styles.tagPill, { backgroundColor: colors.background }]}>
            <Text style={[styles.tagText, { color: colors.text }]}>{t}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.metaRow, { borderTopColor: colors.border }]}>
        <View style={styles.metaItem}>
          <Ionicons name="location-outline" size={14} color={colors.secondaryText} />
          <Text style={[styles.metaText, { color: colors.secondaryText }]}>{item.location}</Text>
        </View>

        <View style={styles.metaItem}>
          <Ionicons name="time-outline" size={14} color={colors.secondaryText} />
          <Text style={[styles.metaText, { color: colors.secondaryText }]}>{item.time}</Text>
        </View>
      </View>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  safe: { flex: 1 },
  screen: { flex: 1 },
  content: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 24 },

  sectionKicker: { marginTop: 18, fontSize: 12, letterSpacing: 0.8, fontWeight: "600" },

  categoryRow: { paddingTop: 14, paddingBottom: 8, gap: 22, paddingRight: 8 },
  categoryItem: { width: 96, alignItems: "center" },
  categoryImgWrap: {
    width: 86,
    height: 86,
    borderRadius: 43,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: Platform.OS === "ios" ? 0.08 : 0,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 2,
  },
  categoryImg: { width: 78, height: 78, borderRadius: 39 },
  categoryLabel: { marginTop: 10, fontSize: 12, fontWeight: "500" },

  sectionHead: { marginTop: 18 },
  sectionTitle: { fontSize: 20, lineHeight: 28, fontWeight: "700" },
  sectionSub: { marginTop: 4, fontSize: 14 },

  cardsRow: { paddingTop: 14, paddingBottom: 8, paddingRight: 8 },

  card: {
    width: CARD_WIDTH,
    borderRadius: 18,
    overflow: "hidden",
    shadowOpacity: Platform.OS === "ios" ? 0.10 : 0,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
    marginRight: 4, // Add some margin for elevation to show
  },
  cardImageWrap: { height: 155, backgroundColor: "#eee" },
  cardImage: { width: "100%", height: "100%" },

  badge: {
    position: "absolute",
    left: 12,
    bottom: 12,
    borderRadius: 16,
    paddingHorizontal: 12,
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    elevation: 2,
  },
  badgeText: { fontSize: 12, fontWeight: "700" },

  cardBody: { paddingHorizontal: 14, paddingTop: 12, paddingBottom: 14 },
  cardTitle: { fontSize: 16, fontWeight: "700" },

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
  reviewsText: { fontSize: 12 },

  tagsRow: { marginTop: 10, flexDirection: "row", gap: 8 },
  tagPill: {
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 26,
    alignItems: "center",
    justifyContent: "center",
  },
  tagText: { fontSize: 12, fontWeight: "500" },

  metaRow: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  metaText: { fontSize: 12, fontWeight: "500" },

  seeAllBtn: {
    marginTop: 10,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  seeAllText: { fontSize: 14, fontWeight: "700" },
});

export default Explore;
