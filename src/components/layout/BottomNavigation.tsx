import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Home, PawPrint, CalendarDays, UserCircle2 } from 'lucide-react-native';

type BottomNavigationProps = {
  activeTab?: 'home' | 'pets' | 'appointments' | 'profile';
  onChange?: (tab: 'home' | 'pets' | 'appointments' | 'profile') => void;
};

const tabs = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'pets', label: 'Pets', icon: PawPrint },
  { key: 'appointments', label: 'Agenda', icon: CalendarDays },
  { key: 'profile', label: 'Perfil', icon: UserCircle2 },
] as const;

export function BottomNavigation({ activeTab = 'home', onChange }: BottomNavigationProps) {
  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingVertical: 12, paddingHorizontal: 16 }}>
      {tabs.map(({ key, label, icon: Icon }) => {
        const isActive = activeTab === key;

        return (
          <Pressable key={key} onPress={() => onChange?.(key)} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: 4 }}>
            <Icon size={20} color={isActive ? '#16A34A' : '#64748B'} />
            <Text style={{ color: isActive ? '#16A34A' : '#64748B', fontSize: 11, fontWeight: isActive ? '700' : '500' }}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
