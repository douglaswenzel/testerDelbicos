import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useFonts, Alata_400Regular } from '@expo-google-fonts/alata';
import * as SplashScreen from 'expo-splash-screen';
import { Provider as PaperProvider, DefaultTheme, Portal } from 'react-native-paper'; 
import UserProfileScreen from './screens/UserProfileScreen'; 
import { setupNotifications } from './utils/usePushNotifications';

SplashScreen.preventAutoHideAsync();

const customTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FC8200',
    accent: '#005A93',
    surface: '#FFFFFF',
  },
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  let [fontsLoaded] = useFonts({
    Alata_400Regular,
  });

  useEffect(() => {
    setupNotifications();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      setAppIsReady(true);
    }
  }, [fontsLoaded]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <PaperProvider theme={customTheme}>
      <View style={styles.container} onLayout={onLayoutRootView}>
        <Portal.Host>
          <UserProfileScreen />
        </Portal.Host>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});