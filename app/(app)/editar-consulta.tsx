import React from 'react';
import { ScrollView, View } from 'react-native';
import { Header } from '@/components/layout/Header';
import { Input } from '@/components/ui/Input';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

export default function EditarConsultaScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <Header title="Editar consulta" />
      <ScrollView contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 40 }}>
        <Input label="Pet" value="Luna" />
        <Input label="Data" value="15/09/2026" />
        <Input label="Hora" value="08:30" />
        <Input label="Motivo" value="Consulta de rotina" />
        <PrimaryButton label="Salvar alterações" />
      </ScrollView>
    </View>
  );
}
