import React from 'react';
import { ScrollView, View } from 'react-native';
import { Header } from '@/components/layout/Header';
import { Input } from '@/components/ui/Input';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

export default function EditarPetScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <Header title="Editar pet" />
      <ScrollView contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 40 }}>
        <Input label="Nome" value="Luna" />
        <Input label="Espécie" value="Cachorro" />
        <Input label="Raça" value="Shih Tzu" />
        <Input label="Idade" value="4" keyboardType="numeric" />
        <PrimaryButton label="Atualizar" />
      </ScrollView>
    </View>
  );
}
