
import UserProfileScreen from './screens/UserProfileScreen';
import { StyleSheet, View } from 'react-native';
import { useFonts, Alata_400Regular } from '@expo-google-fonts/alata';
import AppLoading from 'expo-app-loading';

export default function App() {
  let [fontsLoaded] = useFonts({
    Alata_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <UserProfileScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    fontFamily: 'Alata_400Regular',
  },
});



