import React, { useMemo, useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, Image, Pressable, FlatList, Dimensions, Platform, Share } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  withSequence,
  withDelay,
} from "react-native-reanimated";
import CommentsSheet from "../../components/CommentsSheet";
import { useNavigation } from "../../services/NavigationContext";
import { MockDataService } from "../../data/mockData";
import { COLORS } from "../../utils/theme";
import { useLanguage } from "../../services/LanguageContext";
import { wp, hp, rf } from "../../utils/responsive";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function ArticleDetailScreen() {
  const { params, goBack, setIsTabBarVisible } = useNavigation();
  const { language, t } = useLanguage();
  const data = useMemo(() => MockDataService.getAllArticles(language), [language]);
  const [activeArticleIndex, setActiveArticleIndex] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    // Default to hiding the main tab bar (since we start in Engaged mode)
    setIsTabBarVisible(false);

    return () => {
      // Restore tab bar when leaving screen
      setIsTabBarVisible(true);
    };
  }, []);

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

  const renderArticle = ({ item, index }) => (
    <ArticlePage
      article={item}
      index={index}
      activeIndex={activeArticleIndex}
      setIsTabBarVisible={setIsTabBarVisible}
      t={t}
    />
  );

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / SCREEN_HEIGHT);
    setActiveArticleIndex(index);
  };

  return (
    <Animated.View style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <Pressable onPress={() => {
          setIsTabBarVisible(true);
          goBack();
        }} style={styles.backBtn} hitSlop={10}>
          <Ionicons name="chevron-back" size={24} color="#FFF" />
        </Pressable>
      </View>

      {/* Vertical swipeable articles */}
      <FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderArticle}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={SCREEN_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        initialScrollIndex={startIndex}
        onMomentumScrollEnd={handleScroll}
        getItemLayout={(_, index) => ({
          length: SCREEN_HEIGHT,
          offset: SCREEN_HEIGHT * index,
          index,
        })}
      />

    </Animated.View>
  );
}

// Individual article page component
function ArticlePage({ article, index, activeIndex, setIsTabBarVisible, t }) {
  const content = Array.isArray(article?.content) ? article.content : [];
  // Default to ENGAGED state (Likes tab visible)
  const [isEngaged, setIsEngaged] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Animated value for engagement bar - START at 1 (Visible)
  const engagementAnim = useSharedValue(1);

  // Heart Button Animation (Small one)
  const buttonScale = useSharedValue(1);

  const handleLike = () => {
    const newLiked = !liked;
    setLiked(newLiked);

    if (newLiked) {
      // Pop (scale up and down) the small heart button
      buttonScale.value = withSequence(
        withSpring(1.2, { damping: 10, stiffness: 200 }),
        withSpring(1.1, { damping: 12, stiffness: 200 })
      );
    }
  };

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  // Extract text content and limit it
  const getTextContent = () => {
    if (content.length > 0) {
      return content.map((block) =>
        block?.content?.map((seg) => seg?.text).join("") || ""
      ).join(" ");
    }
    return article?.subtitle || t("detail_fallback");
  };

  const textContent = getTextContent();

  // Handle content tap - toggle engagement mode
  const handleContentTap = () => {
    const newEngagedState = !isEngaged;
    setIsEngaged(newEngagedState);

    // Animate engagement bar
    engagementAnim.value = withSpring(newEngagedState ? 1 : 0, {
      damping: 20,
      stiffness: 100,
      mass: 0.8
    });

    // Control main bottom navigation
    setIsTabBarVisible(!newEngagedState);
  };

  // Reset engagement when article changes - FORCE to Engaged state
  useEffect(() => {
    if (index === activeIndex) {
      // When this article becomes active, ensure it's in default engagement mode
      setIsEngaged(true);
      engagementAnim.value = withSpring(1, { damping: 20, stiffness: 100 });
      setIsTabBarVisible(false); // Hide main tabs by default
    }
  }, [activeIndex, index]);

  const engagementStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(engagementAnim.value, [0, 1], [100, 0])
      }
    ],
    opacity: interpolate(engagementAnim.value, [0, 1], [0, 1]),
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    borderTopLeftRadius: interpolate(engagementAnim.value, [0, 1], [0, 24]),
    borderTopRightRadius: interpolate(engagementAnim.value, [0, 1], [0, 24]),
    marginTop: interpolate(engagementAnim.value, [0, 1], [-80, -24]), // Override when Home Tab (0)
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(engagementAnim.value, [0, 1], [0, 1]),
    transform: [{ translateY: interpolate(engagementAnim.value, [0, 1], [20, 0]) }]
  }));

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  return (
    <View style={styles.articlePage}>
      {/* Hero Image - Fixed top half */}
      <View style={styles.heroContainer}>
        <Image
          source={{ uri: article?.image }}
          style={styles.heroImage}
          resizeMode="cover"
        />

        {/* Removed Floating Heart (User Request) */}

        {/* Image Overlay - Category & Views */}
        <Animated.View style={[styles.imageOverlay, overlayStyle]}>
          <View style={styles.categoryTag}>
            <Text style={styles.categoryTagText}>{article?.category || "Heritage"}</Text>
          </View>
          <View style={styles.viewsTag}>
            <Ionicons name="eye" size={14} color="#FFF" style={{ marginRight: 4 }} />
            <Text style={styles.viewsText}>{article?.views || "22.k"}</Text>
          </View>
        </Animated.View>
      </View>

      {/* Content Card - Fixed bottom half - Tappable */}
      <AnimatedPressable onPress={handleContentTap} style={[styles.contentCard, contentAnimatedStyle]}>
        {/* Title - Fixed 2 lines */}
        <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
          {article?.title}
        </Text>

        {/* Meta Info */}
        <View style={styles.metaRow}>
          <View style={styles.publisherInfo}>
            <View style={styles.publisherDot} />
            <Text style={styles.publisherName}>{article?.publisher}</Text>
          </View>
          <Text style={styles.timestamp}>{article?.timestamp}</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Article Content - Fixed lines with ellipsis */}
        <Text style={styles.bodyText} numberOfLines={6} ellipsizeMode="tail">
          {textContent}
        </Text>

        {/* Tap hint when not engaged */}
        {!isEngaged && (
          <View style={styles.tapHint}>
            <Ionicons name="hand-left-outline" size={16} color={COLORS.secondaryText} />
            <Text style={styles.tapHintText}>Tap to interact</Text>
          </View>
        )}
      </AnimatedPressable>

      {/* Fixed Bottom Engagement Bar */}
      <Animated.View style={[styles.engagementBar, engagementStyle]} pointerEvents={isEngaged ? "auto" : "none"}>
        <Pressable
          style={styles.engageBtn}
          onPress={handleLike}
        >
          <Animated.View style={buttonAnimatedStyle}>
            <Ionicons
              name={liked ? "heart" : "heart-outline"}
              size={28}
              color={liked ? "#EB6A00" : COLORS.text}
            />
          </Animated.View>
          <Text style={[styles.engageLabel, liked && styles.engageLabelActive]}>
            {article?.likes || "2.4k"}
          </Text>
        </Pressable>

        <Pressable style={styles.engageBtn} onPress={async () => {
          try {
            await Share.share({
              message: `${article.title}\n\nCheck out this article on Heritage Pulse!\n${article.image || ''}`,
              url: article.image || '',
              title: article.title,
            });
          } catch (error) {
            console.error(error.message);
          }
        }}>
          <Ionicons name="logo-whatsapp" size={26} color={COLORS.success} />
          <Text style={styles.engageLabel}>Share</Text>
        </Pressable>

        <Pressable
          style={styles.engageBtn}
          onPress={() => setSaved(!saved)}
        >
          <Ionicons
            name={saved ? "bookmark" : "bookmark-outline"}
            size={26}
            color={saved ? COLORS.primary : COLORS.text}
          />
          <Text style={[styles.engageLabel, saved && styles.engageLabelActive]}>
            {saved ? "Saved" : "Save"}
          </Text>
        </Pressable>

      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    position: "absolute",
    top: hp(2),
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: wp(4),
    zIndex: 10,
  },
  backBtn: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(5.5),
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  shareBtn: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(5.5),
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center",
  },
  articlePage: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    backgroundColor: COLORS.background,
  },
  heroContainer: {
    width: "100%",
    height: "50%",
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#eee",
    position: 'absolute',
  },
  floatingHeart: {
    position: 'absolute',
    alignSelf: 'center',
    zIndex: 20,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 30,
    left: wp(4),
    right: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 2,
  },
  categoryTag: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  categoryTagText: {
    color: '#FFF',
    fontSize: rf(12),
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  viewsTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  viewsText: {
    color: '#FFF',
    fontSize: rf(12),
    fontWeight: '600',
  },
  contentCard: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingHorizontal: wp(5),
    paddingTop: hp(2),
    paddingBottom: hp(10),
  },
  title: {
    fontSize: rf(22),
    fontWeight: "800",
    color: COLORS.text,
    lineHeight: rf(28),
    marginBottom: hp(1.5),
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(1.5),
  },
  publisherInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: wp(2),
  },
  publisherDot: {
    width: wp(5),
    height: wp(5),
    borderRadius: wp(2.5),
    backgroundColor: COLORS.primary,
  },
  publisherName: {
    fontSize: rf(13),
    fontWeight: "600",
    color: COLORS.text,
  },
  timestamp: {
    fontSize: rf(12),
    color: COLORS.secondaryText,
  },
  divider: {
    height: 2,
    width: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 1,
    marginBottom: hp(1.5),
  },
  bodyText: {
    fontSize: rf(15),
    lineHeight: rf(24),
    color: COLORS.text,
    flex: 1,
  },
  tapHint: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: wp(2),
    paddingVertical: hp(1),
    opacity: 0.5,
    bottom: hp(2),
  },
  tapHintText: {
    fontSize: rf(12),
    color: COLORS.secondaryText,
  },
  // Fixed Bottom Engagement Bar
  engagementBar: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: COLORS.cardBg,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: hp(1.5),
    paddingBottom: Platform.OS === 'ios' ? hp(3.5) : hp(2), // Responsive bottom padding for safe area
    paddingHorizontal: wp(4),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  engageBtn: {
    alignItems: "center",
    justifyContent: "center",
    gap: hp(0.5),
    paddingVertical: hp(0.5),
    paddingHorizontal: wp(3),
    minWidth: wp(18),
  },
  engageLabel: {
    fontSize: rf(11),
    fontWeight: "600",
    color: COLORS.secondaryText,
  },
  engageLabelActive: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});
