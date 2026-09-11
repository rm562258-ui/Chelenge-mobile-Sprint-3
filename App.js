import { NavigationContainer } from '@react-navigation/native';
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';

import { AuthProvider } from './src/context/AuthContext';
import { UserProvider } from './src/context/UserContext';
import AppNavigator from './src/navigation/AppNavigator';
import { QueryProvider } from './src/providers/QueryProvider';
import { ToastProvider } from './src/context/ToastProvider';
import OfflineBanner from './src/components/ui/OfflineBanner';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ToastProvider>
          <QueryProvider>
            <NavigationContainer>
              <AppNavigator />
            </NavigationContainer>
            <OfflineBanner />
          </QueryProvider>
        </ToastProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;

AppRegistry.registerComponent('main', () => App);
