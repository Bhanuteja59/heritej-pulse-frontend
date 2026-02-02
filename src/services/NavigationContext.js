import React, { createContext, useState, useContext } from 'react';

/**
 * Navigation Context
 * 
 * A simple, lightweight router replacement.
 * Manages which screen is currently visible and handles history or parameters.
 */

const NavigationContext = createContext();

export const SCREENS = {
    SPLASH: 'SPLASH',
    HOME: 'HOME',
    EXPLORE: 'EXPLORE',
    SAVED: 'SAVED',
    PROFILE: 'PROFILE',
    DETAIL: 'DETAIL',
};

export const NavigationProvider = ({ children }) => {
    const [currentScreen, setCurrentScreen] = useState(SCREENS.SPLASH);
    const [params, setParams] = useState({}); // To pass data like articleId
    const [isTabBarVisible, setIsTabBarVisible] = useState(true); // Global tab bar visibility

    const navigate = (screenName, newParams = {}) => {
        setParams(newParams);
        setCurrentScreen(screenName);
        // Reset tab bar visibility on navigation (optional, but safer)
        setIsTabBarVisible(true);
    };

    const goBack = () => {
        // Simple back logic: if in Detail, go back to Home (or previous). 
        // For a complex app, we'd use a stack, but for this constraint we keep it simple.
        if (currentScreen === SCREENS.DETAIL) {
            setCurrentScreen(SCREENS.HOME); // Default back to Home
            setIsTabBarVisible(true);
        }
    };

    return (
        <NavigationContext.Provider value={{ currentScreen, params, navigate, goBack, isTabBarVisible, setIsTabBarVisible }}>
            {children}
        </NavigationContext.Provider>
    );
};

export const useNavigation = () => useContext(NavigationContext);
