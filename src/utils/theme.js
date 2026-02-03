/**
 * Heritage Pulse Design System
 * 
 * Defines the core color palette, spacing, and typography constants
 * to ensure consistency across the application.
 */

import { SCREENS } from "../services/NavigationContext";

export const COLORS = {
    background: '#F9F7F2', // Warm Parchment / Soft Beige
    primary: '#EB6A00',    // Heritage Orange
    text: '#1A1A1A',       // Dark Charcoal
    secondaryText: '#000000ff', // Calm Gray
    cardAnimation: '#FFFFFF', // White for cards
    border: '#E0E0E0',
    success: '#4CAF50',
    error: '#F44336',
    white: '#FFFFFF',
    black: '#000000',
    gold: '#FFD700',       // For special icons
    splashGradientStart: '#FFD166', // Warm yellow
    splashGradientEnd: '#FFF9FB',   // Soft parchment
    loading: '#ffffffff',
    screen: "#FAF7F2"
};

export const SPACING = {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
};

export const SIZES = {
    iconSmall: 16,
    iconMedium: 24,
    iconLarge: 32,
    borderRadius: 12,
};
