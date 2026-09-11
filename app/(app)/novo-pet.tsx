import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Header } from '@/components/layout/Header';
import { Input } from '@/components/ui/Input';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

export default function NovoPetScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <Header title="Novo pet" />
      <ScrollView contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 40 }}>
        <Input label="Nome" placeholder="Nome do pet" />
        <Input label="Espécie" placeholder="Cachorro" />
        <Input label="Raça" placeholder="Shih Tzu" />
        <Input label="Idade" placeholder="4 anos" keyboardType="numeric" />
        <PrimaryButton label="Salvar pet" />
      </ScrollView>
    </View>
  );
}
