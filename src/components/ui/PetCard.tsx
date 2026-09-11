import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { PawPrint } from 'lucide-react-native';
import { Pet } from '@/types';

type PetCardProps = {
  pet: Pet;
  onPress?: () => void;
};

export function PetCard({ pet, onPress }: PetCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 18,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#0F766E',
        shadowOpacity: 0.08,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 16,
        elevation: 2,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#DCFCE7', alignItems: 'center', justifyContent: 'center' }}>
          <PawPrint size={22} color="#16A34A" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#0F172A' }}>{pet.name}</Text>
          <Text style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>{pet.type} · {pet.breed}</Text>
        </View>
      </View>
      <Text style={{ color: '#334155', marginTop: 10, fontSize: 14 }}>Idade: {pet.age} anos</Text>
    </Pressable>
  );
}
