import React, { useMemo } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert, SafeAreaView, Pressable, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, SCREENS } from "../../services/NavigationContext";
import { useLanguage } from "../../services/LanguageContext";
import { MockDataService } from "../../data/mockData";
import { truncateText } from "../../utils/textUtils";
import { COLORS } from "../../utils/theme";

const { width, height } = Dimensions.get('window');

const ExploreSectionList = () => {
  const { params, navigate, goBack } = useNavigation();
  const { t, language } = useLanguage();

  const title = params?.title || t("explore_title");
  const subtitle = params?.subtitle || "";
  const sectionKey = params?.sectionKey;
  const items = params?.items || [];

  const displayItems = useMemo(() => {
    if (items && items.length > 0) return items;
    if (sectionKey) return MockDataService.getExploreSection(sectionKey, language);
    return [];
  }, [items, sectionKey, language]);

  const handlePress = (item) => {
    navigate(SCREENS.DETAIL, { articleId: item.id });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
        </View>
      </View>

      <FlatList
        data={displayItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <Pressable onPress={() => handlePress(item)} style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
            <View style={styles.cardBody}>
              <Text style={styles.cardTitle} numberOfLines={2}>
                {truncateText(item.title, 50)}
              </Text>
              <Text style={styles.cardMeta}>{item.subtitle || item.category}</Text>
            </View>
          </Pressable>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No items found for this section.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.background
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.04,
    paddingTop: height * 0.01,
    paddingBottom: height * 0.015,
    gap: 12,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.cardBg,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: width * 0.05,
    fontWeight: "700",
    color: COLORS.text
  },
  subtitle: {
    marginTop: 2,
    fontSize: width * 0.035,
    color: COLORS.secondaryText
  },
  listContent: {
    paddingHorizontal: width * 0.04,
    paddingBottom: 20
  },
  card: {
    backgroundColor: COLORS.cardBg,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: height * 0.02,
    elevation: 3,
    shadowColor: COLORS.text,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  cardImage: {
    width: "100%",
    height: height * 0.22,
    backgroundColor: COLORS.border
  },
  cardBody: {
    padding: width * 0.04
  },
  cardTitle: {
    fontSize: width * 0.045,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 6,
  },
  cardMeta: {
    fontSize: width * 0.035,
    color: COLORS.secondaryText
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    color: COLORS.secondaryText,
    textAlign: "center",
    fontSize: 16,
  },
});

export default ExploreSectionList;
