import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '../hooks/useAuth';
import AgendaCuidadosScreen from '../screens/AgendaCuidadosScreen';
import AlertasScreen from '../screens/AlertasScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import pagCadastro from '../screens/pagCadastro';
import PagDev from '../screens/PagDev';
import pagPerfil from '../screens/pagPerfil';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

function AppStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: '#E6FFFA', shadowColor: 'transparent', elevation: 0 },
        headerTitleAlign: 'center',
        headerTintColor: '#065F46',
        headerBackTitleVisible: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'ClyvoCare Pet' }} />
      <Stack.Screen name="CadastroPet" component={pagCadastro} options={{ title: 'Cadastro do Pet' }} />
      <Stack.Screen name="PerfilPet" component={pagPerfil} options={{ title: 'Perfil do Pet' }} />
      <Stack.Screen name="AgendaCuidados" component={AgendaCuidadosScreen} options={{ title: 'Agenda de Cuidados' }} />
      <Stack.Screen name="Alertas" component={AlertasScreen} options={{ title: 'Alertas' }} />
      <Stack.Screen name="Equipe" component={PagDev} options={{ title: 'Equipe' }} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F6FEFA' }}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return isAuthenticated ? <AppStack /> : <AuthStack />;
}
