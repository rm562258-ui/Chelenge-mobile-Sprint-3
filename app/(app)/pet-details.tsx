import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Header } from '@/components/layout/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

export default function PetDetailsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <Header title="Detalhes do pet" />
      <ScrollView contentContainerStyle={{ padding: 20, gap: 18, paddingBottom: 40 }}>
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 24, padding: 18, borderWidth: 1, borderColor: '#E2E8F0' }}>
          <Text style={{ color: '#0F172A', fontSize: 28, fontWeight: '800' }}>Luna</Text>
          <Text style={{ color: '#64748B', marginTop: 6 }}>Shih Tzu · 4 anos</Text>
        </View>

        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: '#E2E8F0' }}>
          <Text style={{ color: '#0F172A', fontSize: 18, fontWeight: '700' }}>Resumo clínico</Text>
          <Text style={{ color: '#334155', marginTop: 10 }}>Saúde está estável e sem pendências principais. Última consulta foi em julho.</Text>
        </View>

        <PrimaryButton label="Editar pet" />
      </ScrollView>
    </View>
  );
}
