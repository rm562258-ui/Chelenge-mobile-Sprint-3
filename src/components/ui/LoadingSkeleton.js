import { StyleSheet, View } from 'react-native';

export default function LoadingSkeleton({ rows = 3 }) {
  return (
    <View style={styles.container} accessibilityLabel="Carregando">
      {Array.from({ length: rows }).map((_, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.title} />
          <View style={styles.line} />
          <View style={styles.shortLine} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#E6EEF9' },
  title: { height: 18, width: '48%', backgroundColor: '#DDE7F2', borderRadius: 8, marginBottom: 14 },
  line: { height: 12, width: '88%', backgroundColor: '#EDF2F7', borderRadius: 8, marginBottom: 8 },
  shortLine: { height: 12, width: '62%', backgroundColor: '#EDF2F7', borderRadius: 8 },
});
