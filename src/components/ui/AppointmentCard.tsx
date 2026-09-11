import React from 'react';
import { Text, View } from 'react-native';
import { CalendarDays, Clock3 } from 'lucide-react-native';
import { Appointment } from '@/types';

type AppointmentCardProps = {
  appointment: Appointment;
};

export function AppointmentCard({ appointment }: AppointmentCardProps) {
  return (
    <View style={{ backgroundColor: '#FFFFFF', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#E2E8F0' }}>
      <Text style={{ fontSize: 18, fontWeight: '700', color: '#0F172A' }}>{appointment.reason}</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10, gap: 8 }}>
        <CalendarDays size={16} color="#0F766E" />
        <Text style={{ color: '#334155', fontSize: 14 }}>{appointment.date}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 8 }}>
        <Clock3 size={16} color="#0F766E" />
        <Text style={{ color: '#334155', fontSize: 14 }}>{appointment.time}</Text>
      </View>
      <Text style={{ color: '#64748B', marginTop: 10 }}>{appointment.petName}</Text>
    </View>
  );
}
