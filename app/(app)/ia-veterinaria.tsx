import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Header } from '@/components/layout/Header';
import { PrimaryButton } from '@/components/ui/PrimaryButton';
import { Input } from '@/components/ui/Input';

export default function IAVeterinariaScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <Header title="IA Veterinária" />
      <ScrollView contentContainerStyle={{ padding: 20, gap: 18, paddingBottom: 40 }}>
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 20, padding: 18, borderWidth: 1, borderColor: '#E2E8F0' }}>
          <Text style={{ color: '#0F172A', fontSize: 18, fontWeight: '700' }}>Assistente</Text>
          <Text style={{ color: '#64748B', marginTop: 8 }}>A IA pode orientar sobre sinais clínicos, prevenção e próximas ações, sempre com suporte profissional.</Text>
        </View>

        <Input label="Pergunte para a IA" placeholder="O que posso fazer para cuidar melhor do meu pet?" />
        <PrimaryButton label="Gerar resposta" />
      </ScrollView>
    </View>
  );
}
