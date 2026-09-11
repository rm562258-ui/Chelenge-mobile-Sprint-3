import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Header } from '@/components/layout/Header';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { FloatingActionButton } from '@/components/layout/FloatingActionButton';
import { PetCard } from '@/components/ui/PetCard';
import { Pet } from '@/types';

const pets: Pet[] = [
  { id: '1', name: 'Luna', type: 'Cachorro', breed: 'Shih Tzu', age: 4 },
  { id: '2', name: 'Milo', type: 'Gato', breed: 'Siamês', age: 2 },
  { id: '3', name: 'Nina', type: 'Cachorro', breed: 'Poodle', age: 6 },
];

export default function PetsScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <Header title="Pets" />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100, gap: 16 }}>
        <Text style={{ color: '#0F172A', fontSize: 20, fontWeight: '800' }}>Meus pets</Text>
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} />
        ))}
      </ScrollView>
      <FloatingActionButton />
      <BottomNavigation activeTab="pets" />
    </View>
  );
}
