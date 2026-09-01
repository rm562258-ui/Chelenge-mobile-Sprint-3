import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import HeaderSection from '../../components/HeaderSection';
import ProfileCard from '../../components/ProfileCard';

const MOCK = [
  { id: '1', title: 'Vacina anual', type: 'Vacina', date: '2026-08-10', priority: 'Alta', status: 'Pendente' },
  { id: '2', title: 'Retorno veterinário', type: 'Consulta', date: '2026-06-20', priority: 'Média', status: 'Agendado' },
  { id: '3', title: 'Exame de sangue', type: 'Exame', date: '2026-07-05', priority: 'Média', status: 'Pendente' },
  { id: '4', title: 'Medicação contínua', type: 'Medicação', date: '2026-05-25', priority: 'Alta', status: 'Em uso' },
  { id: '5', title: 'Avaliação nutricional', type: 'Check-up', date: '2026-09-01', priority: 'Baixa', status: 'Recomendado' },
];

export default function AgendaCuidadosScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6FEFA' }}>
      <FlatList
        data={MOCK}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.container}
        ListHeaderComponent={() => <HeaderSection title="Agenda de Cuidados" subtitle="Itens simulados para acompanhamento preventivo" />}
        renderItem={({ item }) => (
          <ProfileCard title={item.title} icon={'📌'}>
            <Text style={{ color: '#0F172A', fontWeight: '600' }}>{item.type} • {item.status}</Text>
            <Text style={{ color: '#475569', marginTop: 6 }}>Data: {item.date}</Text>
            <Text style={{ color: item.priority === 'Alta' ? '#DC2626' : item.priority === 'Média' ? '#F59E0B' : '#10B981', marginTop: 6 }}>Prioridade: {item.priority}</Text>
          </ProfileCard>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ container: { padding: 16 } });
