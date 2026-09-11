import React from 'react';
import { Text, View } from 'react-native';
import { TriangleAlert } from 'lucide-react-native';

export function ErrorState({ message }: { message: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12 }}>
      <TriangleAlert size={42} color="#EF4444" />
      <Text style={{ color: '#0F172A', fontSize: 18, fontWeight: '700', textAlign: 'center' }}>Algo deu errado</Text>
      <Text style={{ color: '#64748B', textAlign: 'center' }}>{message}</Text>
    </View>
  );
}
