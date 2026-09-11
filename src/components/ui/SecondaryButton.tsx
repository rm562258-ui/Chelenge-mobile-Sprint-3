import React from 'react';
import { Pressable, PressableProps, Text } from 'react-native';

type SecondaryButtonProps = PressableProps & {
  label: string;
};

export function SecondaryButton({ label, ...props }: SecondaryButtonProps) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [{
        borderWidth: 1,
        borderColor: '#D1FAE5',
        backgroundColor: '#F0FDF4',
        borderRadius: 14,
        paddingVertical: 14,
        paddingHorizontal: 18,
        opacity: pressed ? 0.85 : 1,
      }]}
    >
      <Text style={{ color: '#166534', fontSize: 16, fontWeight: '700', textAlign: 'center' }}>{label}</Text>
    </Pressable>
  );
}
