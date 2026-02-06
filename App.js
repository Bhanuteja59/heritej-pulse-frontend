import React, { useEffect, useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Platform, StatusBar as RNStatusBar, Animated, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationProvider, useNavigation, SCREENS } from './src/services/NavigationContext';
import { LanguageProvider } from './src/services/LanguageContext';
import { COLORS } from './src/utils/theme';

// Screens
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import ExploreScreen from './src/screens/Explore';
import SavedScreen from './src/screens/SavedScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ArticleDetailScreen from './src/screens/ArticleDetailScreen';
import Register from './src/screens/Register';
import ForgotPassword from './src/screens/ForgotPassword';
import BottomNavigation from './src/components/BottomNavigation';
import ExploreSectionList from './src/screens/Explore-heritage-news';
import ExploreSectionGrid from './src/screens/ExploreSectionGrid';
import Notifications from './src/screens/notifications/Notifications';
import PrivacyScreen from './src/screens/PrivacyScreen';
import LanguageScreen from './src/screens/LanguageScreen';

import Login from './src/screens/Login';
import Signup from './src/screens/Signup';

const { width } = Dimensions.get('window');

const ScreenRenderer = () => {
  const { currentScreen } = useNavigation();
  const slideAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity/translation
  const [prevScreen, setPrevScreen] = useState(SCREENS.SPLASH);

  useEffect(() => {
    // Determine direction
    let startValue = width; // Default slide from right

    // Logic: Signup is "after" Login, so:
    // Login -> Signup: Slide from Right (New screen enters from right)
    // Signup -> Login: Slide from Left (New screen enters from left)

    if (prevScreen === SCREENS.LOGIN && currentScreen === SCREENS.SIGNUP) {
      startValue = width;
    } else if (prevScreen === SCREENS.SIGNUP && currentScreen === SCREENS.LOGIN) {
      startValue = -width;
    } else if (prevScreen === SCREENS.REGISTER && (currentScreen === SCREENS.LOGIN || currentScreen === SCREENS.SIGNUP)) {
      startValue = width;
    } else if (currentScreen === SCREENS.DETAIL) {
      // Moving to Detail: Slide in from Right
      startValue = width;
    } else if (prevScreen === SCREENS.DETAIL) {
      // Moving back from Detail: Slide in from Left
      startValue = -width;
    } else {
      // For other screens, maybe just a fade or no slide? 
      // Let's stick to a simple fade/slide for everything for consistency, or reset.
      // Minimal movement for others to avoid dizziness
      startValue = 0; // Changed to 0 to avoid jitter on tabs
    }

    if (prevScreen !== currentScreen) {
      slideAnim.setValue(startValue);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setPrevScreen(currentScreen);
    }
  }, [currentScreen]);

  const renderScreen = () => {
    switch (currentScreen) {
      case SCREENS.SPLASH:
        return <SplashScreen />;
      case SCREENS.HOME:
        return <HomeScreen />;
      case SCREENS.EXPLORE:
        return <ExploreScreen />;
      case SCREENS.EXPLORE_SECTION_LIST:
        return <ExploreSectionList />;
      case SCREENS.EXPLORE_SECTION_GRID:
        return <ExploreSectionGrid />;
      case SCREENS.SAVED:
        return <SavedScreen />;
      case SCREENS.PROFILE:
        return <ProfileScreen />;
      case SCREENS.DETAIL:
        return <ArticleDetailScreen />;
      case SCREENS.REGISTER:
        return <Register />;
      case SCREENS.LOGIN:
        return <Login />;
      case SCREENS.SIGNUP:
        return <Signup />;
      case SCREENS.FORGOT_PASSWORD:
        return <ForgotPassword />;
      case SCREENS.NOTIFICATIONS:
        return <Notifications />;
      case SCREENS.PRIVACY:
        return <PrivacyScreen />;
      case SCREENS.LANGUAGE:
        return <LanguageScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        transform: [{ translateX: slideAnim }]
      }}
    >
      {renderScreen()}
    </Animated.View>
  );
};

const MainLayout = () => {
  const { currentScreen, isTabBarVisible } = useNavigation();

  // App.js (inside MainLayout)
  const shouldShowTabs = isTabBarVisible &&
    currentScreen !== SCREENS.SPLASH &&
    currentScreen !== SCREENS.REGISTER &&
    currentScreen !== SCREENS.LOGIN &&
    currentScreen !== SCREENS.SIGNUP &&
    currentScreen !== SCREENS.FORGOT_PASSWORD;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" backgroundColor={COLORS.background} />
      <ScreenRenderer />
      {shouldShowTabs && <BottomNavigation />}
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <NavigationProvider>
        <MainLayout />
      </NavigationProvider>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
});
