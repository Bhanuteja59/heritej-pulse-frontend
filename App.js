import React from 'react';
import { SafeAreaView, StyleSheet, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationProvider, useNavigation, SCREENS } from './src/services/NavigationContext';
import { COLORS } from './src/utils/theme';

// Screens
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import SavedScreen from './src/screens/SavedScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ArticleDetailScreen from './src/screens/ArticleDetailScreen';
import BottomNavigation from './src/components/BottomNavigation';

const ScreenRenderer = () => {
  const { currentScreen } = useNavigation();

  switch (currentScreen) {
    case SCREENS.SPLASH:
      return <SplashScreen />;
    case SCREENS.HOME:
      return <HomeScreen />;
    case SCREENS.EXPLORE:
      return <ExploreScreen />;
    case SCREENS.SAVED:
      return <SavedScreen />;
    case SCREENS.PROFILE:
      return <ProfileScreen />;
    case SCREENS.DETAIL:
      return <ArticleDetailScreen />;
    default:
      return <HomeScreen />;
  }
};

const MainLayout = () => {
  const { currentScreen, isTabBarVisible } = useNavigation();

  // Optionally hide tabs for SPLASH or DETAIL via explicit check or rely on isTabBarVisible
  const shouldShowTabs = isTabBarVisible && currentScreen !== SCREENS.SPLASH;

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
    <NavigationProvider>
      <MainLayout />
    </NavigationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
});
