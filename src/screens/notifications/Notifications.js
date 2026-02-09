import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../utils/theme";
import { useNavigation, SCREENS } from "../../services/NavigationContext";
import { useLanguage } from "../../services/LanguageContext";

const Notifications = () => {
    const { navigate } = useNavigation();
    const [dismissedIds, setDismissedIds] = useState(new Set());
    const { t } = useLanguage();

    const notifications = useMemo(
        () => [
            {
                id: "n1",
                title: t("notifications_item1_title"),
                location: t("notifications_location_india"),
                source: t("notifications_source_pif"),
                timeAgo: t("notifications_time_14m"),
                image: "https://images.unsplash.com/photo-1512412046876-f386342eddb3?q=80&w=600&auto=format&fit=crop",
            },
            {
                id: "n2",
                title: t("notifications_item2_title"),
                location: t("notifications_location_india"),
                source: t("notifications_source_pif"),
                timeAgo: t("notifications_time_14m"),
                image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=600&auto=format&fit=crop",
            },
        ],
        [t]
    );

    const visibleNotifications = notifications.filter((n) => !dismissedIds.has(n.id));

    const onDismiss = (id) => {
        setDismissedIds((prev) => new Set([...prev, id]));
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={styles.headerIcon}>
                        <Ionicons name="notifications-outline" size={22} color={COLORS.white} />
                    </View>
                    <View>
                    <Text style={styles.title}>{t("notifications_title")}</Text>
                    <Text style={styles.subTitle}>
                            {t("notifications_updates_count", { count: visibleNotifications.length })}
                    </Text>
                    </View>
                </View>

                {visibleNotifications.map((item) => (
                    <View key={item.id} style={styles.card}>
                        <View style={styles.cardTop}>
                            <Image source={{ uri: item.image }} style={styles.cardImage} />

                            <View style={styles.cardInfo}>
                                <View style={styles.locationRow}>
                                    <Ionicons name="location-outline" size={14} color={COLORS.primary} />
                                    <Text style={styles.locationText}>{item.location}</Text>
                                </View>
                                <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
                                <View style={styles.metaRow}>
                                    <Text style={styles.metaText}>{item.source}</Text>
                                    <Text style={styles.metaDot}>•</Text>
                                    <Text style={styles.metaText}>{item.timeAgo}</Text>
                                </View>
                            </View>

                            <View style={styles.cardActionsRight}>
                                <Pressable style={styles.bookmarkBtn}>
                                    <Ionicons name="bookmark-outline" size={20} color={COLORS.text} />
                                </Pressable>
                                <Pressable style={styles.dismissBtn} onPress={() => onDismiss(item.id)}>
                                    <Ionicons name="close" size={18} color={COLORS.text} />
                                </Pressable>
                            </View>
                        </View>

                        <View style={styles.cardFooter}>
                            <Pressable style={styles.footerAction}>
                                <Ionicons name="heart-outline" size={18} color={COLORS.text} />
                                <Text style={styles.footerText}>{t("notifications_like")}</Text>
                            </Pressable>
                            <Pressable style={styles.footerAction}>
                                <Ionicons name="share-social-outline" size={18} color={COLORS.text} />
                                <Text style={styles.footerText}>{t("notifications_share")}</Text>
                            </Pressable>
                            <Pressable
                                style={styles.readMoreBtn}
                                onPress={() => navigate(SCREENS.DETAIL, { articleId: item.id })}
                            >
                                <Text style={styles.readMoreText}>{t("notifications_read_more")}</Text>
                            </Pressable>
                        </View>
                    </View>
                ))}

                {visibleNotifications.length === 0 && (
                    <View style={styles.emptyState}>
                        <Ionicons name="notifications-off-outline" size={28} color={COLORS.primary} />
                        <Text style={styles.emptyText}>{t("notifications_empty")}</Text>
                    </View>
                )}
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
        paddingTop: 14,
        paddingBottom: 24,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginBottom: 16,
    },
    headerIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        color: COLORS.text,
    },
    subTitle: {
        marginTop: 2,
        fontSize: 12,
        color: "#6B6B6B",
        fontWeight: "500",
    },

    card: {
        backgroundColor: COLORS.white,
        borderRadius: 16,
        padding: 12,
        marginBottom: 16,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
        elevation: 2,
    },
    cardTop: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 12,
    },
    cardImage: {
        width: 78,
        height: 78,
        borderRadius: 12,
        backgroundColor: "#eee",
    },
    cardInfo: {
        flex: 1,
    },
    locationRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    locationText: {
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: "600",
    },
    cardTitle: {
        marginTop: 4,
        fontSize: 14,
        fontWeight: "700",
        color: COLORS.text,
    },
    metaRow: {
        marginTop: 6,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    metaText: {
        fontSize: 12,
        color: "#6B6B6B",
    },
    metaDot: {
        fontSize: 12,
        color: "#C2C2C2",
    },
    cardActionsRight: {
        alignItems: "center",
        gap: 10,
    },
    bookmarkBtn: {
        width: 32,
        height: 32,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F6F2EA",
    },
    dismissBtn: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F6F2EA",
    },
    cardFooter: {
        marginTop: 12,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: "#EFEAE1",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    footerAction: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    footerText: {
        fontSize: 12,
        color: COLORS.text,
    },
    readMoreBtn: {
        height: 32,
        paddingHorizontal: 16,
        borderRadius: 16,
        backgroundColor: COLORS.primary,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    },
    readMoreText: {
        fontSize: 12,
        fontWeight: "700",
        color: COLORS.white,
    },
    emptyState: {
        alignItems: "center",
        marginTop: 24,
        gap: 8,
    },
    emptyText: {
        fontSize: 14,
        color: "#6B6B6B",
    },
});

export default Notifications;
