import React from 'react';
import { ScrollView, View } from 'react-native';
import { Header } from '@/components/layout/Header';
import { Input } from '@/components/ui/Input';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

export default function NovoMedicamentoScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <Header title="Novo medicamento" />
      <ScrollView contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 40 }}>
        <Input label="Medicamento" placeholder="Nexgard" />
        <Input label="Pet" placeholder="Luna" />
        <Input label="Dosagem" placeholder="10mg" />
        <Input label="Frequência" placeholder="1x por semana" />
        <PrimaryButton label="Salvar medicamento" />
      </ScrollView>
    </View>
  );
}
