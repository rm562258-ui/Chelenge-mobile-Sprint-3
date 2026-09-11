import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Header } from '@/components/layout/Header';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { FloatingActionButton } from '@/components/layout/FloatingActionButton';
import { MedicineCard } from '@/components/ui/MedicineCard';
import { Medication } from '@/types';

const medicines: Medication[] = [
  { id: '1', petId: '1', petName: 'Luna', name: 'Nexgard', dosage: '10mg', frequency: '1x por semana', active: true },
  { id: '2', petId: '2', petName: 'Milo', name: 'Vitamina', dosage: '5ml', frequency: '2x ao dia', active: true },
];

export default function MedicamentosScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <Header title="Medicamentos" />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 110, gap: 16 }}>
        <Text style={{ color: '#0F172A', fontSize: 20, fontWeight: '800' }}>Tratamentos ativos</Text>
        {medicines.map((medication) => (
          <MedicineCard key={medication.id} medication={medication} />
        ))}
      </ScrollView>
      <FloatingActionButton />
      <BottomNavigation activeTab="home" />
    </View>
  );
}
