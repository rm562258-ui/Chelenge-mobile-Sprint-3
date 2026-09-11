import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Header } from '@/components/layout/Header';
import { Avatar } from '@/components/ui/Avatar';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

export default function PerfilScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <Header title="Perfil" />
      <ScrollView contentContainerStyle={{ padding: 20, gap: 18, paddingBottom: 40 }}>
        <View style={{ backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center' }}>
          <Avatar name="Maria Souza" size={68} />
          <Text style={{ color: '#0F172A', fontSize: 24, fontWeight: '800', marginTop: 14 }}>Maria Souza</Text>
          <Text style={{ color: '#64748B', marginTop: 4 }}>maria@clyvo.com</Text>
        </View>

        <PrimaryButton label="Editar perfil" />
      </ScrollView>
    </View>
  );
}
