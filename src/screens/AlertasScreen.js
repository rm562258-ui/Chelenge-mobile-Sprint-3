import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native';
import HeaderSection from '../../components/HeaderSection';
import ProfileCard from '../../components/ProfileCard';

const ALERTS = [
  { id: 'a1', title: 'Vacina próxima do vencimento', message: 'Vacina antirrábica vence em 30 dias.' },
  { id: 'a2', title: 'Retorno recomendado', message: 'Retorno pós-operatório sugerido em 14 dias.' },
  { id: 'a3', title: 'Atenção ao peso', message: 'Variação de peso detectada: avalie dieta.' },
  { id: 'a4', title: 'Manter medicação', message: 'Não interromper medicação sem orientação veterinária.' },
];

export default function AlertasScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6FEFA' }}>
      <FlatList
        data={ALERTS}
        keyExtractor={(i) => i.id}
        contentContainerStyle={styles.container}
        ListHeaderComponent={() => <HeaderSection title="Alertas e Recomendações" subtitle="Recomendações simuladas — consulte sempre um veterinário" />}
        renderItem={({ item }) => (
          <ProfileCard title={item.title} icon={'⚠️'}>
            <Text style={{ color: '#475569' }}>{item.message}</Text>
          </ProfileCard>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({ container: { padding: 16 } });
