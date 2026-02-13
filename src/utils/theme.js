/**
 * Heritage Pulse Design System
 * 
 * Defines the core color palette, spacing, and typography constants
 * to ensure consistency across the application.
 */

import { SCREENS } from "../services/NavigationContext";

export const PALETTE = {
    background: '#F9F7F2', // Warm Parchment
    primary: '#EB6A00',    // Heritage Orange
    secondary: '#FF8D28',  // Lighter Orange for gradients
    text: '#1A1A1A',       // Dark Charcoal
    secondaryText: '#000000ff',
    cardAnimation: '#FFFFFF',
    border: '#E0E0E0',
    success: '#4CAF50',
    error: '#F44336',
    white: '#FFFFFF',
    black: '#000000',
    gold: '#FFD700',
    splashGradientStart: '#FFD166',
    splashGradientEnd: '#FFF9FB',
    loading: '#ffffffff',
    screen: "#FAF7F2",

    // Dark specifics
    darkBackground: '#121212',
    darkSurface: '#1E1E1E',
    darkText: '#E0E0E0',
    darkSecondaryText: '#A0A0A0',
    darkBorder: '#333333',
};

export const LIGHT_THEME = {
    background: PALETTE.background,
    primary: PALETTE.primary,
    secondary: PALETTE.secondary,
    text: PALETTE.text,
    secondaryText: PALETTE.secondaryText,
    cardBg: PALETTE.white,
    border: PALETTE.border,
    icon: PALETTE.text,
    error: PALETTE.error,
    white: PALETTE.white,
    black: PALETTE.black,
    splashGradientStart: PALETTE.splashGradientStart,
    splashGradientEnd: PALETTE.splashGradientEnd,
    success: PALETTE.success,
};

export const DARK_THEME = {
    background: PALETTE.darkBackground,
    primary: PALETTE.primary, // Orange pops on dark too
    secondary: PALETTE.secondary,
    text: PALETTE.darkText,
    secondaryText: PALETTE.darkSecondaryText,
    cardBg: PALETTE.darkSurface,
    border: PALETTE.darkBorder,
    icon: PALETTE.darkText,
    error: PALETTE.error,
    white: PALETTE.darkText, // In dark mode, "white" elements might need to be off-white or mapped to text
    black: '#000000',
    splashGradientStart: PALETTE.splashGradientStart, // Keep Splash same
    splashGradientEnd: PALETTE.splashGradientEnd,
    success: PALETTE.success,   // Keep Splash same
};

// Default export for backward compatibility if needed, but we should move to Context
export const COLORS = LIGHT_THEME;

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
    borderRadiusLarge: 16,
    borderRadiusPill: 30,
};
