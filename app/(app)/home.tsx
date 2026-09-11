import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Activity, CalendarClock, ShieldCheck, Syringe, Pill, PawPrint } from 'lucide-react-native';
import { Header } from '@/components/layout/Header';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

const cards = [
  { label: 'Próximas consultas', value: '3', icon: CalendarClock, color: '#DBEAFE' },
  { label: 'Vacinas pendentes', value: '2', icon: Syringe, color: '#DCFCE7' },
  { label: 'Medicamentos ativos', value: '5', icon: Pill, color: '#E0F2FE' },
  { label: 'Pets cadastrados', value: '12', icon: PawPrint, color: '#F5F3FF' },
];

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <Header title="Dashboard" />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
        <View style={{ backgroundColor: '#0F766E', borderRadius: 24, padding: 22 }}>
          <Text style={{ color: '#FFFFFF', fontSize: 14, opacity: 0.85 }}>Olá, tutor</Text>
          <Text style={{ color: '#FFFFFF', fontSize: 28, fontWeight: '800', marginTop: 6 }}>Como está a saúde do seu pet?</Text>
          <Text style={{ color: '#D1FAE5', marginTop: 8 }}>Você tem 2 alertas importantes hoje.</Text>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 20, gap: 12 }}>
          {cards.map(({ label, value, icon: Icon, color }) => (
            <View key={label} style={{ width: '47%', backgroundColor: '#FFFFFF', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#E2E8F0' }}>
              <View style={{ width: 42, height: 42, borderRadius: 12, backgroundColor: color, alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={20} color="#0F766E" />
              </View>
              <Text style={{ color: '#64748B', fontSize: 12, marginTop: 10 }}>{label}</Text>
              <Text style={{ color: '#0F172A', fontSize: 28, fontWeight: '800' }}>{value}</Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 24 }}>
          <Text style={{ color: '#0F172A', fontSize: 22, fontWeight: '800' }}>Alertas importantes</Text>
          <View style={{ marginTop: 12, backgroundColor: '#FFFFFF', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: '#E2E8F0' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <Activity size={18} color="#16A34A" />
              <Text style={{ color: '#0F172A', fontWeight: '700' }}>Vacina anti-rábica vence em 3 dias</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 }}>
              <ShieldCheck size={18} color="#0F766E" />
              <Text style={{ color: '#334155' }}>Checklist de prevenção concluído em 87%</Text>
            </View>
          </View>
        </View>

        <View style={{ marginTop: 24 }}>
          <PrimaryButton label="Ver agenda completa" />
        </View>
      </ScrollView>
      <BottomNavigation activeTab="home" />
    </View>
  );
}
