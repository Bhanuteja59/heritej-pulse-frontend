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

export default function ExploreSectionListScreen({ route }) {
  const { goBack, navigate } = useNavigation();
  const [search, setSearch] = useState("");

  // ✅ MUST MATCH Explore.js params
  const sectionKey = route?.params?.sectionKey || "topNews";
  const title = route?.params?.title || "Top Heritage News searched";
  const subtitle = route?.params?.subtitle || "Popular Heritage News";

  // ✅ SAME DEMO DATA (later replace with API)
  const dataBySection = useMemo(() => {
    const topNews = [
      {
        id: "1",
        badge: "Heritage Places",
        image: require("../../assets/images/heritej-pulse-logo.png"),
        title: "Indian Dharma and Culture",
        rating: "4.7",
        reviews: "12.5k reviews",
        tags: ["Monument", "Photo Spot"],
        location: "Delhi",
        time: "15 mins",
      },
      {
        id: "2",
        badge: "Heritage Places",
        image: require("../../assets/images/heritej-pulse-logo.png"),
        title: "Indian History",
        rating: "4.7",
        reviews: "12.5k reviews",
        tags: ["Monument", "Photo Spot"],
        location: "Delhi",
        time: "15 mins",
      },
      {
        id: "3",
        badge: "Heritage Places",
        image: require("../../assets/images/heritej-pulse-logo.png"),
        title: "Top Rated place in India",
        rating: "4.7",
        reviews: "12.5k reviews",
        tags: ["Monument", "Photo Spot"],
        location: "Delhi",
        time: "15 mins",
      },
    ];

    const trending = [
      {
        id: "t1",
        badge: "Heritage Places",
        image: require("../../assets/images/heritej-pulse-logo.png"),
        title: "Telangana Cultural Events",
        rating: "4.7",
        reviews: "12.5k reviews",
        tags: ["Monument", "Photo Spot"],
        location: "Delhi",
        time: "15 mins",
      },
      {
        id: "t2",
        badge: "Heritage Places",
        image: require("../../assets/images/heritej-pulse-logo.png"),
        title: "Cultural Events",
        rating: "4.7",
        reviews: "12.5k reviews",
        tags: ["Monument", "Photo Spot"],
        location: "Delhi",
        time: "15 mins",
      },
      {
        id: "t3",
        badge: "Heritage Places",
        image: require("../../assets/images/heritej-pulse-logo.png"),
        title: "Way to the Cultural days",
        rating: "4.7",
        reviews: "12.5k reviews",
        tags: ["Monument", "Photo Spot"],
        location: "Delhi",
        time: "15 mins",
      },
    ];

    const museums = [
      {
        id: "m1",
        badge: "Heritage Places",
        image: require("../../assets/images/heritej-pulse-logo.png"),
        title: "Historical Museums",
        rating: "4.7",
        reviews: "12.5k reviews",
        tags: ["Monument", "Photo Spot"],
        location: "Delhi",
        time: "15 mins",
      },
      {
        id: "m2",
        badge: "Heritage Places",
        image: require("../../assets/images/heritej-pulse-logo.png"),
        title: "Museum of Indian Art",
        rating: "4.7",
        reviews: "12.5k reviews",
        tags: ["Monument", "Photo Spot"],
        location: "Delhi",
        time: "15 mins",
      },
    ];

    return { topNews, trending, museums };
  }, []);

  // ✅ IMPORTANT: keys must match EXACTLY what you pass
  const list = dataBySection[sectionKey] || [];

  // ✅ filter
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return list;
    return list.filter((x) => x.title.toLowerCase().includes(q));
  }, [search, list]);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header (same as Explore) */}
        <View style={styles.headerRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.h1}>Explore</Text>
            <Text style={styles.sub}>Discover stories by topic</Text>
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
            placeholder="Search for Heritage"
            placeholderTextColor={stylesVars.grayText}
            style={styles.searchInput}
          />
          <Ionicons name="sparkles" size={18} color={stylesVars.orange} />
        </View>

        {/* Section title */}
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionSub}>{subtitle}</Text>
        </View>

        {/* ✅ Cards should render here */}
        <View style={{ marginTop: 14 }}>
          {filtered.map((item, idx) => (
            <View key={item.id} style={{ marginBottom: idx === filtered.length - 1 ? 0 : 16 }}>
              <ExploreVerticalCard item={item} onPress={() => navigate(SCREENS.DETAIL, { articleId: item?.id, item })} />
            </View>
          ))}

          {/* ✅ Debug helper (remove later) */}
          {filtered.length === 0 && (
            <Text style={{ marginTop: 20, color: stylesVars.grayText }}>
              No items for sectionKey: {sectionKey}
            </Text>
          )}
        </View>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function ExploreVerticalCard({ item, onPress }) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.cardImageWrap}>
        <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
        <View style={styles.badge}>
          <Ionicons name="compass" size={14} color={stylesVars.orange} />
          <Text style={styles.badgeText}>{item.badge}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{item.title}</Text>

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

  card: {
    borderRadius: 18,
    backgroundColor: stylesVars.white,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: Platform.OS === "ios" ? 0.10 : 0,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  cardImageWrap: { height: 180, backgroundColor: "#eee" },
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
  ratingPill: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#1FA84A", borderRadius: 12, paddingHorizontal: 10, height: 24 },
  ratingText: { color: "#fff", fontSize: 12, fontWeight: "700" },
  reviewsText: { fontSize: 12, color: stylesVars.grayText },

  tagsRow: { marginTop: 10, flexDirection: "row", gap: 8 },
  tagPill: { backgroundColor: "#F2F2F2", borderRadius: 14, paddingHorizontal: 12, height: 26, alignItems: "center", justifyContent: "center" },
  tagText: { fontSize: 12, color: stylesVars.darkText, fontWeight: "500" },

  metaRow: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#EFEFEF", flexDirection: "row", justifyContent: "space-between" },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  metaText: { fontSize: 12, color: stylesVars.grayText, fontWeight: "500" },
});
