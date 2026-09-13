import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text } from 'react-native';
import HeaderSection from '../../components/HeaderSection';
import ProfileCard from '../../components/ProfileCard';
import { EmptyState, ErrorState } from '../components/ui/ListState';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import { useAppointments } from '../hooks/useAppointments';
import { useNotifications } from '../hooks/useNotifications';

const parseAppointmentDate = (value = '') => {
  const ddmmyy = value.match(/^(\d{2})\/(\d{2})\/(\d{2})$/);
  if (ddmmyy) return new Date(2000 + Number(ddmmyy[3]), Number(ddmmyy[2]) - 1, Number(ddmmyy[1]));

  const iso = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return iso ? new Date(Number(iso[1]), Number(iso[2]) - 1, Number(iso[3])) : null;
};

export default function AlertasScreen() {
  const { data, isLoading, isError, refetch } = useNotifications();
  const { data: appointments = [], isLoading: isAppointmentsLoading, refetch: refetchAppointments } = useAppointments();
  const notifications = Array.isArray(data) ? data : [];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekFromToday = new Date(today);
  weekFromToday.setDate(weekFromToday.getDate() + 7);
  const appointmentAlerts = (Array.isArray(appointments) ? appointments : [])
    .filter((appointment) => appointment.status !== 'Concluída')
    .map((appointment) => ({ appointment, date: parseAppointmentDate(appointment.date) }))
    .filter(({ date }) => date && date >= today && date <= weekFromToday)
    .map(({ appointment }) => ({
      id: `appointment-alert-${appointment.id}`,
      title: 'Consulta programada',
      message: `${appointment.petName || 'Pet'} tem uma consulta marcada para ${appointment.date}.`,
    }));
  const alertItems = [...notifications, ...appointmentAlerts];
  const loading = isLoading || isAppointmentsLoading;
  const refreshAlerts = async () => {
    await Promise.all([refetch(), refetchAppointments()]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={alertItems}
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl refreshing={loading && !!data} onRefresh={refreshAlerts} />}
        ListHeaderComponent={<HeaderSection title="Histórico de Notificações" subtitle="Acompanhe alertas gerados pelo cuidado do seu pet" />}
        ListEmptyComponent={isError ? <ErrorState title="Erro ao carregar notificações." onRetry={refetch} /> : !loading ? <EmptyState title="Nenhuma notificação encontrada." description="Novos alertas aparecerão aqui." /> : null}
        ListFooterComponent={loading && !data ? <LoadingSkeleton rows={3} /> : null}
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
