import React from 'react';
import { Text, View } from 'react-native';
import { Pill } from 'lucide-react-native';
import { Medication } from '@/types';

type MedicineCardProps = {
  medication: Medication;
};

export function MedicineCard({ medication }: MedicineCardProps) {
  return (
    <View style={{ backgroundColor: '#FFFFFF', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#E2E8F0' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: '#EFF6FF', alignItems: 'center', justifyContent: 'center' }}>
          <Pill size={18} color="#0F766E" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 17, fontWeight: '700', color: '#0F172A' }}>{medication.name}</Text>
          <Text style={{ color: '#64748B', marginTop: 2 }}>{medication.petName}</Text>
        </View>
      </View>
      <Text style={{ color: '#334155', marginTop: 12 }}>{medication.dosage} · {medication.frequency}</Text>
    </View>
  );
}
