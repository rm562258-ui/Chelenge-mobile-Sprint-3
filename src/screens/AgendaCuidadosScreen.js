import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppButton from '../../components/AppButton';
import HeaderSection from '../../components/HeaderSection';
import ProfileCard from '../../components/ProfileCard';
import { useAppointments } from '../hooks/useAppointments';
import { useState } from 'react';
import SearchBar from '../components/ui/SearchBar';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import { EmptyState, ErrorState } from '../components/ui/ListState';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

export default function AgendaCuidadosScreen({ navigation }) {
  const { data, isLoading, isError, refetch } = useAppointments();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const debouncedQuery = useDebouncedValue(query);
  const items = (Array.isArray(data) ? data : []).filter((item) => {
    const matchesQuery = `${item.title || ''} ${item.type || ''}`.toLowerCase().includes(debouncedQuery.toLowerCase());
    return matchesQuery && (!status || item.status === status);
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6FEFA' }}>
      <FlatList
        data={items}
        refreshControl={<RefreshControl refreshing={isLoading && !!data} onRefresh={refetch} />}
        ListEmptyComponent={isError ? <ErrorState title="Erro ao carregar agenda." onRetry={refetch} /> : !isLoading ? <EmptyState title="Nenhuma consulta encontrada." description="Agende uma consulta ou ajuste sua busca." /> : null}
        ListFooterComponent={isLoading && !data ? <LoadingSkeleton rows={3} /> : null}
        keyExtractor={(item, index) => item.id?.toString() || `${item.date || 'consulta'}-${index}`}
        contentContainerStyle={styles.container}
        ListHeaderComponent={() => (
          <View>
            <HeaderSection title="Agenda de Cuidados" subtitle="Próximos compromissos e lembretes" />
            <View style={{ paddingHorizontal: 16, marginTop: 8 }}>
              <AppButton title="Novo" onPress={() => navigation.navigate('AppointmentForm')} />
            </View>
            <View style={styles.controls}>
              <SearchBar value={query} onChangeText={setQuery} placeholder="Buscar consulta" />
              <AppButton title={status ? 'Todas' : 'Pendentes'} variant="outline" onPress={() => setStatus(status ? '' : 'Agendada')} />
            </View>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('AppointmentDetails', { id: item.id })}>
            <ProfileCard title={item.title || 'Consulta'} icon={'📌'}>
              <Text style={{ color: '#0F172A', fontWeight: '600' }}>{item.type || 'Consulta'} • {item.status || '-'}</Text>
              <Text style={{ color: '#475569', marginTop: 6 }}>Data: {item.date}</Text>
            </ProfileCard>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ container: { padding: 16 }, controls: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 } });
