import React from 'react';
import { Text, View } from 'react-native';

type BadgeProps = {
  label: string;
  color?: 'green' | 'blue' | 'amber' | 'red';
};

const palette = {
  green: { background: '#DCFCE7', text: '#166534' },
  blue: { background: '#DBEAFE', text: '#1D4ED8' },
  amber: { background: '#FEF3C7', text: '#92400E' },
  red: { background: '#FEE2E2', text: '#B91C1C' },
};

export function Badge({ label, color = 'green' }: BadgeProps) {
  const style = palette[color];

  return (
    <View style={{ alignSelf: 'flex-start', backgroundColor: style.background, borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 }}>
      <Text style={{ color: style.text, fontSize: 11, fontWeight: '700' }}>{label}</Text>
    </View>
  );
}
