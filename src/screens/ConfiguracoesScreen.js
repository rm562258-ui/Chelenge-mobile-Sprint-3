import { useContext, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import AppButton from '../../components/AppButton';
import HeaderSection from '../../components/HeaderSection';
import ProfileCard from '../../components/ProfileCard';
import { UserContext } from '../context/UserContext';
import { useAuth } from '../hooks/useAuth';
import { showToast } from '../utils/toast';

export default function ConfiguracoesScreen({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const { logout, loading } = useAuth();
  const [remindersEnabled, setRemindersEnabled] = useState(user?.lembretesAtivos !== false);

  const toggleReminders = async (value) => {
    setRemindersEnabled(value);
    await setUser({ ...user, lembretesAtivos: value });
    showToast(value ? 'Lembretes ativados.' : 'Lembretes desativados.', 'success');
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      showToast('Não foi possível encerrar a sessão.', 'error');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <HeaderSection title="Configurações" subtitle="Ajuste as preferências do aplicativo" />
        <ProfileCard title="Preferências" icon="⚙️">
          <View style={styles.settingRow}>
            <View style={styles.settingText}><Text style={styles.title}>Lembretes de cuidado</Text><Text style={styles.description}>Receber lembretes sobre a rotina do pet</Text></View>
            <Switch value={remindersEnabled} onValueChange={toggleReminders} trackColor={{ false: '#CBD5E1', true: '#6EE7B7' }} thumbColor={remindersEnabled ? '#059669' : '#F8FAFC'} />
          </View>
        </ProfileCard>
        <AppButton title="Meu perfil" variant="outline" onPress={() => navigation.navigate('PerfilPet')} style={styles.button} />
        <AppButton title="Histórico de notificações" variant="outline" onPress={() => navigation.navigate('HistoricoNotificacoes')} style={styles.button} />
        <AppButton title="Sair da conta" onPress={handleLogout} loading={loading} disabled={loading} style={styles.button} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F6FEFA' },
  container: { padding: 16 },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  settingText: { flex: 1 },
  title: { color: '#0F172A', fontWeight: '700' },
  description: { color: '#64748B', marginTop: 4 },
  button: { marginTop: 12 },
});
