import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Header } from '@/components/layout/Header';

const notifications = [
  { id: '1', title: 'Vacina pendente', description: 'A vacina anti-rábica de Luna vence em 3 dias.', createdAt: 'Hoje, 09:00', seen: false },
  { id: '2', title: 'Consulta agendada', description: 'Consulta de rotina marcada para 15/09.', createdAt: 'Ontem, 18:30', seen: true },
];

export default function HistoricoNotificacoesScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <Header title="Notificações" />
      <ScrollView contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 40 }}>
        {notifications.map((notification) => (
          <View key={notification.id} style={{ backgroundColor: '#FFFFFF', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#E2E8F0' }}>
            <Text style={{ color: '#0F172A', fontWeight: '700', fontSize: 16 }}>{notification.title}</Text>
            <Text style={{ color: '#334155', marginTop: 6 }}>{notification.description}</Text>
            <Text style={{ color: '#64748B', marginTop: 10, fontSize: 12 }}>{notification.createdAt}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
