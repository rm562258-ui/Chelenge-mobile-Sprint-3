import React from 'react';
import { View, type ViewStyle } from 'react-native';

export function Skeleton({ height = 14, width = '100%', borderRadius = 12 }: { height?: number; width?: ViewStyle['width']; borderRadius?: number }) {
  return (
    <View
      style={{
        height,
        width,
        borderRadius,
        backgroundColor: '#E2E8F0',
        opacity: 0.8,
      }}
    />
  );
}
