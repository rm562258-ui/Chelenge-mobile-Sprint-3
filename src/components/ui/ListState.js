import { StyleSheet, Text, View } from 'react-native';
import AppButton from '../../../components/AppButton';

export function EmptyState({ title = 'Nenhum registro encontrado.', description = 'Quando houver dados, eles aparecerão aqui.' }) {
  return <View style={styles.container}><Text style={styles.title}>{title}</Text><Text style={styles.description}>{description}</Text></View>;
}

export function ErrorState({ title = 'Não foi possível carregar os dados.', onRetry }) {
  return <View style={styles.container}><Text style={styles.errorTitle}>{title}</Text><Text style={styles.description}>Verifique sua conexão e tente novamente.</Text><AppButton title="Tentar novamente" variant="outline" onPress={onRetry} style={styles.button} /></View>;
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 28 },
  title: { color: '#0F172A', fontWeight: '700', fontSize: 16, textAlign: 'center' },
  errorTitle: { color: '#B91C1C', fontWeight: '700', fontSize: 16, textAlign: 'center' },
  description: { color: '#64748B', marginTop: 8, textAlign: 'center' },
  button: { marginTop: 16 },
});
