import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { ArrowLeft, Bell } from 'lucide-react-native';

type HeaderProps = {
  title: string;
  onBack?: () => void;
  rightAction?: () => void;
};

export function Header({ title, onBack, rightAction }: HeaderProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14, backgroundColor: '#F8FAFC' }}>
      <Pressable onPress={onBack} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
        <ArrowLeft size={20} color="#0F172A" />
      </Pressable>
      <Text style={{ fontSize: 20, fontWeight: '700', color: '#0F172A', flex: 1, textAlign: 'center' }}>{title}</Text>
      <Pressable onPress={rightAction} style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
        <Bell size={20} color="#0F172A" />
      </Pressable>
    </View>
  );
}
