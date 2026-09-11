import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Header } from '@/components/layout/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

export default function ConfiguracoesScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <Header title="Configurações" />
      <ScrollView contentContainerStyle={{ padding: 20, gap: 18, paddingBottom: 40 }}>
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: '#E2E8F0' }}>
          <Text style={{ color: '#0F172A', fontSize: 18, fontWeight: '700' }}>Preferências</Text>
          <Text style={{ color: '#334155', marginTop: 8 }}>Tema automático, lembretes e notificações.</Text>
        </View>
        <PrimaryButton label="Salvar alterações" />
      </ScrollView>
    </View>
  );
}
