import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import HeaderSection from '../../components/HeaderSection';
import ProfileCard from '../../components/ProfileCard';
import { EmptyState } from '../components/ui/ListState';

const STORAGE_KEY = '@clyvocare:notification-history';

export default function HistoricoNotificacoesScreen() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) setNotifications(JSON.parse(stored));
      } catch {
        setNotifications([]);
      }
    };

    loadNotifications();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={notifications}
        keyExtractor={(item, index) => item.id?.toString() || `${item.createdAt || 'notification'}-${index}`}
        contentContainerStyle={styles.container}
        ListHeaderComponent={<HeaderSection title="Histórico de notificações" subtitle="Acompanhe os lembretes registrados localmente" />}
        ListEmptyComponent={<EmptyState title="Nenhuma notificação registrada." description="Novos lembretes aparecerão aqui quando forem salvos pelo aplicativo." />}
        renderItem={({ item }) => (
          <ProfileCard title={item.title || 'Notificação'} icon="🔔">
            <Text style={styles.message}>{item.message || item.body || 'Sem detalhes disponíveis.'}</Text>
            {item.createdAt ? <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text> : null}
          </ProfileCard>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F6FEFA' },
  container: { padding: 16, flexGrow: 1 },
  message: { color: '#475569' },
  date: { color: '#94A3B8', marginTop: 8, fontSize: 12 },
});
