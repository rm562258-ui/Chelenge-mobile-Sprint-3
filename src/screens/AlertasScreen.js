import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text } from 'react-native';
import HeaderSection from '../../components/HeaderSection';
import ProfileCard from '../../components/ProfileCard';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import { EmptyState, ErrorState } from '../components/ui/ListState';
import { useNotifications } from '../hooks/useNotifications';

export default function AlertasScreen() {
  const { data, isLoading, isError, refetch } = useNotifications();
  const notifications = Array.isArray(data) ? data : [];

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={notifications}
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={isLoading && !!data} onRefresh={refetch} />}
        ListHeaderComponent={<HeaderSection title="Histórico de Notificações" subtitle="Acompanhe alertas gerados pelo cuidado do seu pet" />}
        ListEmptyComponent={isError ? <ErrorState title="Erro ao carregar notificações." onRetry={refetch} /> : !isLoading ? <EmptyState title="Nenhuma notificação encontrada." description="Novos alertas aparecerão aqui." /> : null}
        ListFooterComponent={isLoading && !data ? <LoadingSkeleton rows={3} /> : null}
        keyExtractor={(item, index) => item.id?.toString() || `${item.createdAt || 'notification'}-${index}`}
        renderItem={({ item }) => (
          <ProfileCard title={item.title || 'Notificação'} icon="🔔">
            <Text style={styles.message}>{item.message || 'Sem detalhes disponíveis.'}</Text>
          </ProfileCard>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F6FEFA' },
  container: { padding: 16 },
  message: { color: '#475569' },
});
