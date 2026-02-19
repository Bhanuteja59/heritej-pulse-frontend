/**
 * Heritage Pulse Design System
 * 
 * Defines the core color palette, spacing, and typography constants
 * to ensure consistency across the application.
 */

export const PALETTE = {
    background: '#F5F3EF', // Ivory Beige (Heritage Off-White)
    primary: '#1F6F5E',    // Heritage Green (Deep & Traditional)
    secondary: '#207567',  // Sustained Green accent
    text: '#1C2B2A',       // Dark Green-Slate (Primary Text)
    secondaryText: '#6D7A76', // Muted Grey-Green
    border: '#E0E0E0',
    searchFill: '#ECECEC', // Soft Neutral Grey
    success: '#4CAF50',
    error: '#E53935',      // Alert Red
    white: '#FFFFFF',
    black: '#000000',
    splashGradientStart: '#FFD166',
    splashGradientEnd: '#FFF9FB',

    // Dark specifics (Pure Emerald & White)
    darkBackground: '#004637ff',
    darkSurface: '#004637ff',    // Raised Emerald for cards
    darkText: '#FFFFFF',       // Pure White
    darkSecondaryText: '#B2C2B5', // Silver-Mint
    darkBorder: '#3D8246',     // Emerald Boundary
};

export const LIGHT_THEME = {
    background: PALETTE.background,
    primary: PALETTE.primary,
    secondary: PALETTE.secondary,
    text: PALETTE.primary,
    secondaryText: PALETTE.secondaryText,
    cardBg: PALETTE.white,
    border: PALETTE.border,
    shadow: '#000000',
    searchFill: PALETTE.searchFill,
    icon: PALETTE.text,
    error: PALETTE.error,
    white: PALETTE.white,
    black: PALETTE.black,
    splashGradientStart: PALETTE.splashGradientStart,
    splashGradientEnd: PALETTE.splashGradientEnd,
    success: PALETTE.success,
};

// Dark Theme - Premium "Glass Navy" Aesthetic
export const DARK_THEME = {
    background: '#0a1119',      // Deep Navy Background
    primary: '#037e76ff',         // Solid Teal/Green Accent
    secondary: '#73b6b9',       // Light Teal Accent
    text: '#FFFFFF',            // Pure White Content
    secondaryText: '#B0BEC5',   // Muted Blue-Grey
    cardBg: '#0d181e', // Glassy Dark Slate ("inside box")
    border: 'rgba(255, 255, 255, 0.12)', // Ultra-thin translucent glass highlight
    shadow: '#ffffff',
    icon: '#73b6b9',            // Light Green Icons
    error: PALETTE.error,
    white: PALETTE.white,
    black: PALETTE.black,
    splashGradientStart: '#0a1119',
    splashGradientEnd: '#0d181e',
    success: '#1a968e',
};

// Default export for backward compatibility
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