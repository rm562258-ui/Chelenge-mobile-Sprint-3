import React from 'react';
import { Pressable, PressableProps, Text, ViewStyle } from 'react-native';

type PrimaryButtonProps = PressableProps & {
  label: string;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
};

export function PrimaryButton({ label, variant = 'primary', style, ...props }: PrimaryButtonProps) {
  return (
    <Pressable
      {...props}
      style={({ pressed }) => [{
        backgroundColor: variant === 'primary' ? '#16A34A' : '#0F766E',
        borderRadius: 14,
        paddingVertical: 14,
        paddingHorizontal: 18,
        opacity: pressed ? 0.9 : 1,
        shadowColor: '#16A34A',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 3,
        alignItems: 'center',
        justifyContent: 'center',
      }, style]}
    >
      <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>{label}</Text>
    </Pressable>
  );
}
