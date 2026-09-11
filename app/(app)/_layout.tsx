import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
      <Stack.Screen name="pets" />
      <Stack.Screen name="pet-details" />
      <Stack.Screen name="novo-pet" />
      <Stack.Screen name="editar-pet" />
      <Stack.Screen name="consultas" />
      <Stack.Screen name="nova-consulta" />
      <Stack.Screen name="editar-consulta" />
      <Stack.Screen name="vacinas" />
      <Stack.Screen name="nova-vacina" />
      <Stack.Screen name="medicamentos" />
      <Stack.Screen name="novo-medicamento" />
      <Stack.Screen name="ia-veterinaria" />
      <Stack.Screen name="perfil" />
      <Stack.Screen name="configuracoes" />
      <Stack.Screen name="historico-notificacoes" />
    </Stack>
  );
}
