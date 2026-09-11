export const AUTH_ROUTES = {
  splash: '/(auth)/splash',
  login: '/(auth)/login',
  register: '/(auth)/cadastro',
  forgotPassword: '/(auth)/recuperar-senha',
} as const;

export const APP_ROUTES = {
  home: '/(app)/home',
  pets: '/(app)/pets',
  petDetails: '/(app)/pet-details',
  newPet: '/(app)/novo-pet',
  editPet: '/(app)/editar-pet',
  appointments: '/(app)/consultas',
  newAppointment: '/(app)/nova-consulta',
  editAppointment: '/(app)/editar-consulta',
  vaccines: '/(app)/vacinas',
  newVaccine: '/(app)/nova-vacina',
  medications: '/(app)/medicamentos',
  newMedication: '/(app)/novo-medicamento',
  aiVeterinary: '/(app)/ia-veterinaria',
  profile: '/(app)/perfil',
  settings: '/(app)/configuracoes',
  notifications: '/(app)/historico-notificacoes',
} as const;
