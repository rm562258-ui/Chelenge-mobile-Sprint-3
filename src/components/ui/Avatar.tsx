import React from 'react';
import { Text, View } from 'react-native';

type AvatarProps = {
  name: string;
  size?: number;
};

export function Avatar({ name, size = 44 }: AvatarProps) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: '#0F766E',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ color: '#FFFFFF', fontSize: size * 0.38, fontWeight: '700' }}>{initials}</Text>
    </View>
  );
}
