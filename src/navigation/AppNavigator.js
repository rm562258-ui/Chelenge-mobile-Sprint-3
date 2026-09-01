import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import AgendaCuidadosScreen from "../screens/AgendaCuidadosScreen";
import AlertasScreen from "../screens/AlertasScreen";
import HomeScreen from "../screens/HomeScreen";
import pagCadastro from "../screens/pagCadastro";
import PagDev from "../screens/PagDev";
import pagPerfil from "../screens/pagPerfil";

const Stack = createStackNavigator();

export default function AppNavigator() {
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
