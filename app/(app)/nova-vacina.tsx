import React from 'react';
import { ScrollView, View } from 'react-native';
import { Header } from '@/components/layout/Header';
import { Input } from '@/components/ui/Input';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

export default function NovaVacinaScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <Header title="Nova vacina" />
      <ScrollView contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 40 }}>
        <Input label="Vacina" placeholder="Antirrábica" />
        <Input label="Pet" placeholder="Luna" />
        <Input label="Data de vencimento" placeholder="12/09/2026" />
        <PrimaryButton label="Salvar vacina" />
      </ScrollView>
    </View>
  );
}
