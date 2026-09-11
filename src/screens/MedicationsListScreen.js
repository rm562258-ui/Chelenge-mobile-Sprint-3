import { useMemo, useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AppButton from '../../components/AppButton';
import HeaderSection from '../../components/HeaderSection';
import ProfileCard from '../../components/ProfileCard';
import { useMedications } from '../hooks/useMedications';
import SearchBar from '../components/ui/SearchBar';
import LoadingSkeleton from '../components/ui/LoadingSkeleton';
import { EmptyState, ErrorState } from '../components/ui/ListState';
import { useDebouncedValue } from '../hooks/useDebouncedValue';

export default function MedicationsListScreen({ navigation }) {
    const { data, isLoading, isError, refetch } = useMedications();
    const [query, setQuery] = useState('');
    const [activeOnly, setActiveOnly] = useState(false);
    const debouncedQuery = useDebouncedValue(query);

    const items = useMemo(() => {
        const list = Array.isArray(data) ? data : [];
        const today = new Date().toISOString().slice(0, 10);
        return list.filter((m) => {
            const matchesQuery = (m.name || '').toLowerCase().includes(debouncedQuery.toLowerCase());
            const isActive = !m.endDate || m.endDate >= today;
            return matchesQuery && (!activeOnly || isActive);
        });
    }, [data, debouncedQuery, activeOnly]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F6FEFA' }}>
            <FlatList
                ListHeaderComponent={() => (
                    <View style={styles.header}>
                        <HeaderSection title="Medicamentos" subtitle="Registre tratamentos e dosagens" />
                        <View style={styles.controls}>
                            <SearchBar value={query} onChangeText={setQuery} />
                            <View style={styles.actions}>
                                <AppButton title={activeOnly ? 'Todos' : 'Ativos'} variant="outline" onPress={() => setActiveOnly((current) => !current)} />
                                <AppButton title="Novo" onPress={() => navigation.navigate('MedicationForm')} />
                            </View>
                        </View>
                    </View>
                )}
                data={items}
                refreshControl={<RefreshControl refreshing={isLoading && !!data} onRefresh={refetch} />}
                ListEmptyComponent={isError ? <ErrorState title="Erro ao carregar medicamentos." onRetry={refetch} /> : !isLoading ? <EmptyState title="Nenhum medicamento encontrado." description="Registre um tratamento para acompanhar seu pet." /> : null}
                ListFooterComponent={isLoading && !data ? <LoadingSkeleton rows={3} /> : null}
                keyExtractor={(item, index) => item.id?.toString() || `${item.name || 'medicamento'}-${index}`}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('MedicationDetails', { id: item.id })}>
                        <ProfileCard title={item.name || '—'} icon="💊">
                            <Text style={{ color: '#475569' }}>Frequência: {item.frequency || '-'}</Text>
                            <Text style={{ color: '#475569', marginTop: 6 }}>Dosagem: {item.dosage || '-'}</Text>
                        </ProfileCard>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({ header: { padding: 16 }, controls: { gap: 8 }, actions: { flexDirection: 'row', gap: 8 } });
