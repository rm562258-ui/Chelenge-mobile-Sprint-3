import { NavigationContainer } from '@react-navigation/native';
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';

import { AuthProvider } from './src/context/AuthContext';
import { UserProvider } from './src/context/UserContext';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;

AppRegistry.registerComponent('main', () => App);
