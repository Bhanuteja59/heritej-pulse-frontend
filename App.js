import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Platform, StatusBar as RNStatusBar, Animated, Dimensions, Easing } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import { NavigationProvider, useNavigation, SCREENS } from './src/services/NavigationContext';
import { LanguageProvider, useLanguage } from './src/services/LanguageContext';
import { ThemeProvider, useTheme } from './src/services/ThemeContext';

// Screens
import SplashScreen from './src/screens/splashScreen/SplashScreen';
import HomeScreen from './src/screens/home/HomeScreen';
import Explore, { ExploreSectionGrid } from './src/screens/explore/Explore';
import SavedScreen from './src/screens/saved/SavedScreen';
import ProfileScreen from './src/screens/profile/ProfileScreen';
import ArticleDetailScreen from './src/screens/articles/ArticleDetailScreen';
import Register from './src/screens/register/Register';
import ForgotPassword from './src/screens/register/ForgotPassword';
import BottomNavigation from './src/components/BottomNavigation';
import Notifications from "./src/screens/profile/Notifications";
import PrivacyScreen from './src/screens/profile/PrivacyScreen';
import LanguageScreen from './src/screens/profile/LanguageScreen';

import Login from './src/screens/register/Login';
import Signup from './src/screens/register/Signup';
import AutoScrollingScreen from './src/screens/profile/AutoScrolling';
import ChangePasswordScreen from './src/screens/profile/ChangePassword';
import EditProfileScreen from './src/screens/profile/EditProfile';
import AboutUs from './src/screens/profile/AboutUs';
import ContactUs from './src/screens/profile/ContactUs';
import Feedback from './src/screens/profile/Feedback';
import TermsAndConditions from './src/screens/profile/TermsAndConditions';

const { width } = Dimensions.get('window');

const ScreenRenderer = () => {
  const { currentScreen } = useNavigation();
  const { colors } = useTheme();
  const slideAnim = useRef(new Animated.Value(0)).current;
  const [prevScreen, setPrevScreen] = useState(SCREENS.SPLASH);

  const TAB_ORDER = {
    [SCREENS.HOME]: 0,
    [SCREENS.EXPLORE]: 1,
    [SCREENS.SAVED]: 2,
    [SCREENS.PROFILE]: 3,
  };

  useEffect(() => {
    let startValue = 0;

    const isTabSwitch =
      Object.values(TAB_ORDER).includes(TAB_ORDER[currentScreen]) &&
      Object.values(TAB_ORDER).includes(TAB_ORDER[prevScreen]);

    if (isTabSwitch) {
      const currentOrder = TAB_ORDER[currentScreen];
      const prevOrder = TAB_ORDER[prevScreen];

      if (currentOrder > prevOrder) {
        startValue = width;
      } else {
        startValue = -width;
      }
    }
    else if (prevScreen === SCREENS.LOGIN && currentScreen === SCREENS.SIGNUP) {
      startValue = width;
    } else if (prevScreen === SCREENS.SIGNUP && currentScreen === SCREENS.LOGIN) {
      startValue = -width;
    } else if (prevScreen === SCREENS.REGISTER && (currentScreen === SCREENS.LOGIN || currentScreen === SCREENS.SIGNUP)) {
      startValue = width;
    }
    else if (
      currentScreen === SCREENS.DETAIL ||
      currentScreen === SCREENS.EXPLORE_SECTION_GRID ||
      currentScreen === SCREENS.PRIVACY ||
      currentScreen === SCREENS.LANGUAGE ||
      currentScreen === SCREENS.NOTIFICATIONS ||
      currentScreen === SCREENS.ABOUT_US ||
      currentScreen === SCREENS.CONTACT_US ||
      currentScreen === SCREENS.FEEDBACK ||
      currentScreen === SCREENS.TERMS
    ) {
      startValue = width;
    }
    else if (
      prevScreen === SCREENS.DETAIL ||
      prevScreen === SCREENS.EXPLORE_SECTION_GRID ||
      prevScreen === SCREENS.PRIVACY ||
      prevScreen === SCREENS.LANGUAGE ||
      prevScreen === SCREENS.NOTIFICATIONS ||
      prevScreen === SCREENS.ABOUT_US ||
      prevScreen === SCREENS.CONTACT_US ||
      prevScreen === SCREENS.FEEDBACK ||
      prevScreen === SCREENS.TERMS
    ) {
      startValue = -width;
    }

    if (prevScreen !== currentScreen) {
      slideAnim.setValue(startValue);

      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
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
        return <Explore />;
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
      case SCREENS.AUTO_SCROLLING:
        return <AutoScrollingScreen />;
      case SCREENS.CHANGE_PASSWORD:
        return <ChangePasswordScreen />;
      case SCREENS.EDIT_PROFILE:
        return <EditProfileScreen />;
      case SCREENS.ABOUT_US:
        return <AboutUs />;
      case SCREENS.CONTACT_US:
        return <ContactUs />;
      case SCREENS.FEEDBACK:
        return <Feedback />;
      case SCREENS.TERMS:
        return <TermsAndConditions />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <Animated.View
      style={{
        flex: 1,
        transform: [{ translateX: slideAnim }],
        backgroundColor: colors.background // Prevent transparency flashes
      }}
    >
      {renderScreen()}
    </Animated.View>
  );
};

const MainLayout = () => {
  const { currentScreen, isTabBarVisible, goBack, navigate } = useNavigation();
  const { colors, isDarkMode } = useTheme();

  const TAB_ORDER = [SCREENS.HOME, SCREENS.EXPLORE, SCREENS.SAVED, SCREENS.PROFILE];

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.state === State.END) {
      const { translationX, velocityX } = event.nativeEvent;
      const SWIPE_THRESHOLD = 80; // Slightly higher for intentionality
      const VELOCITY_THRESHOLD = 500; // Allow fast flickers

      // Handle Horizontal Swipes
      if (Math.abs(translationX) > SWIPE_THRESHOLD || Math.abs(velocityX) > VELOCITY_THRESHOLD) {
        // Check if current screen is a main tab
        const currentTabIndex = TAB_ORDER.indexOf(currentScreen);

        if (currentTabIndex !== -1) {
          // It's a tab! Handle internal tab switching
          if (translationX < 0 || velocityX < -VELOCITY_THRESHOLD) {
            // Swipe Left -> Next Tab
            if (currentTabIndex < TAB_ORDER.length - 1) {
              navigate(TAB_ORDER[currentTabIndex + 1]);
            }
          } else if (translationX > 0 || velocityX > VELOCITY_THRESHOLD) {
            // Swipe Right -> Previous Tab
            if (currentTabIndex > 0) {
              navigate(TAB_ORDER[currentTabIndex - 1]);
            }
          }
        } else {
          // It's NOT a tab (e.g., Detail, Settings, etc.)
          // Swipe Right (positive X) to go back
          if (translationX > 50 || velocityX > 400) {
            goBack();
          }
        }
      }
    }
  };

  // App.js (inside MainLayout)
  const shouldShowTabs = isTabBarVisible &&
    currentScreen !== SCREENS.SPLASH &&
    currentScreen !== SCREENS.REGISTER &&
    currentScreen !== SCREENS.LOGIN &&
    currentScreen !== SCREENS.SIGNUP &&
    currentScreen !== SCREENS.FORGOT_PASSWORD;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        style={isDarkMode ? "light" : "dark"}
        backgroundColor={colors.background}
        translucent={Platform.OS === 'android'}
      />
      <PanGestureHandler
        onHandlerStateChange={onHandlerStateChange}
        activeOffsetX={[-60, 60]} // High threshold to prevent "stealing" from horizontal lists
        failOffsetY={[-20, 20]}  // Fast fail for vertical scrolling focus
      >
        <View style={{ flex: 1 }}>
          <ScreenRenderer />
        </View>
      </PanGestureHandler>
      {shouldShowTabs && <BottomNavigation />}
    </SafeAreaView>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <LanguageProvider>
          <ThemeProvider>
            <NavigationProvider>
              <MainLayout />
            </NavigationProvider>
          </ThemeProvider>
        </LanguageProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
