import { StyleSheet, TextInput } from 'react-native';

export default function SearchBar({ value, onChangeText, placeholder = 'Buscar', style }) {
  return <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor="#94A3B8" style={[styles.input, style]} accessibilityLabel={placeholder} />;
}

const styles = StyleSheet.create({ input: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 14, height: 48, borderRadius: 16, borderWidth: 1, borderColor: '#E6EEF9', color: '#0F172A' } });
