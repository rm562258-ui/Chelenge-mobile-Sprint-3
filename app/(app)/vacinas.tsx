import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Header } from '@/components/layout/Header';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { FloatingActionButton } from '@/components/layout/FloatingActionButton';
import { VaccineCard } from '@/components/ui/VaccineCard';
import { Vaccine } from '@/types';

const vaccines: Vaccine[] = [
  { id: '1', petId: '1', petName: 'Luna', name: 'Antirrábica', dueDate: '12/09/2026', status: 'pending' },
  { id: '2', petId: '2', petName: 'Milo', name: 'V8', dueDate: '20/09/2026', status: 'pending' },
];

export default function VacinasScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <Header title="Vacinas" />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 110, gap: 16 }}>
        <Text style={{ color: '#0F172A', fontSize: 20, fontWeight: '800' }}>Carteira de vacinação</Text>
        {vaccines.map((vaccine) => (
          <VaccineCard key={vaccine.id} vaccine={vaccine} />
        ))}
      </ScrollView>
      <FloatingActionButton />
      <BottomNavigation activeTab="home" />
    </View>
  );
}
