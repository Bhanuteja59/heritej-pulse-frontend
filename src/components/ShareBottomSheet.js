import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable, Animated, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../utils/theme";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");
const SHEET_HEIGHT = Math.round(SCREEN_HEIGHT * 0.36);

const ShareBottomSheet = ({ visible, onClose }) => {
  const translateY = useRef(new Animated.Value(SHEET_HEIGHT)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(overlayOpacity, { toValue: 1, duration: 160, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 220, useNativeDriver: true }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(overlayOpacity, { toValue: 0, duration: 160, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: SHEET_HEIGHT, duration: 200, useNativeDriver: true }),
      ]).start();
    }
  }, [visible, overlayOpacity, translateY]);

  if (!visible) return null;

  return (
    <View style={styles.root} pointerEvents="box-none">
      <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]}>
        <Pressable style={styles.overlayPress} onPress={onClose} />
      </Animated.View>

      <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
        <View style={styles.handle} />
        <Text style={styles.title}>Share this story</Text>

        <View style={styles.actions}>
          <Pressable style={styles.actionBtn} onPress={onClose}>
            <Ionicons name="share-social-outline" size={22} color={COLORS.text} />
            <Text style={styles.actionText}>Share</Text>
          </Pressable>
          <Pressable style={styles.actionBtn} onPress={onClose}>
            <Ionicons name="copy-outline" size={22} color={COLORS.text} />
            <Text style={styles.actionText}>Copy link</Text>
          </Pressable>
          <Pressable style={styles.actionBtn} onPress={onClose}>
            <Ionicons name="bookmark-outline" size={22} color={COLORS.text} />
            <Text style={styles.actionText}>Save</Text>
          </Pressable>
        </View>

        <Pressable style={styles.closeBtn} onPress={onClose}>
          <Text style={styles.closeText}>Close</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  overlayPress: {
    flex: 1,
  },
  sheet: {
    height: SHEET_HEIGHT,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -6 },
    elevation: 8,
  },
  handle: {
    alignSelf: "center",
    width: 44,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E5E5E5",
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 14,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  actionBtn: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#F7F7F7",
    marginHorizontal: 6,
  },
  actionText: {
    marginTop: 6,
    fontSize: 12,
    color: COLORS.text,
    fontWeight: "600",
  },
  closeBtn: {
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 16,
    backgroundColor: "#EFEFEF",
  },
  closeText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.text,
  },
});

export default ShareBottomSheet;
