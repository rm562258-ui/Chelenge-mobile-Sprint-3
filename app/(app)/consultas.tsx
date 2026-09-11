import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Header } from '@/components/layout/Header';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { FloatingActionButton } from '@/components/layout/FloatingActionButton';
import { AppointmentCard } from '@/components/ui/AppointmentCard';
import { Appointment } from '@/types';

const appointments: Appointment[] = [
  { id: '1', petId: '1', petName: 'Luna', date: '15/09/2026', time: '08:30', reason: 'Consulta de rotina', status: 'confirmed' },
  { id: '2', petId: '2', petName: 'Milo', date: '18/09/2026', time: '14:00', reason: 'Vacinação anual', status: 'pending' },
];

export default function ConsultasScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <Header title="Consultas" />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 110, gap: 16 }}>
        <Text style={{ color: '#0F172A', fontSize: 20, fontWeight: '800' }}>Agenda</Text>
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </ScrollView>
      <FloatingActionButton />
      <BottomNavigation activeTab="appointments" />
    </View>
  );
}
