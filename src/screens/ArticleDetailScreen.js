import React, { useMemo, useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Image, Pressable, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import { useNavigation } from "../services/NavigationContext";
import { MockDataService } from "../data/mockData";
import { COLORS } from "../utils/theme";
import ShareBottomSheet from "../components/ShareBottomSheet";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const HERO_H = SCREEN_HEIGHT * 0.46;

// ✅ stack feel
const STACK_OVERLAP = 64;
const STACK_SCALE = 0.85;
const STACK_ROTATE = 12;
const STACK_TRANSLATE = 120;

// ✅ expand feel
const RADIUS_COLLAPSED = 0;
const RADIUS_EXPANDED = 28;

export default function ArticleDetailScreen() {
  const { params, goBack, setIsTabBarVisible } = useNavigation();

  const data = useMemo(() => MockDataService.getAllArticles(), []);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const scrollY = useSharedValue(0);

  // ✅ which page is expanded (-1 none)
  const expandedIndex = useSharedValue(-1);


  const startIndex = useMemo(() => {
    if (params?.articleId) {
      const idx = data.findIndex((a) => a.id === params.articleId);
      return idx >= 0 ? idx : 0;
    }
    if (params?.item?.id) {
      const idx = data.findIndex((a) => a.id === params.item.id);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  }, [params, data]);

  const openShare = useCallback(() => setIsShareOpen(true), []);
  const closeShare = useCallback(() => setIsShareOpen(false), []);


  const toggleExpandedFor = useCallback(
    (index) => {
      const next = expandedIndex.value === index ? -1 : index;
      expandedIndex.value = next;

      // ✅ hide tabbar when expanded
      setIsTabBarVisible(next === -1);
    },
    [expandedIndex, setIsTabBarVisible]
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
    },
    onMomentumEnd: (e) => {
      const idx = Math.round(e.contentOffset.y / SCREEN_HEIGHT);
      // ✅ when swiping page, always collapse
      expandedIndex.value = -1;
      runOnJS(setIsTabBarVisible)(true);
    },
  });

  return (
    <View style={styles.container}>
      {/* back */}
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            expandedIndex.value = -1;
            setIsTabBarVisible(true);
            goBack();
          }}
          hitSlop={10}
          style={styles.backBtn}
        >
          <Ionicons name="chevron-back" size={22} color={COLORS.text} />
        </Pressable>
      </View>

      <Animated.FlatList
        data={data}
        keyExtractor={(it) => it.id}
        renderItem={({ item, index }) => (
          <ArticleCardPage
            item={item}
            index={index}
            scrollY={scrollY}
            expandedIndex={expandedIndex}
            onToggleExpand={toggleExpandedFor}
            onOpenShare={openShare}
            total={data.length}
          />
        )}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        removeClippedSubviews={false}
        decelerationRate="fast"
        snapToAlignment="start"
        initialScrollIndex={startIndex}
        getItemLayout={(_, i) => ({
          length: SCREEN_HEIGHT,
          offset: SCREEN_HEIGHT * i,
          index: i,
        })}
        // helps overlap feel
        contentContainerStyle={{ paddingVertical: STACK_OVERLAP }}
      />

      <ShareBottomSheet visible={isShareOpen} onClose={closeShare} />
    </View>
  );
}

function ArticleCardPage({ item, index, scrollY, expandedIndex, onToggleExpand, onOpenShare, total }) {
  const imageSource = typeof item?.image === "string" ? { uri: item.image } : item?.image;
  const content = Array.isArray(item?.content) ? item.content : [];

  // ✅ stack transition (always)
  const pageStyle = useAnimatedStyle(() => {
    const center = index * SCREEN_HEIGHT;
    const t = (scrollY.value - center) / SCREEN_HEIGHT; // -1..0..1

    const scale = interpolate(t, [-1, 0, 1], [STACK_SCALE, 1, STACK_SCALE], Extrapolate.CLAMP);
    const opacity = interpolate(t, [-1, 0, 1], [0.4, 1, 0.4], Extrapolate.CLAMP);
    const translateY = interpolate(t, [-1, 0, 1], [STACK_TRANSLATE, 0, -STACK_TRANSLATE], Extrapolate.CLAMP);
    const rotateX = interpolate(t, [-1, 0, 1], [-STACK_ROTATE, 0, STACK_ROTATE], Extrapolate.CLAMP);
    const elevation = interpolate(t, [-1, 0, 1], [4, 14, 4], Extrapolate.CLAMP);
    const shadowOpacity = interpolate(t, [-1, 0, 1], [0.08, 0.22, 0.08], Extrapolate.CLAMP);

    return {
      opacity,
      shadowOpacity,
      elevation,
      transform: [{ perspective: 1000 }, { translateY }, { rotateX: `${rotateX}deg` }, { scale }],
    };
  });

  const heroStyle = useAnimatedStyle(() => {
    const center = index * SCREEN_HEIGHT;
    const t = (scrollY.value - center) / SCREEN_HEIGHT;
    const translateY = interpolate(t, [-1, 0, 1], [-SCREEN_HEIGHT * 0.05, 0, SCREEN_HEIGHT * 0.05], Extrapolate.CLAMP);
    const scale = interpolate(t, [-1, 0, 1], [1.05, 1, 0.97], Extrapolate.CLAMP);
    return {
      transform: [{ translateY }, { scale }],
    };
  });

  const sheetDepthStyle = useAnimatedStyle(() => {
    const center = index * SCREEN_HEIGHT;
    const t = (scrollY.value - center) / SCREEN_HEIGHT;
    const translateY = interpolate(t, [-1, 0, 1], [24, 0, -18], Extrapolate.CLAMP);
    return {
      transform: [{ translateY }],
    };
  });

  // ✅ per-card expand progress (IMPORTANT: animate inside style, not derived)
  const expandStyle = useAnimatedStyle(() => {
    const isExpanded = expandedIndex.value === index ? 1 : 0;

    const radius = withTiming(
      interpolate(isExpanded, [0, 1], [RADIUS_COLLAPSED, RADIUS_EXPANDED]),
      { duration: 260 }
    );

    const lift = withTiming(interpolate(isExpanded, [0, 1], [0, -18]), { duration: 260 });

    return {
      transform: [{ translateY: lift }],
      borderTopLeftRadius: radius,
      borderTopRightRadius: radius,
    };
  });

  // ✅ pills
  const trendingPillStyle = useAnimatedStyle(() => {
    const isExpanded = expandedIndex.value === index ? 1 : 0;
    const opacity = withTiming(interpolate(isExpanded, [0, 1], [1, 0]), { duration: 220 });
    const translateY = withTiming(interpolate(isExpanded, [0, 1], [0, -6]), { duration: 220 });
    return { opacity, transform: [{ translateY }] };
  });

  const viewsPillStyle = useAnimatedStyle(() => {
    const isExpanded = expandedIndex.value === index ? 1 : 0;
    const opacity = withTiming(interpolate(isExpanded, [0, 1], [1, 0]), { duration: 220 });
    const translateY = withTiming(interpolate(isExpanded, [0, 1], [0, -6]), { duration: 220 });
    return { opacity, transform: [{ translateY }] };
  });

  const pifPillStyle = useAnimatedStyle(() => {
    const isExpanded = expandedIndex.value === index ? 1 : 0;
    const opacity = withTiming(interpolate(isExpanded, [0, 1], [0, 1]), { duration: 220 });
    const translateY = withTiming(interpolate(isExpanded, [0, 1], [6, 0]), { duration: 220 });
    return { opacity, transform: [{ translateY }] };
  });

  // ✅ social bar
  const socialBarStyle = useAnimatedStyle(() => {
    const isExpanded = expandedIndex.value === index ? 1 : 0;
    const opacity = withTiming(interpolate(isExpanded, [0, 1], [0, 1]), { duration: 220 });
    const translateY = withTiming(interpolate(isExpanded, [0, 1], [20, 0]), { duration: 220 });
    return { opacity, transform: [{ translateY }] };
  });

  const onTap = () => {
    onToggleExpand(index);
  };

  return (
    <View style={styles.pageSlot}>
      <Animated.View
        style={[
          styles.cardPage,
          pageStyle,
          {
            marginVertical: -STACK_OVERLAP / 2,
            zIndex: total - index,
          },
        ]}
      >
        {/* ✅ Only hero + sheet toggles (social bar is OUTSIDE pressable so it won’t get blocked) */}
        <Pressable onPress={onTap} style={{ flex: 1 }}>
          {/* HERO */}
          <Animated.View style={heroStyle}>
            {imageSource ? (
              <Image source={imageSource} style={styles.hero} resizeMode="cover" />
            ) : (
              <View style={styles.heroPlaceholder} />
            )}
          </Animated.View>

          {/* Collapsed pills */}
          <Animated.View style={[styles.trendingPill, trendingPillStyle]}>
            <Ionicons name="flame" size={14} color="#FF7A00" />
            <Text style={styles.pillText}>Trending</Text>
          </Animated.View>

          <Animated.View style={[styles.viewsPill, viewsPillStyle]}>
            <Ionicons name="eye-outline" size={14} color="#FF7A00" />
            <Text style={styles.pillText}>{item?.views || "2.2k"}</Text>
          </Animated.View>

          {/* Expanded pill */}
          <Animated.View style={[styles.pifPill, pifPillStyle]}>
            <View style={styles.pifDot} />
            <Text style={styles.pifText}>{item?.publisher || "PIF News"}</Text>
          </Animated.View>

          {/* SHEET */}
          <Animated.View style={[styles.sheet, expandStyle, sheetDepthStyle]}>
            <Text style={styles.title}>{item?.title || "Heritage Story"}</Text>
            <View style={styles.rule} />

            <Text style={styles.bodyText}>
              {content.length > 0 ? (
                content.map((block, idx) => (
                  <Text key={idx}>
                    {block?.content?.map((seg, sIdx) => (
                      <Text key={sIdx} style={seg?.highlight ? styles.linkText : undefined}>
                        {seg?.text}
                      </Text>
                    ))}
                  </Text>
                ))
              ) : (
                <Text>
                  This story explores India’s cultural legacy, its traditions, and the people who keep them alive across
                  generations.
                </Text>
              )}
            </Text>

            <Text style={styles.timeText}>{item?.timestamp || "Just now"}</Text>
          </Animated.View>
        </Pressable>

        {/* Social bar overlay (expanded only) */}
        <Animated.View style={[styles.socialBar, socialBarStyle]} pointerEvents="box-none">
          <SocialBtn icon="heart-outline" label={item?.likes || "0"} onPress={() => {}} />
          <SocialBtn icon="bookmark-outline" label="Save" onPress={() => {}} />
          <SocialBtn icon="share-social-outline" label="Share" onPress={onOpenShare} />
          <SocialBtn icon="chatbubble-ellipses-outline" label={item?.comments || "0"} onPress={() => {}} />
        </Animated.View>
      </Animated.View>
    </View>
  );
}

function SocialBtn({ icon, label, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.socialBtn}>
      <Ionicons name={icon} size={18} color={COLORS.secondaryText} />
      <Text style={styles.socialText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  header: { position: "absolute", top: 12, left: 12, zIndex: 50 },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },

  cardPage: { flex: 1, backgroundColor: COLORS.background },
  pageSlot: {
    height: SCREEN_HEIGHT,
    overflow: "visible",
  },

  hero: { width: "100%", height: HERO_H },
  heroPlaceholder: { width: "100%", height: HERO_H, backgroundColor: "#eee" },

  // pills
  trendingPill: {
    position: "absolute",
    left: 16,
    top: HERO_H - 80,
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingHorizontal: 12,
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    elevation: 2,
  },
  viewsPill: {
    position: "absolute",
    right: 16,
    top: HERO_H - 80,
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingHorizontal: 12,
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    elevation: 2,
  },
  pillText: { fontSize: 12, fontWeight: "700", color: COLORS.text },

  pifPill: {
    position: "absolute",
    right: 16,
    top: HERO_H - 80,
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingHorizontal: 12,
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    elevation: 2,
  },
  pifDot: { width: 18, height: 18, borderRadius: 9, backgroundColor: "#000" },
  pifText: { fontSize: 12, fontWeight: "700", color: COLORS.text },

  // sheet
  sheet: {
    flex: 1,
    marginTop: -24,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
    elevation: 6,
  },

  title: { fontSize: 22, fontWeight: "700", color: COLORS.text },
  rule: { height: 2, backgroundColor: "#F5A347", marginTop: 10, marginBottom: 12, width: 48 },
  bodyText: { fontSize: 14, lineHeight: 21, color: "#6B6B6B" },
  linkText: { color: "#2A6DF5" },
  timeText: { marginTop: 12, fontSize: 12, color: COLORS.secondaryText, alignSelf: "flex-end" },

  // social bar overlay
  socialBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 6,
    paddingHorizontal: 26,
    paddingVertical: 10,
    backgroundColor: "#FAF7F2",
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 40,
  },
  socialBtn: { alignItems: "center", gap: 6 },
  socialText: { fontSize: 12, color: COLORS.secondaryText },
});
