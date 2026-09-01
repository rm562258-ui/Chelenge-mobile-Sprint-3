import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import AppButton from '../../components/AppButton';
import HeaderSection from '../../components/HeaderSection';
import ProfileCard from '../../components/ProfileCard';

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6FEFA' }}>
      <ScrollView contentContainerStyle={styles.container}>
        <HeaderSection title="ClyvoCare Pet" subtitle="Ajuda tutores a manterem a continuidade do cuidado do seu pet" />

        <ProfileCard title="Próxima vacina" icon="💉">
          <Text style={{ color: '#0F172A', fontWeight: '600' }}>Vacina antirrábica</Text>
          <Text style={{ color: '#475569', marginTop: 6 }}>Data estimada: 2026-08-10</Text>
        </ProfileCard>

        <ProfileCard title="Check-up recomendado" icon="🩺">
          <Text style={{ color: '#0F172A', fontWeight: '600' }}>Consulta anual preventiva</Text>
          <Text style={{ color: '#475569', marginTop: 6 }}>Recomendação: agendar nos próximos 30 dias</Text>
        </ProfileCard>

        <ProfileCard title="Acompanhamento contínuo" icon="📈">
          <Text style={{ color: '#0F172A', fontWeight: '600' }}>Medicação e monitoramento</Text>
          <Text style={{ color: '#475569', marginTop: 6 }}>Mantenha o histórico clínico e lembretes ativos</Text>
        </ProfileCard>

        <View style={{ height: 8 }} />
        <AppButton title="Cadastrar Pet" onPress={() => navigation.navigate('CadastroPet')} style={{ marginBottom: 8 }} />
        <AppButton title="Ver Perfil do Pet" onPress={() => navigation.navigate('PerfilPet')} variant="outline" style={{ marginBottom: 8 }} />
        <AppButton title="Agenda de Cuidados" onPress={() => navigation.navigate('AgendaCuidados')} variant="outline" style={{ marginBottom: 8 }} />
        <AppButton title="Alertas e Recomendações" onPress={() => navigation.navigate('Alertas')} variant="outline" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
});
