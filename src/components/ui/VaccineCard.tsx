import React from 'react';
import { Text, View } from 'react-native';
import { Syringe } from 'lucide-react-native';
import { Vaccine } from '@/types';

type VaccineCardProps = {
  vaccine: Vaccine;
};

export function VaccineCard({ vaccine }: VaccineCardProps) {
  return (
    <View style={{ backgroundColor: '#FFFFFF', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#E2E8F0' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: '#ECFDF5', alignItems: 'center', justifyContent: 'center' }}>
          <Syringe size={18} color="#16A34A" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 17, fontWeight: '700', color: '#0F172A' }}>{vaccine.name}</Text>
          <Text style={{ color: '#64748B', marginTop: 2 }}>{vaccine.petName}</Text>
        </View>
      </View>
      <Text style={{ color: '#0F766E', marginTop: 12, fontWeight: '600' }}>Vence em: {vaccine.dueDate}</Text>
    </View>
  );
}
