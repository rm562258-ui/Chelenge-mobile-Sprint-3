import React from 'react';
import { ScrollView, View } from 'react-native';
import { Header } from '@/components/layout/Header';
import { Input } from '@/components/ui/Input';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

export default function NovaConsultaScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <Header title="Nova consulta" />
      <ScrollView contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 40 }}>
        <Input label="Pet" placeholder="Selecione o pet" />
        <Input label="Data" placeholder="15/09/2026" />
        <Input label="Hora" placeholder="08:30" />
        <Input label="Motivo" placeholder="Consulta de rotina" />
        <PrimaryButton label="Agendar" />
      </ScrollView>
    </View>
  );
}
