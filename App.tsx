import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Configuration from './screens/configuration';
import AltEnderco from './components/AltEndereco';

export default function App() {
  return (
    <View style={styles.container}>
      <Configuration /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});



