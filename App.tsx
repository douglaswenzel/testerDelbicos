import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PartnerForm from './components/formPartner';
import Configuration from './screens/configuration';

export default function App() {
  return (
    <View style={styles.container}>
      <PartnerForm />
      <Text>Open up App.tsx to start working on your app!</Text>
      <Configuration /> 
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



