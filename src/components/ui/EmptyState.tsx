import React from 'react';
import { Text, View } from 'react-native';
import { Inbox } from 'lucide-react-native';

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32, gap: 12 }}>
      <Inbox size={42} color="#16A34A" />
      <Text style={{ color: '#0F172A', fontSize: 18, fontWeight: '700', textAlign: 'center' }}>{title}</Text>
      {description ? <Text style={{ color: '#64748B', textAlign: 'center' }}>{description}</Text> : null}
    </View>
  );
}
