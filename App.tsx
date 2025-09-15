import { StyleSheet, View } from 'react-native';
import UserProfileScreen from './screens/UserProfileScreen';

export default function App() {
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
  },
});



