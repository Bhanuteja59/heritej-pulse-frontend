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
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, SCREENS } from "../services/NavigationContext";
import { MockDataService } from "../data/mockData";
import Header from "../components/Header";

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
  const { navigate } = useNavigation();

  // --- DATA (replace later with API) ---
  const categories = useMemo(
    () => [
      { id: "heritage-1", label: "Heritage", icon: require("../../assets/images/heritej-pulse-logo.png") },
      { id: "dance-1", label: "Dance", icon: require("../../assets/images/heritej-pulse-logo.png") },
      { id: "history-1", label: "History", icon: require("../../assets/images/heritej-pulse-logo.png") },
      { id: "heritage-2", label: "Heritage", icon: require("../../assets/images/heritej-pulse-logo.png") },
      { id: "dance-2", label: "Dance", icon: require("../../assets/images/heritej-pulse-logo.png") },
      { id: "history-2", label: "History", icon: require("../../assets/images/heritej-pulse-logo.png") },
    ],
    []
  );

  const topNews = useMemo(() => MockDataService.getExploreSection("topNews"), []);
  const culturalEvents = useMemo(() => MockDataService.getExploreSection("culturalEvents"), []);
  const museums = useMemo(() => MockDataService.getExploreSection("museums"), []);

  const onOpenDetail = (item) => {
    navigate(SCREENS.DETAIL, { articleId: item?.id });
  };

  // ✅ SEE ALL handlers (open reusable list screen)
  const onSeeAllTop = () => {
    navigate(SCREENS.EXPLORE_SECTION_GRID, {
      sectionKey: "topNews",
      title: "Top Heritage News searched",
      subtitle: "Popular Heritage News",
      items: topNews, // ✅ PASS DATA
    });
  };

  const onSeeAllTrending = () => {
    navigate(SCREENS.EXPLORE_SECTION_GRID, {
      sectionKey: "culturalEvents",
      title: "Trending Cultural Events",
      subtitle: "Don't miss these happening now",
      items: culturalEvents, // ✅ PASS DATA
    });
  };

  const onSeeAllMuseums = () => {
    navigate(SCREENS.EXPLORE_SECTION_GRID, {
      sectionKey: "museums",
      title: "Museums & Art Galleries",
      subtitle: "Explore art, history and culture",
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <Header />
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Browse by category */}
        <Text style={styles.sectionKicker}>BROWSE BY CATEGORY</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
          {categories.map((c) => (
            <Pressable key={c.id} style={styles.categoryItem}>
              <View style={styles.categoryImgWrap}>
                <Image source={c.icon} style={styles.categoryImg} resizeMode="cover" />
              </View>
              <Text style={styles.categoryLabel}>{c.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* 1) Top Heritage News */}
        <SectionTitle title="Top Heritage News searched" subtitle="Popular Heritage News" />

        <SnapCarousel
          data={topNews}
          renderItem={(item) => <ExploreCard item={item} onPress={onOpenDetail} />}
        />

        <Pressable style={styles.seeAllBtn} onPress={onSeeAllTop}>
          <Text style={styles.seeAllText}>See All</Text>
          <Ionicons name="chevron-forward" size={16} color={stylesVars.darkText} />
        </Pressable>

        {/* 2) Trending */}
        <SectionTitle title="Trending Cultural Events" subtitle="Don't miss these happening now" />

        <SnapCarousel
          data={culturalEvents}
          renderItem={(item) => <ExploreCard item={item} onPress={onOpenDetail} />}
        />

        <Pressable style={styles.seeAllBtn} onPress={onSeeAllTrending}>
          <Text style={styles.seeAllText}>See All</Text>
          <Ionicons name="chevron-forward" size={16} color={stylesVars.darkText} />
        </Pressable>

        {/* 3) Museums */}
        <SectionTitle title="Museums & Art Galleries" subtitle="Explore art, history and culture" />

        <SnapCarousel
          data={museums}
          renderItem={(item) => <ExploreCard item={item} onPress={onOpenDetail} />}
        />

        <Pressable style={styles.seeAllBtn} onPress={onSeeAllMuseums}>
          <Text style={styles.seeAllText}>See All</Text>
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
