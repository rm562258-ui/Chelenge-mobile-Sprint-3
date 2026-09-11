import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export function Loading({ message = 'Carregando...' }: { message?: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 }}>
      <ActivityIndicator size="large" color="#16A34A" />
      <Text style={{ color: '#0F172A', fontSize: 15 }}>{message}</Text>
    </View>
  );
}
